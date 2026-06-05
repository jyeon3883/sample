import { config as loadEnv } from "dotenv";
import fs from "node:fs";
import path from "node:path";

const VALID_APP_ENVS = new Set(["local", "dev", "prod"]);

/**
 * APP_ENV(local|dev|prod)에 맞는 env 파일을 로드합니다.
 * 루트 공통 env를 먼저 읽고, 앱별 env는 override로 덮어씁니다.
 * @param {string} appDir - 앱 디렉터리 (예: apps/web)
 */
export function loadAppEnv(appDir) {
  const appEnv = process.env.APP_ENV ?? "local";

  if (!VALID_APP_ENVS.has(appEnv)) {
    throw new Error(
      `Invalid APP_ENV="${appEnv}". Expected one of: local, dev, prod.`,
    );
  }

  const rootDir = path.resolve(appDir, "../..");
  const envFiles = [
    path.join(rootDir, `.env.${appEnv}`),
    path.join(rootDir, ".env.override"),
    path.join(appDir, `.env.${appEnv}`),
    path.join(appDir, ".env.override"),
  ];

  for (const filePath of envFiles) {
    if (fs.existsSync(filePath)) {
      loadEnv({ path: filePath, override: true });
    }
  }

  process.env.NEXT_PUBLIC_APP_ENV ??= appEnv;
}
