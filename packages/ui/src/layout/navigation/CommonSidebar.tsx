"use client";

import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export interface SidebarMenuItem {
  label: string;
  href: string;
}

type CommonSidebarProps = {
  items: SidebarMenuItem[];
  linkComponent: React.ElementType;
};

export function CommonSidebar({ items, linkComponent }: CommonSidebarProps) {
  return (
    <List disablePadding sx={{ pt: 1 }}>
      {items.map((item, idx) => (
        <React.Fragment key={item.href}>
          {idx > 0 && <Divider />}
          <ListItemButton component={linkComponent} href={item.href}>
            <ListItemText primary={item.label} primaryTypographyProps={{ variant: "body2" }} />
          </ListItemButton>
        </React.Fragment>
      ))}
    </List>
  );
}
