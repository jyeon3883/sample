import type { AuthTokenPayload } from "./types";
import {
  setAccessToken,
  setRefreshToken,
} from "./token-storage";

/** 로그인·refresh 응답을 쿠키에 반영 */
export function persistAuthTokens(tokens: AuthTokenPayload): void {
  if (tokens.accessToken) {
    setAccessToken(tokens.accessToken, tokens.expiresIn);
  }
  if (tokens.refreshToken) {
    setRefreshToken(tokens.refreshToken, tokens.refreshExpiresIn);
  }
}
