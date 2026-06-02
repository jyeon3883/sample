"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdiWorkspaceLayout } from "@repo/ui/layout/mdi";
import { AppHeader } from "@/widgets/appHeader";
import { AppSidebar } from "@/widgets/appSidebar";
import { TAB_ROUTES } from "@/shared/config/routes";

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <MdiWorkspaceLayout
      pathname={pathname}
      onNavigate={(path) => router.push(path)}
      header={<AppHeader />}
      sidebar={<AppSidebar />}
      tabRoutes={TAB_ROUTES}
      storageKey="mdi-tabs-web"
    >
      {children}
    </MdiWorkspaceLayout>
  );
}
