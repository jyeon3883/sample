"use client";

import * as React from "react";

export type MdiTab = {
  id: string;
  label: string;
  component: React.ComponentType;
};

type MdiTabContextValue = {
  tabs: MdiTab[];
  activeId: string | null;
  openTab: (id: string, label: string, component: React.ComponentType) => void;
  closeTab: (id: string) => void;
  activateTab: (id: string) => void;
};

const MdiTabContext = React.createContext<MdiTabContextValue | null>(null);

export function MdiTabProvider({ children }: { children: React.ReactNode }) {
  const [tabs, setTabs] = React.useState<MdiTab[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const openTab = React.useCallback(
    (id: string, label: string, component: React.ComponentType) => {
      setTabs((prev) => {
        const exists = prev.find((t) => t.id === id);
        if (exists) return prev;
        return [...prev, { id, label, component }];
      });
      setActiveId(id);
    },
    [],
  );

  const closeTab = React.useCallback(
    (id: string) => {
      setTabs((prev) => {
        const idx = prev.findIndex((t) => t.id === id);
        if (idx === -1) return prev;
        const next = prev.filter((t) => t.id !== id);
        setActiveId((cur) => {
          if (cur !== id) return cur;
          if (next.length === 0) return null;
          // 직전 탭으로 이동
          const prevIdx = Math.max(0, idx - 1);
          return next[prevIdx]?.id ?? null;
        });
        return next;
      });
    },
    [],
  );

  const activateTab = React.useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const value = React.useMemo(
    () => ({ tabs, activeId, openTab, closeTab, activateTab }),
    [tabs, activeId, openTab, closeTab, activateTab],
  );

  return <MdiTabContext.Provider value={value}>{children}</MdiTabContext.Provider>;
}

export function useMdiTab(): MdiTabContextValue {
  const ctx = React.useContext(MdiTabContext);
  if (!ctx) throw new Error("useMdiTab must be used inside MdiTabProvider");
  return ctx;
}
