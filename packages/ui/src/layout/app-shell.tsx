"use client";

import * as React from "react";
import Box from "@mui/material/Box";

type Props = {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * 슬롯 기반 앱 껍데기.
 * header / sidebar / footer 에 원하는 컴포넌트를 주입합니다.
 */
export function AppShell({ header, sidebar, footer, children }: Props) {
  const hasSidebar = Boolean(sidebar);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {header && <Box component="header">{header}</Box>}

      <Box sx={{ display: "flex", flex: 1 }}>
        {hasSidebar && (
          <Box component="aside" sx={{ flexShrink: 0 }}>
            {sidebar}
          </Box>
        )}
        <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
          {children}
        </Box>
      </Box>

      {footer && <Box component="footer">{footer}</Box>}
    </Box>
  );
}
