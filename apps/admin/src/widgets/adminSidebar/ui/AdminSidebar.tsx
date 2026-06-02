"use client";

import Link from "next/link";
import { CommonSidebar, type SidebarMenuItem } from "@repo/ui/layout";
import { routes } from "@/shared/config/routes";

const menuItems: SidebarMenuItem[] = [
  { label: "대시보드", href: routes.home },
  { label: "회원 관리", href: routes.members },
  { label: "설정", href: routes.settings },
];

export function AdminSidebar() {
  return <CommonSidebar items={menuItems} linkComponent={Link} />;
}
