"use client";

import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

type Props = {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  padding?: number | string;
  children: React.ReactNode;
};

/**
 * 페이지 단위 컨텐츠 영역.
 * screens/* 에서 <main> 대신 사용합니다.
 */
export function PageContainer({
  maxWidth = "lg",
  padding = "2rem",
  children,
}: Props) {
  return (
    <Container maxWidth={maxWidth}>
      <Box sx={{ py: padding }}>{children}</Box>
    </Container>
  );
}
