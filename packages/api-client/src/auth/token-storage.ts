import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "./constants";

type SameSite = "Strict" | "Lax" | "None";

interface CookieOptions {
  maxAge?: number;
  expires?: Date;
  path?: string;
  sameSite?: SameSite;
  secure?: boolean;
}

const isBrowser = (): boolean => typeof document !== "undefined";

const defaultCookieOptions = (): CookieOptions => ({
  path: "/",
  sameSite: "Lax",
  secure:
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_APP_ENV === "prod",
});

function readCookie(name: string): string | undefined {
  if (!isBrowser()) return undefined;

  const encoded = encodeURIComponent(name);
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${encoded}=([^;]*)`),
  );

  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

function writeCookie(
  name: string,
  value: string,
  options?: CookieOptions,
): void {
  if (!isBrowser()) return;

  const merged = { ...defaultCookieOptions(), ...options };
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (merged.maxAge !== undefined) {
    cookie += `; Max-Age=${merged.maxAge}`;
  }
  if (merged.expires) {
    cookie += `; expires=${merged.expires.toUTCString()}`;
  }
  cookie += `; path=${merged.path ?? "/"}`;
  cookie += `; SameSite=${merged.sameSite ?? "Lax"}`;
  if (merged.secure) {
    cookie += "; Secure";
  }

  document.cookie = cookie;
}

function deleteCookie(name: string): void {
  writeCookie(name, "", { maxAge: 0 });
}

function toMaxAge(seconds?: number): number | undefined {
  if (seconds === undefined || seconds <= 0) return undefined;
  return Math.floor(seconds);
}

export function getAccessToken(): string | undefined {
  return readCookie(ACCESS_TOKEN_COOKIE);
}

export function setAccessToken(token: string, expiresInSeconds?: number): void {
  writeCookie(ACCESS_TOKEN_COOKIE, token, {
    maxAge: toMaxAge(expiresInSeconds),
  });
}

export function removeAccessToken(): void {
  deleteCookie(ACCESS_TOKEN_COOKIE);
}

export function getRefreshToken(): string | undefined {
  return readCookie(REFRESH_TOKEN_COOKIE);
}

export function setRefreshToken(
  token: string,
  expiresInSeconds?: number,
): void {
  writeCookie(REFRESH_TOKEN_COOKIE, token, {
    maxAge: toMaxAge(expiresInSeconds),
  });
}

export function removeRefreshToken(): void {
  deleteCookie(REFRESH_TOKEN_COOKIE);
}

export function clearAuthTokens(): void {
  removeAccessToken();
  removeRefreshToken();
}
