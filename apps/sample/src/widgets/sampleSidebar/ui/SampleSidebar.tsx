"use client";

import Link from "next/link";
import { CommonSidebar, type SidebarMenuItem } from "@repo/ui/layout";
import { routes } from "@/shared/config/routes";

const menuItems: SidebarMenuItem[] = [
  { label: "홈", href: routes.home },
  { label: "목록", href: routes.list },
];

export function SampleSidebar() {
  return <CommonSidebar items={menuItems} linkComponent={Link} />;
}
