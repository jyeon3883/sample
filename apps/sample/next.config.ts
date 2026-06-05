import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadAppEnv } from "../../scripts/load-app-env.mjs";

const appDir = path.dirname(fileURLToPath(import.meta.url));
loadAppEnv(appDir);

const nextConfig: NextConfig = {
  transpilePackages: [
    "@repo/ui",
    "@repo/query",
    "@repo/api-client",
    "echarts",
    "zrender",
  ],
};

export default nextConfig;
