"use client";

import Link from "next/link";
import { CommonSidebar, type SidebarMenuItem } from "@repo/ui/layout";
import { routes } from "@/shared/config/routes";

const menuItems: SidebarMenuItem[] = [
  { label: "홈", href: routes.home },
  { label: "공지사항", href: routes.notice },
  { label: "Q&A", href: routes.qna },
];

export function AppSidebar() {
  return <CommonSidebar items={menuItems} linkComponent={Link} />;
}
