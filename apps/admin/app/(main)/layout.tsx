"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdiWorkspaceLayout } from "@repo/ui/layout/mdi";
import { AdminHeader } from "@/widgets/adminHeader";
import { AdminSidebar } from "@/widgets/adminSidebar";
import { TAB_ROUTES } from "@/shared/config/routes";

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <MdiWorkspaceLayout
      pathname={pathname}
      onNavigate={(path) => router.push(path)}
      header={<AdminHeader />}
      sidebar={<AdminSidebar />}
      tabRoutes={TAB_ROUTES}
      storageKey="mdi-tabs-admin"
    >
      {children}
    </MdiWorkspaceLayout>
  );
}
