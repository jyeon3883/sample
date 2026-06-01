"use client";

import * as React from "react";
import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { useMdiTab } from "./MdiTabContext";

export function MdiTabBar() {
  const { tabs, activeId, activateTab, closeTab } = useMdiTab();

  if (tabs.length === 0) return null;

  const activeValue = tabs.findIndex((t) => t.id === activeId);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "background.paper" }}>
      <MuiTabs
        value={activeValue === -1 ? 0 : activeValue}
        onChange={(_, idx: number) => {
          const tab = tabs[idx];
          if (tab) activateTab(tab.id);
        }}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab) => (
          <MuiTab
            key={tab.id}
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <span>{tab.label}</span>
                <IconButton
                  component="span"
                  size="small"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  sx={{ p: 0.25 }}
                >
                  <CloseIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Box>
            }
            sx={{ minHeight: 40, textTransform: "none" }}
          />
        ))}
      </MuiTabs>
    </Box>
  );
}
