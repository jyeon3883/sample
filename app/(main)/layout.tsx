"use client";

import {
  lazy,
  Suspense,
  useState,
  useEffect,
  type ComponentType,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import { BaseLayout } from "@repo/ui/layout/base-layout";
import {
  MdiTabProvider,
  MdiTabBar,
  MdiTabPanel,
  useMdiTab,
  useMdiTabStore,
} from "@repo/ui/layout/mdi";
import { AppHeader } from "@/widgets/appHeader";
import { AppSidebar } from "@/widgets/appSidebar";
import { TAB_ROUTES } from "@/shared/config/routes";

// 모듈 레벨에서 한 번만 생성 (리렌더 시 재생성 없음)
const PAGE_COMPONENT_MAP: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(TAB_ROUTES).map(([path, cfg]) => [path, lazy(cfg.loader)]),
);

function getPageTitle(pathname: string): string {
  return TAB_ROUTES[pathname]?.title ?? pathname;
}

function MainLayoutInner({ children }: { children: ReactNode }) {
  const { openTab, restoreTab, tabs } = useMdiTab();
  const pathname = usePathname();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  // persist 복원: onFinishHydration 반환값이 구독 해제 함수이므로 바로 return
  useEffect(() => {
    return useMdiTabStore.persist.onFinishHydration(() => {
      const s = useMdiTabStore.getState();

      // Set으로 변환해 이후 has() 조회를 O(1)로 처리
      const unknownSet = new Set(
        s.tabsMeta.filter((m) => !PAGE_COMPONENT_MAP[m.id]).map((m) => m.id),
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

      // 단일 루프로 유효한 탭 컴포넌트 복원 (activeId/mountedIds 변경 없음)
      s.tabsMeta.forEach((meta) => {
        if (unknownSet.has(meta.id)) return;
        const component = PAGE_COMPONENT_MAP[meta.id];
        if (component) restoreTab(meta.id, component);
      });

      setHydrated(true);
    });
  }, [restoreTab]);

  // 현재 pathname 탭 열기 (hydration 완료 후)
  useEffect(() => {
    if (!hydrated) return;
    const component = PAGE_COMPONENT_MAP[pathname];
    if (component) openTab(pathname, getPageTitle(pathname), component);
  }, [pathname, openTab, hydrated]);

  // activeId ↔ URL 동기화: 탭 클릭/닫기로 activeId가 바뀌면 URL 갱신
  // pathname이 deps에 있어도 activeId === pathname 가드로 무한 루프 방지
  const activeId = useMdiTabStore((s) => s.activeId);
  useEffect(() => {
    if (!hydrated || !activeId || activeId === pathname) return;
    router.push(activeId);
  }, [activeId, hydrated, pathname, router]);

  return (
    <BaseLayout header={<AppHeader />} sidebar={<AppSidebar />}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <MdiTabBar />
        {tabs.length > 0 ? (
          <Suspense fallback={<Box sx={{ p: 2 }}>로딩 중...</Box>}>
            <MdiTabPanel />
          </Suspense>
        ) : (
          <Box sx={{ p: 2 }}>{children}</Box>
        )}
      </Box>
    </BaseLayout>
  );
}

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <MdiTabProvider>
      <MainLayoutInner>{children}</MainLayoutInner>
    </MdiTabProvider>
  );
}
