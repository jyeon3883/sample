"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

type Props = {
  children: React.ReactNode;
  maxWidth?: number;
};

export function LoginLayout({ children, maxWidth = 400 }: Props) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Paper elevation={3} sx={{ width: maxWidth, p: 4 }}>
        {children}
      </Paper>
    </Box>
  );
}
