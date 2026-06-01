"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import { BaseLayout } from "@repo/ui/layout/base-layout";
import { MdiTabProvider, MdiTabBar, MdiTabPanel, useMdiTab } from "@repo/ui/layout/mdi";
import { AppHeader } from "@/widgets/app-header";
import { AppSidebar } from "@/widgets/app-sidebar";
import { routes } from "@/shared/config/routes";

const PAGE_TITLE_MAP: Record<string, string> = {
  [routes.home]: "홈",
  [routes.notice]: "공지사항",
  [routes.qna]: "Q&A",
};

function getPageTitle(pathname: string): string {
  return PAGE_TITLE_MAP[pathname] ?? pathname;
}

const PAGE_COMPONENT_MAP: Record<string, React.ComponentType> = {
  [routes.home]: React.lazy(() =>
    import("@/screens/home").then((m) => ({ default: m.HomePage })),
  ),
  [routes.notice]: React.lazy(() =>
    import("@/screens/notice").then((m) => ({ default: m.NoticePage })),
  ),
  [routes.qna]: React.lazy(() =>
    import("@/screens/qna").then((m) => ({ default: m.QnaPage })),
  ),
};

function MainLayoutInner({ children }: { children: React.ReactNode }) {
  const { openTab, tabs } = useMdiTab();
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    const component = PAGE_COMPONENT_MAP[pathname];
    if (component) {
      openTab(pathname, getPageTitle(pathname), component);
    }
  }, [pathname, openTab]);

  const hasTabs = tabs.length > 0;

  return (
    <BaseLayout
      header={<AppHeader />}
      sidebar={<AppSidebar />}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <MdiTabBar />
        {hasTabs ? (
          <React.Suspense fallback={<Box sx={{ p: 2 }}>로딩 중...</Box>}>
            <MdiTabPanel />
          </React.Suspense>
        ) : (
          <Box sx={{ p: 2 }}>{children}</Box>
        )}
      </Box>
    </BaseLayout>
  );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <MdiTabProvider>
      <MainLayoutInner>{children}</MainLayoutInner>
    </MdiTabProvider>
  );
}
