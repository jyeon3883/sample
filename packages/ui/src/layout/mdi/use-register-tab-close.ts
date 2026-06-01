"use client";

import { useEffect, useRef } from "react";
import { useMdiTab, type MdiTab } from "./mdi-tab-context";

type CloseCallback = NonNullable<MdiTab["onBeforeClose"]>;

/**
 * 탭 컴포넌트 내부에서 탭 닫기 전 콜백을 등록하는 훅.
 *
 * - 컴포넌트가 마운트될 때 콜백을 등록하고, 언마운트될 때 자동 해제합니다.
 * - `false`를 반환하면 닫기가 취소되고, `void`/`true` 반환 시 닫힙니다.
 * - Promise를 반환하면 await 후 처리합니다 (비동기 확인 다이얼로그 등).
 *
 * @example
 * function NoticeTab({ tabId }: { tabId: string }) {
 *   const [isDirty, setIsDirty] = useState(false);
 *
 *   useRegisterTabClose(tabId, async () => {
 *     if (!isDirty) return true;
 *     const ok = await confirm("저장하지 않은 내용이 있습니다. 닫으시겠습니까?");
 *     return ok;
 *   });
 *
 *   return <div>...</div>;
 * }
 */
export function useRegisterTabClose(tabId: string, callback: CloseCallback) {
  const { registerCloseCallback, unregisterCloseCallback } = useMdiTab();

  // 최신 콜백을 ref로 유지하여 dependency 없이 항상 최신 함수 호출
  const callbackRef = useRef<CloseCallback>(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const stableCallback: CloseCallback = (id) => callbackRef.current(id);
    registerCloseCallback(tabId, stableCallback);
    return () => {
      unregisterCloseCallback(tabId);
    };
  }, [tabId, registerCloseCallback, unregisterCloseCallback]);
}
