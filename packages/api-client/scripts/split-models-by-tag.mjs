import { promises as fs } from "node:fs";
import path from "node:path";

const generatedRoot = path.resolve("src/generated");

const MODEL_IMPORT_PATTERN =
  /import\s+type\s*\{([^}]*)\}\s*from\s*['"]\.\.\/\.\.\/models['"];?/m;
const RELATIVE_MODEL_IMPORT_PATTERN =
  /import\s+type\s*\{[^}]*\}\s*from\s*['"]\.\/([^'"]+)['"];?/g;
const MODEL_EXPORT_PATTERN = /export\s+(?:type|interface|enum)\s+([A-Za-z0-9_]+)/g;
const MODEL_INDEX_EXPORT_PATTERN = /export\s+\*\s+from\s+['"]\.\/([^'"]+)['"];?/g;

const toPosixPath = (value) => value.replaceAll("\\", "/");

async function readDirEntries(targetPath) {
  try {
    return await fs.readdir(targetPath, { withFileTypes: true });
  } catch {
    return [];
  }
}

async function getTagFiles(endpointsRoot) {
  const entries = await readDirEntries(endpointsRoot);
  const files = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const tagDir = path.join(endpointsRoot, entry.name);
    const tagFiles = await readDirEntries(tagDir);
    for (const file of tagFiles) {
      if (file.isFile() && file.name.endsWith(".ts")) {
        files.push({
          tag: entry.name,
          filePath: path.join(tagDir, file.name),
        });
      }
    }
  }

  return files;
}

async function buildModelMap(modelsRoot) {
  const map = new Map();
  const indexPath = path.join(modelsRoot, "index.ts");
  const indexContent = await fs.readFile(indexPath, "utf8");
  const exportedFiles = [...indexContent.matchAll(MODEL_INDEX_EXPORT_PATTERN)].map(
    (match) => match[1],
  );

  for (const exportedFile of exportedFiles) {
    const modelFilePath = path.join(modelsRoot, `${exportedFile}.ts`);
    const content = await fs.readFile(modelFilePath, "utf8");
    const matches = [...content.matchAll(MODEL_EXPORT_PATTERN)];

    for (const match of matches) {
      map.set(match[1], modelFilePath);
    }

    if (!matches.length) {
      const fallbackName = `${exportedFile.charAt(0).toUpperCase()}${exportedFile.slice(1)}`;
      map.set(fallbackName, modelFilePath);
    }
  }

  return map;
}

function extractImportedModels(content) {
  const match = content.match(MODEL_IMPORT_PATTERN);
  if (!match) {
    return [];
  }

  return match[1]
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
}

async function ensureDir(targetPath) {
  await fs.mkdir(targetPath, { recursive: true });
}

async function resolveModelSourceFile(modelName, modelMap, modelsRoot) {
  let sourceFile = modelMap.get(modelName);
  if (!sourceFile) {
    const fallback = `${modelName.charAt(0).toLowerCase()}${modelName.slice(1)}`;
    sourceFile = path.join(modelsRoot, `${fallback}.ts`);
    try {
      await fs.access(sourceFile);
    } catch {
      return undefined;
    }
  }

  return sourceFile;
}

async function collectModelFiles(seedModelNames, modelMap, modelsRoot) {
  const filesToCopy = new Set();
  const queue = [];

  for (const modelName of seedModelNames) {
    const sourceFile = await resolveModelSourceFile(modelName, modelMap, modelsRoot);
    if (!sourceFile) {
      console.warn(`[split-models-by-tag] missing model source: ${modelName}`);
      continue;
    }

    queue.push(sourceFile);
  }

  while (queue.length) {
    const sourceFile = queue.shift();
    if (filesToCopy.has(sourceFile)) {
      continue;
    }

    filesToCopy.add(sourceFile);

    const content = await fs.readFile(sourceFile, "utf8");
    for (const match of content.matchAll(RELATIVE_MODEL_IMPORT_PATTERN)) {
      const dependencyPath = path.join(path.dirname(sourceFile), `${match[1]}.ts`);
      try {
        await fs.access(dependencyPath);
        queue.push(dependencyPath);
      } catch {
        console.warn(
          `[split-models-by-tag] missing model dependency: ${toPosixPath(dependencyPath)}`,
        );
      }
    }
  }

  return filesToCopy;
}

async function copyTagModels(endpointsRoot, modelsRoot, tag, endpointFileContent, modelMap) {
  const modelNames = extractImportedModels(endpointFileContent);
  if (!modelNames.length) {
    return endpointFileContent;
  }

  const tagModelDir = path.join(modelsRoot, tag);
  await ensureDir(tagModelDir);

  const sourceFiles = await collectModelFiles(modelNames, modelMap, modelsRoot);
  const indexLines = [];

  for (const sourceFile of [...sourceFiles].sort((a, b) => a.localeCompare(b))) {
    const fileName = path.basename(sourceFile);
    const destination = path.join(tagModelDir, fileName);
    await fs.copyFile(sourceFile, destination);
    indexLines.push(`export * from './${fileName.replace(".ts", "")}';`);
  }

  if (indexLines.length) {
    const unique = [...new Set(indexLines)];
    await fs.writeFile(path.join(tagModelDir, "index.ts"), `${unique.join("\n")}\n`, "utf8");
  }

  const updatedContent = endpointFileContent.replace(MODEL_IMPORT_PATTERN, (all, namesBlock) => {
    return `import type {${namesBlock}} from '../../models/${tag}';`;
  });

  return { updatedContent };
}

async function removeRootModelDuplicates(modelsRoot) {
  const entries = await readDirEntries(modelsRoot);
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".ts") || entry.name === "index.ts") {
      continue;
    }

    await fs.unlink(path.join(modelsRoot, entry.name));
  }
}

async function rewriteRootModelIndex(modelsRoot) {
  const entries = await readDirEntries(modelsRoot);
  const tagDirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const lines = tagDirs.map((tag) => `export * from './${tag}';`);
  await fs.writeFile(path.join(modelsRoot, "index.ts"), `${lines.join("\n")}\n`, "utf8");
}

async function getServiceDirectories() {
  const entries = await readDirEntries(generatedRoot);
  const directories = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const serviceRoot = path.join(generatedRoot, entry.name);
    const endpointsRoot = path.join(serviceRoot, "endpoints");
    const modelsRoot = path.join(serviceRoot, "models");

    try {
      await fs.access(endpointsRoot);
      await fs.access(modelsRoot);
      directories.push({ service: entry.name, endpointsRoot, modelsRoot });
    } catch {
      // skip non-orval directories
    }
  }

  return directories;
}

async function run() {
  const services = await getServiceDirectories();
  if (!services.length) {
    return;
  }

  for (const { service, endpointsRoot, modelsRoot } of services) {
    const tagFiles = await getTagFiles(endpointsRoot);
    if (!tagFiles.length) {
      continue;
    }

    const modelMap = await buildModelMap(modelsRoot);
    for (const { tag, filePath } of tagFiles) {
      const content = await fs.readFile(filePath, "utf8");
      const { updatedContent } = await copyTagModels(
        endpointsRoot,
        modelsRoot,
        tag,
        content,
        modelMap,
      );
      if (updatedContent !== content) {
        await fs.writeFile(filePath, updatedContent, "utf8");
      }
    }

    await removeRootModelDuplicates(modelsRoot);
    await rewriteRootModelIndex(modelsRoot);

    console.log(`[split-models-by-tag] processed service: ${service}`);
  }
}

run().catch((error) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  console.error(`[split-models-by-tag] ${toPosixPath(message)}`);
  process.exit(1);
});
