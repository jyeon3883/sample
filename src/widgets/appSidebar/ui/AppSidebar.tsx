"use client";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import { routes } from "@/shared/config/routes";

const menuItems = [
  { label: "홈", href: routes.home },
  { label: "공지사항", href: routes.notice },
  { label: "Q&A", href: routes.qna },
];

export function AppSidebar() {
  return (
    <List disablePadding sx={{ pt: 1 }}>
      {menuItems.map((item, idx) => (
        <div key={item.href}>
          {idx > 0 && <Divider />}
          <ListItemButton component={Link} href={item.href}>
            <ListItemText primary={item.label} primaryTypographyProps={{ variant: "body2" }} />
          </ListItemButton>
        </div>
      ))}
    </List>
  );
}
