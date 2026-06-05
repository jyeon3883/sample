import { config as loadEnv } from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "orval";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");

const appEnv = process.env.APP_ENV ?? "local";

loadEnv({ path: path.join(rootDir, `.env.${appEnv}`) });
loadEnv({ path: path.join(rootDir, ".env.override") });

interface CodegenService {
  name: string;
  orvalProject: string;
  openApiEnvKey: string;
  openApiFallback: string;
  outputTarget: string;
  outputSchemas: string;
}

interface CodegenServicesConfig {
  services: CodegenService[];
}

const servicesConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, "codegen-services.json"), "utf8"),
) as CodegenServicesConfig;

const sharedOutput = {
  mode: "tags-split" as const,
  client: "react-query" as const,
  httpClient: "axios" as const,
  indexFiles: true,
  clean: true,
  override: {
    mutator: {
      path: "./src/axios-instance.ts",
      name: "customInstance",
    },
    query: {
      useQuery: true,
      useMutation: true,
    },
  },
};

const orvalProjects = Object.fromEntries(
  servicesConfig.services.map((service) => [
    service.orvalProject,
    {
      input:
        process.env[service.openApiEnvKey] ?? service.openApiFallback,
      output: {
        ...sharedOutput,
        target: service.outputTarget,
        schemas: service.outputSchemas,
      },
    },
  ]),
);

export default defineConfig(orvalProjects);
