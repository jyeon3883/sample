import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const servicesConfigPath = path.join(packageRoot, "codegen-services.json");

const servicesConfig = JSON.parse(fs.readFileSync(servicesConfigPath, "utf8"));
const serviceMap = new Map(
  servicesConfig.services.map((service) => [service.name, service]),
);

const serviceName = process.argv[2];

function run(command) {
  execSync(command, { cwd: packageRoot, stdio: "inherit" });
}

function runOrval(orvalProject) {
  if (orvalProject) {
    run(`orval --project ${orvalProject}`);
    return;
  }

  run("orval");
}

if (serviceName) {
  const service = serviceMap.get(serviceName);
  if (!service) {
    const available = [...serviceMap.keys()].join(", ");
    console.error(
      `[codegen-service] Unknown service "${serviceName}". Available: ${available}`,
    );
    process.exit(1);
  }

  runOrval(service.orvalProject);
} else {
  runOrval();
}

run("node ./scripts/split-models-by-tag.mjs");
run("node ./scripts/sync-endpoint-exports.mjs");
