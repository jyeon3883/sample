"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { useMdiTab } from "./mdi-tab-context";

export function MdiTabPanel() {
  const { tabs, activeId } = useMdiTab();

  if (tabs.length === 0) return null;

  return (
    <Box sx={{ flex: 1, overflow: "auto", position: "relative" }}>
      {tabs.map((tab) => {
        const Component = tab.component;
        return (
          <Box
            key={tab.id}
            sx={{ display: tab.id === activeId ? "block" : "none", height: "100%" }}
          >
            <Component />
          </Box>
        );
      })}
    </Box>
  );
}
