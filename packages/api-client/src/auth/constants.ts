/** accessToken 쿠키 이름 */
export const ACCESS_TOKEN_COOKIE = "access_token";

/** refreshToken 쿠키 이름 */
export const REFRESH_TOKEN_COOKIE = "refresh_token";

/** 토큰 갱신 API (인터셉터 refresh 루프 방지용 별도 클라이언트에서 사용) */
export const AUTH_REFRESH_PATH = "/api/auth/refresh";

/** 401 시 refresh를 시도하지 않는 경로 (로그인·갱신·로그아웃 등) */
export const AUTH_PATHS_SKIP_REFRESH = [
  "/api/auth/refresh",
  "/api/auth/login",
  "/api/login",
  "/api/auth/logout",
] as const;
