"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { useMdiTab } from "./mdi-tab-context";

export function MdiTabPanel() {
  const { tabs, activeId, mountedIds } = useMdiTab();

  if (tabs.length === 0) return null;

  return (
    <Box sx={{ flex: 1, overflow: "auto", position: "relative" }}>
      {tabs.map((tab) => {
        const isMounted = mountedIds.includes(tab.id);
        const isActive = tab.id === activeId;

        if (!isMounted) return null;

        const Component = tab.component;
        return (
          <Box
            key={tab.id}
            sx={{ display: isActive ? "block" : "none", height: "100%" }}
          >
            <Component />
          </Box>
        );
      })}
    </Box>
  );
}
