"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

type CommonHeaderProps = {
  title: string;
  actions?: React.ReactNode;
};

export function CommonHeader({ title, actions }: CommonHeaderProps) {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar variant="dense">
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          {title}
        </Typography>
        {actions && <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>{actions}</Box>}
      </Toolbar>
    </AppBar>
  );
}
