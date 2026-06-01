"use client";

import * as React from "react";
import { useMdiTabStore } from "./use-mdi-tab-store";

export type MdiTab = {
  id: string;
  label: string;
  component: React.ComponentType;
  /**
   * 탭 닫기 전 호출되는 콜백.
   * false를 반환하면 닫기가 취소됩니다.
   * Promise를 반환하면 await 후 처리합니다.
   */
  onBeforeClose?: (id: string) => Promise<boolean | void> | boolean | void;
};

type MdiTabContextValue = {
  tabs: MdiTab[];
  activeId: string | null;
  mountedIds: string[];
  openTab: (
    id: string,
    label: string,
    component: React.ComponentType,
    onBeforeClose?: MdiTab["onBeforeClose"],
  ) => void;
  /**
   * hydration 복원 전용: 기존 tabsMeta 항목에 컴포넌트만 등록.
   * activeId / mountedIds는 건드리지 않습니다.
   */
  restoreTab: (
    id: string,
    component: React.ComponentType,
    onBeforeClose?: MdiTab["onBeforeClose"],
  ) => void;
  closeTab: (id: string) => Promise<void>;
  activateTab: (id: string) => void;
  /**
   * 탭 컴포넌트 내부에서 닫기 전 콜백을 동적으로 등록합니다.
   * useRegisterTabClose 훅을 통해 사용하세요.
   */
  registerCloseCallback: (id: string, callback: NonNullable<MdiTab["onBeforeClose"]>) => void;
  unregisterCloseCallback: (id: string) => void;
};

const MdiTabContext = React.createContext<MdiTabContextValue | null>(null);

export function MdiTabProvider({ children }: { children: React.ReactNode }) {
  // 렌더링에 필요한 상태값만 구독 (actions는 getState()로 호출해 안정적)
  const tabsMeta = useMdiTabStore((s) => s.tabsMeta);
  const activeId = useMdiTabStore((s) => s.activeId);
  const mountedIds = useMdiTabStore((s) => s.mountedIds);

  /**
   * component, onBeforeClose는 직렬화 불가이므로 메모리에만 보관.
   * 탭 id를 키로 사용.
   */
  const componentRegistry = React.useRef<Map<string, React.ComponentType>>(new Map());
  const closeCallbackRegistry = React.useRef<Map<string, MdiTab["onBeforeClose"]>>(new Map());

  // SSR hydration: 클라이언트 마운트 시 localStorage에서 복원
  React.useEffect(() => {
    useMdiTabStore.persist.rehydrate();
  }, []);

  const openTab = React.useCallback(
    (
      id: string,
      label: string,
      component: React.ComponentType,
      onBeforeClose?: MdiTab["onBeforeClose"],
    ) => {
      componentRegistry.current.set(id, component);
      if (onBeforeClose) {
        closeCallbackRegistry.current.set(id, onBeforeClose);
      }
      const s = useMdiTabStore.getState();
      // 이미 존재하는 탭이면 activeId를 바꾸지 않음 (persist 복원 시 덮어쓰기 방지)
      const existed = s.tabsMeta.some((t) => t.id === id);
      s.addTabMeta({ id, label });
      if (!existed) {
        s.setActiveId(id);
      }
      s.activateMounted(id);
    },
    [],
  );

  const restoreTab = React.useCallback(
    (
      id: string,
      component: React.ComponentType,
      onBeforeClose?: MdiTab["onBeforeClose"],
    ) => {
      componentRegistry.current.set(id, component);
      if (onBeforeClose) {
        closeCallbackRegistry.current.set(id, onBeforeClose);
      }
      // tabsMeta / activeId / mountedIds는 이미 persist에서 복원됨 — 건드리지 않음
    },
    [],
  );

  const closeTab = React.useCallback(async (id: string) => {
    const onBeforeClose = closeCallbackRegistry.current.get(id);
    if (onBeforeClose) {
      const result = await onBeforeClose(id);
      if (result === false) return;
    }

    componentRegistry.current.delete(id);
    closeCallbackRegistry.current.delete(id);

    const s = useMdiTabStore.getState();
    const { tabsMeta: meta, activeId: curActiveId } = s;
    const idx = meta.findIndex((t) => t.id === id);
    const next = meta.filter((t) => t.id !== id);

    s.removeTabMeta(id);
    s.removeMounted(id);
    s.removeTabState(id);

    if (curActiveId === id) {
      if (next.length === 0) {
        s.setActiveId(null);
      } else {
        const prevIdx = Math.max(0, idx - 1);
        s.setActiveId(next[prevIdx]?.id ?? null);
      }
    }
  }, []);

  const activateTab = React.useCallback((id: string) => {
    const s = useMdiTabStore.getState();
    s.setActiveId(id);
    s.activateMounted(id);
  }, []);

  const registerCloseCallback = React.useCallback(
    (id: string, callback: NonNullable<MdiTab["onBeforeClose"]>) => {
      closeCallbackRegistry.current.set(id, callback);
    },
    [],
  );

  const unregisterCloseCallback = React.useCallback((id: string) => {
    closeCallbackRegistry.current.delete(id);
  }, []);

  // tabsMeta와 componentRegistry를 합쳐서 MdiTab[] 구성
  const tabs = React.useMemo<MdiTab[]>(() => {
    const result: MdiTab[] = [];
    for (const meta of tabsMeta) {
      const component = componentRegistry.current.get(meta.id);
      if (!component) continue;
      result.push({
        id: meta.id,
        label: meta.label,
        component,
        onBeforeClose: closeCallbackRegistry.current.get(meta.id),
      });
    }
    return result;
  }, [tabsMeta]);

  const value = React.useMemo<MdiTabContextValue>(
    () => ({
      tabs,
      activeId,
      mountedIds,
      openTab,
      restoreTab,
      closeTab,
      activateTab,
      registerCloseCallback,
      unregisterCloseCallback,
    }),
    [tabs, activeId, mountedIds, openTab, restoreTab, closeTab, activateTab, registerCloseCallback, unregisterCloseCallback],
  );

  return <MdiTabContext.Provider value={value}>{children}</MdiTabContext.Provider>;
}

export function useMdiTab(): MdiTabContextValue {
  const ctx = React.useContext(MdiTabContext);
  if (!ctx) throw new Error("useMdiTab must be used inside MdiTabProvider");
  return ctx;
}
