"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdiWorkspaceLayout } from "@repo/ui/layout/mdi";
import { SampleHeader } from "@/widgets/sampleHeader";
import { SampleSidebar } from "@/widgets/sampleSidebar";
import { TAB_ROUTES } from "@/shared/config/routes";

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <MdiWorkspaceLayout
      pathname={pathname}
      onNavigate={(path) => router.push(path)}
      header={<SampleHeader />}
      sidebar={<SampleSidebar />}
      tabRoutes={TAB_ROUTES}
      storageKey="mdi-tabs-sample"
    >
      {children}
    </MdiWorkspaceLayout>
  );
}
