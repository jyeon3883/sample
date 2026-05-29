export type AuthExpiredHandler = () => void;

let onAuthExpiredHandler: AuthExpiredHandler | null = null;

/** refresh 실패 등으로 세션이 끊겼을 때 앱에서 로그인 화면으로 보내기 위한 콜백 */
export function setOnAuthExpired(handler: AuthExpiredHandler | null): void {
  onAuthExpiredHandler = handler;
}

export function notifyAuthExpired(): void {
  onAuthExpiredHandler?.();
}
