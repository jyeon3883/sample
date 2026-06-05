"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdiWorkspaceLayout } from "@repo/ui/layout/mdi";
import { {{PascalAppName}}Header } from "@/widgets/{{appName}}Header";
import { {{PascalAppName}}Sidebar } from "@/widgets/{{appName}}Sidebar";
import { TAB_ROUTES } from "@/shared/config/routes";

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <MdiWorkspaceLayout
      pathname={pathname}
      onNavigate={(path) => router.push(path)}
      header={<{{PascalAppName}}Header />}
      sidebar={<{{PascalAppName}}Sidebar />}
      tabRoutes={TAB_ROUTES}
      storageKey="{{storageKey}}"
    >
      {children}
    </MdiWorkspaceLayout>
  );
}
