"use client";

import Link from "next/link";
import { CommonSidebar, type SidebarMenuItem } from "@repo/ui/layout";
import { routes } from "@/shared/config/routes";

const menuItems: SidebarMenuItem[] = [{ label: "홈", href: routes.home }];

export function {{PascalAppName}}Sidebar() {
  return <CommonSidebar items={menuItems} linkComponent={Link} />;
}
