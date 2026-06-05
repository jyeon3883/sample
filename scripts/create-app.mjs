#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const TEMPLATE_DIR = path.join(ROOT_DIR, "templates", "app");
const APPS_DIR = path.join(ROOT_DIR, "apps");
const ROOT_PACKAGE_JSON = path.join(ROOT_DIR, "package.json");

const PLACEHOLDER_PATTERN = /\{\{(\w+)\}\}/g;

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function toPascalCase(value) {
  return value
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function validateAppName(name) {
  if (!name) {
    throw new Error("--name 인자가 필요합니다. 예: pnpm create:app --name portal");
  }
  if (!/^[a-z][a-z0-9]*$/.test(name)) {
    throw new Error(
      "앱 이름은 소문자로 시작하고 영문 소문자·숫자만 사용할 수 있습니다. 예: portal, shop2"
    );
  }
}

function collectUsedPorts() {
  const used = new Set();
  if (!fs.existsSync(APPS_DIR)) return used;

  for (const entry of fs.readdirSync(APPS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const pkgPath = path.join(APPS_DIR, entry.name, "package.json");
    if (!fs.existsSync(pkgPath)) continue;

    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    const scripts = [pkg.scripts?.dev, pkg.scripts?.start].filter(Boolean).join(" ");
    const matches = scripts.matchAll(/--port\s+(\d+)/g);
    for (const match of matches) {
      used.add(Number(match[1]));
    }
  }

  return used;
}

function resolvePort(requestedPort) {
  const used = collectUsedPorts();

  if (requestedPort !== undefined) {
    const port = Number(requestedPort);
    if (!Number.isInteger(port) || port < 1024 || port > 65535) {
      throw new Error("포트는 1024~65535 범위의 정수여야 합니다.");
    }
    if (used.has(port)) {
      throw new Error(`포트 ${port}는 이미 다른 앱에서 사용 중입니다.`);
    }
    return port;
  }

  for (let port = 3002; port <= 3099; port += 1) {
    if (!used.has(port)) return port;
  }

  throw new Error("사용 가능한 포트를 찾지 못했습니다. --port로 직접 지정해 주세요.");
}

function buildReplacements({ appName, port, displayName }) {
  return {
    appName,
    packageName: `@repo/${appName}`,
    port: String(port),
    displayName: displayName ?? appName,
    storageKey: `mdi-tabs-${appName}`,
    PascalAppName: toPascalCase(appName),
  };
}

function applyPlaceholders(value, replacements) {
  return value.replace(PLACEHOLDER_PATTERN, (_, key) => {
    if (!(key in replacements)) {
      throw new Error(`알 수 없는 placeholder: {{${key}}}`);
    }
    return replacements[key];
  });
}

function isTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return [
    "",
    ".ts",
    ".tsx",
    ".js",
    ".mjs",
    ".json",
    ".css",
    ".md",
    ".env",
    ".local",
    ".dev",
    ".prod",
    ".prettierrc",
    ".gitkeep",
  ].includes(ext) || path.basename(filePath).startsWith(".env");
}

function copyTemplate({ sourceDir, targetDir, replacements }) {
  fs.mkdirSync(targetDir, { recursive: true });

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const resolvedName = applyPlaceholders(entry.name, replacements);
    const targetPath = path.join(targetDir, resolvedName);

    if (entry.isDirectory()) {
      copyTemplate({ sourceDir: sourcePath, targetDir: targetPath, replacements });
      continue;
    }

    if (isTextFile(sourcePath)) {
      const content = fs.readFileSync(sourcePath, "utf8");
      fs.writeFileSync(targetPath, applyPlaceholders(content, replacements), "utf8");
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function findLastKeyMatching(scripts, predicate) {
  const keys = Object.keys(scripts);
  for (let i = keys.length - 1; i >= 0; i -= 1) {
    if (predicate(keys[i])) return keys[i];
  }
  return null;
}

function insertScriptsAfter(scripts, anchorKey, entries) {
  const keys = Object.keys(scripts);
  const anchorIndex = anchorKey ? keys.indexOf(anchorKey) : keys.length - 1;
  const insertAt = anchorIndex === -1 ? keys.length : anchorIndex + 1;

  const ordered = Object.entries(scripts);
  ordered.splice(insertAt, 0, ...entries);
  return Object.fromEntries(ordered);
}

function addRootScripts(appName) {
  const pkg = JSON.parse(fs.readFileSync(ROOT_PACKAGE_JSON, "utf8"));
  const scripts = pkg.scripts ?? {};
  const filter = `@repo/${appName}`;
  const additions = [
    [`dev:${appName}`, `pnpm --filter ${filter} dev`],
    [`build:${appName}`, `pnpm --filter ${filter} build`],
    [`build:${appName}:dev`, `pnpm --filter ${filter} build:dev`],
    [`build:${appName}:prod`, `pnpm --filter ${filter} build:prod`],
    [`lint:${appName}`, `pnpm --filter ${filter} lint`],
    [`typecheck:${appName}`, `pnpm --filter ${filter} typecheck`],
  ];

  for (const [key] of additions) {
    if (scripts[key]) {
      throw new Error(`루트 package.json에 이미 "${key}" 스크립트가 있습니다.`);
    }
  }

  let nextScripts = { ...scripts };
  const groups = [
    { prefix: "dev:", additions: additions.slice(0, 1) },
    { prefix: "build:", additions: additions.slice(1, 4) },
    { prefix: "lint:", additions: additions.slice(4, 5) },
    { prefix: "typecheck:", additions: additions.slice(5, 6) },
  ];

  for (const group of groups) {
    const anchorKey = findLastKeyMatching(nextScripts, (key) => key.startsWith(group.prefix));
    nextScripts = insertScriptsAfter(nextScripts, anchorKey, group.additions);
  }

  pkg.scripts = nextScripts;
  fs.writeFileSync(ROOT_PACKAGE_JSON, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
}

function printUsage() {
  console.log(`
사용법:
  pnpm create:app --name <appName> [--port <port>] [--display "<표시명>"]

예시:
  pnpm create:app --name portal --port 3002 --display "포털"
  pnpm create:app --name shop
`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printUsage();
    return;
  }

  validateAppName(args.name);

  const appName = args.name;
  const targetDir = path.join(APPS_DIR, appName);

  if (fs.existsSync(targetDir)) {
    throw new Error(`apps/${appName} 디렉터리가 이미 존재합니다.`);
  }

  if (!fs.existsSync(TEMPLATE_DIR)) {
    throw new Error(`템플릿을 찾을 수 없습니다: ${TEMPLATE_DIR}`);
  }

  const port = resolvePort(args.port);
  const replacements = buildReplacements({
    appName,
    port,
    displayName: args.display,
  });

  copyTemplate({ sourceDir: TEMPLATE_DIR, targetDir, replacements });
  addRootScripts(appName);

  console.log("");
  console.log(`앱이 생성되었습니다: apps/${appName}`);
  console.log(`패키지: ${replacements.packageName}`);
  console.log(`포트: ${port}`);
  console.log(`표시명: ${replacements.displayName}`);
  console.log("");
  console.log("다음 단계:");
  console.log("  pnpm install");
  console.log(`  pnpm dev:${appName}`);
  console.log(`  http://localhost:${port}`);
  console.log("");
}

try {
  main();
} catch (error) {
  console.error(`\n오류: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
}
