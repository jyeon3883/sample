/** 로그인·refresh API 응답과 동일한 토큰 필드 (codegen 타입과 호환) */
export interface AuthTokenPayload {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
  refreshExpiresIn?: number;
}
