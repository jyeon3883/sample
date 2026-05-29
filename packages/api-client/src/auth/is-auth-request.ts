import { AUTH_PATHS_SKIP_REFRESH } from "./constants";

export function shouldSkipTokenRefresh(url?: string): boolean {
  if (!url) return false;
  return AUTH_PATHS_SKIP_REFRESH.some((path) => url.includes(path));
}
