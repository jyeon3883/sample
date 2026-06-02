"use client";

import * as React from "react";
import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import Box from "@mui/material/Box";
import { BaseLayout } from "../BaseLayout";
import { MdiTabBar } from "./MdiTabBar";
import { MdiTabPanel } from "./MdiTabPanel";
import { MdiTabProvider, useMdiTab, useMdiTabStore, useMdiTabStoreApi } from "./MdiTabContext";

export interface TabRouteConfig {
  title: string;
  loader: () => Promise<{ default: ComponentType }>;
}

export type TabRouteMap = Record<string, TabRouteConfig>;

type MdiWorkspaceLayoutProps = {
  pathname: string;
  onNavigate: (path: string) => void;
  header: React.ReactNode;
  sidebar: React.ReactNode;
  tabRoutes: TabRouteMap;
  children: React.ReactNode;
  storageKey?: string;
  loadingFallback?: React.ReactNode;
};

type MdiPersistApi = {
  onFinishHydration: (callback: () => void) => () => void;
  hasHydrated?: () => boolean;
};

function getPersistApi(store: ReturnType<typeof useMdiTabStoreApi>) {
  return (store as typeof store & { persist?: MdiPersistApi }).persist ?? null;
}

function getPageTitle(pathname: string, tabRoutes: TabRouteMap): string {
  return tabRoutes[pathname]?.title ?? pathname;
}

function MdiWorkspaceLayoutInner({
  pathname,
  onNavigate,
  header,
  sidebar,
  tabRoutes,
  children,
  loadingFallback,
}: Omit<MdiWorkspaceLayoutProps, "storageKey">) {
  const { openTab, restoreTab, tabs } = useMdiTab();
  const mdiStore = useMdiTabStoreApi();
  const activeId = useMdiTabStore((s) => s.activeId);
  const [hydrated, setHydrated] = useState(false);
  const hydrationHandledRef = useRef(false);

  const pageComponentMap: Record<string, ComponentType> = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(tabRoutes).map(([path, cfg]) => [path, lazy(cfg.loader)]),
      ),
    [tabRoutes],
  );

  // persist 복원 완료 시점에 탭 메타 정리/복원을 1회 수행
  useEffect(() => {
    const handleHydration = () => {
      if (hydrationHandledRef.current) return;
      hydrationHandledRef.current = true;

      const s = mdiStore.getState();

      const unknownSet = new Set(
        s.tabsMeta.filter((m) => !pageComponentMap[m.id]).map((m) => m.id),
      );

      unknownSet.forEach((id) => {
        s.removeTabMeta(id);
        s.removeMounted(id);
        s.removeTabState(id);
      });

      if (s.activeId && unknownSet.has(s.activeId)) {
        const remaining = s.tabsMeta.filter((m) => !unknownSet.has(m.id));
        s.setActiveId(remaining[0]?.id ?? null);
      }

      s.tabsMeta.forEach((meta) => {
        if (unknownSet.has(meta.id)) return;
        const component = pageComponentMap[meta.id];
        if (component) restoreTab(meta.id, component);
      });

      setHydrated(true);
    };

    const persistApi = getPersistApi(mdiStore);
    if (!persistApi) {
      handleHydration();
      return;
    }

    if (persistApi.hasHydrated?.()) {
      handleHydration();
      return;
    }

    return persistApi.onFinishHydration(handleHydration);
  }, [mdiStore, pageComponentMap, restoreTab]);

  // 현재 pathname 탭 열기 (hydration 완료 후)
  useEffect(() => {
    if (!hydrated) return;
    const component = pageComponentMap[pathname];
    if (component) {
      openTab(pathname, getPageTitle(pathname, tabRoutes), component);
    }
  }, [hydrated, openTab, pageComponentMap, pathname, tabRoutes]);

  // activeId ↔ URL 동기화
  useEffect(() => {
    if (!hydrated || !activeId || activeId === pathname) return;
    onNavigate(activeId);
  }, [activeId, hydrated, onNavigate, pathname]);

  return (
    <BaseLayout header={header} sidebar={sidebar}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <MdiTabBar />
        {tabs.length > 0 ? (
          <Suspense fallback={loadingFallback ?? <Box sx={{ p: 2 }}>로딩 중...</Box>}>
            <MdiTabPanel />
          </Suspense>
        ) : (
          <Box sx={{ p: 2 }}>{children}</Box>
        )}
      </Box>
    </BaseLayout>
  );
}

export function MdiWorkspaceLayout({
  storageKey = "mdi-tabs",
  ...props
}: MdiWorkspaceLayoutProps) {
  return (
    <MdiTabProvider storageKey={storageKey}>
      <MdiWorkspaceLayoutInner {...props} />
    </MdiTabProvider>
  );
}
