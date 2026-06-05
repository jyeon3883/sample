"use client";

import { useState } from "react";
import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

export interface TabItem {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabGroupProps {
  items: TabItem[];
  /** underline: 하단 강조선 (기본값) / filled: 선택 탭에 배경색 */
  variant?: "underline" | "filled";
  orientation?: "horizontal" | "vertical";
  defaultValue?: number;
  sx?: SxProps<Theme>;
}

const GOV_BLUE = "#004EA2";

export function TabGroup({
  items,
  variant = "underline",
  orientation = "horizontal",
  defaultValue = 0,
  sx,
}: TabGroupProps) {
  const [value, setValue] = useState(defaultValue);
  const isFilled   = variant === "filled";
  const isVertical = orientation === "vertical";

  return (
    <Box
      sx={[
        { display: "flex", flexDirection: isVertical ? "row" : "column", width: "100%" },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {/* 탭 목록 */}
      <Box
        sx={
          isVertical
            ? { borderRight: "1px solid #E5E7EB", flexShrink: 0, minWidth: 120 }
            : { borderBottom: isFilled ? "none" : "1px solid #E5E7EB" }
        }
      >
        <MuiTabs
          value={value}
          onChange={(_, v: number) => setValue(v)}
          orientation={orientation}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          TabIndicatorProps={{
            style: isFilled
              ? { display: "none" }
              : { backgroundColor: GOV_BLUE, height: 2 },
          }}
          sx={{
            minHeight: 0,
            "& .MuiTab-root": {
              minHeight: 44,
              minWidth: isVertical ? 120 : 80,
              px: 2.5,
              py: 1.25,
              fontWeight: 500,
              fontSize: "0.9rem",
              color: "text.secondary",
              textTransform: "none",
              letterSpacing: 0,
              ...(isFilled && {
                borderRadius: 1,
                mr: isVertical ? 0 : 0.5,
                mb: isVertical ? 0.5 : 0,
              }),
            },
            "& .MuiTab-root.Mui-selected": {
              color: isFilled ? "#fff" : GOV_BLUE,
              fontWeight: 700,
              bgcolor: isFilled ? GOV_BLUE : "transparent",
            },
            "& .MuiTab-root.Mui-disabled": {
              opacity: 0.4,
            },
          }}
        >
          {items.map((item, i) => (
            <MuiTab
              key={i}
              label={item.label}
              id={`tab-${i}`}
              aria-controls={`tabpanel-${i}`}
              disabled={item.disabled}
            />
          ))}
        </MuiTabs>
      </Box>

      {/* 탭 패널 */}
      {items.map((item, i) => (
        <Box
          key={i}
          role="tabpanel"
          id={`tabpanel-${i}`}
          aria-labelledby={`tab-${i}`}
          hidden={value !== i}
          sx={{ flex: 1, p: 2.5 }}
        >
          {value === i && item.content}
        </Box>
      ))}
    </Box>
  );
}
