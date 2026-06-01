"use client";

import * as React from "react";
import Box from "@mui/material/Box";

type Props = {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
  sidebarWidth?: number;
};

export function BaseLayout({ header, sidebar, children, sidebarWidth = 240 }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Box component="header" sx={{ flexShrink: 0 }}>
        {header}
      </Box>
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Box
          component="aside"
          sx={{
            width: sidebarWidth,
            flexShrink: 0,
            overflow: "auto",
            borderRight: "1px solid",
            borderColor: "divider",
          }}
        >
          {sidebar}
        </Box>
        <Box component="main" sx={{ flex: 1, overflow: "auto" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
