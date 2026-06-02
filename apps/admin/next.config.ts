import type { NextConfig } from "next";

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
