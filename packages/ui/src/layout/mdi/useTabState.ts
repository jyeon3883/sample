"use client";

import { useMdiTabStore } from "./useMdiTabStore";

/**
 * 탭별 상태를 Zustand 스토어에 저장하는 훅.
 * 컴포넌트가 LRU로 언마운트/리마운트되어도 상태가 유지되며,
 * 탭이 닫힐 때 자동으로 상태가 삭제됩니다.
 *
 * @param tabId   탭 식별자 (openTab에 전달한 id)
 * @param initialState  초기 상태값 (스토어에 기존값이 없을 때만 사용)
 */
export function useTabState<T>(
  tabId: string,
  initialState: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const stored = useMdiTabStore((s) => s.tabStates[tabId]);
  const setTabState = useMdiTabStore((s) => s.setTabState);

  const state = (stored !== undefined ? stored : initialState) as T;

  const setState = (value: T | ((prev: T) => T)) => {
    if (typeof value === "function") {
      const updater = value as (prev: T) => T;
      setTabState(tabId, updater(state));
    } else {
      setTabState(tabId, value);
    }
  };

  return [state, setState];
}
