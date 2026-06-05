"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

export type BadgeColor =
  | "primary" | "secondary" | "gray"
  | "danger" | "warning" | "success" | "info" | "disabled";

export type BadgeSize = "sm" | "md" | "lg";
export type BadgeVariant = "solid" | "outline" | "pastel";

export interface BadgeProps {
  label: string | number;
  color?: BadgeColor;
  size?: BadgeSize;
  variant?: BadgeVariant;
  /** 숫자형 label의 최대값. 초과 시 "N+" 표시 (기본 999) */
  max?: number;
  sx?: SxProps<Theme>;
}

const BASE_COLOR: Record<BadgeColor, string> = {
  primary:   "#004EA2",
  secondary: "#4B5563",
  gray:      "#6B7280",
  danger:    "#DC2626",
  warning:   "#B45309",
  success:   "#16A34A",
  info:      "#0284C7",
  disabled:  "#9CA3AF",
};

const PASTEL_BG: Record<BadgeColor, string> = {
  primary:   "#EEF3FB",
  secondary: "#F3F4F6",
  gray:      "#F3F4F6",
  danger:    "#FEF2F2",
  warning:   "#FFFBEB",
  success:   "#F0FDF4",
  info:      "#EFF6FF",
  disabled:  "#F9FAFB",
};

const SIZE_STYLE: Record<BadgeSize, { px: number; py: number; fontSize: string; borderRadius: string }> = {
  sm: { px: 0.875, py: 0.25,  fontSize: "0.6875rem", borderRadius: "3px" },
  md: { px: 1.125, py: 0.375, fontSize: "0.75rem",   borderRadius: "4px" },
  lg: { px: 1.375, py: 0.5,   fontSize: "0.8125rem", borderRadius: "5px" },
};

function formatLabel(label: string | number, max: number): string {
  if (typeof label === "number" && label > max) return `${max}+`;
  return String(label);
}

export function Badge({
  label,
  color = "primary",
  size = "md",
  variant = "solid",
  max = 999,
  sx,
}: BadgeProps) {
  const base = BASE_COLOR[color];
  const s = SIZE_STYLE[size];

  const bgColor   = variant === "solid"   ? base             : variant === "pastel" ? PASTEL_BG[color] : "transparent";
  const textColor = variant === "solid"   ? "#ffffff"        : base;
  const border    = variant === "outline" ? `1px solid ${base}` : "1px solid transparent";

  return (
    <Box
      component="span"
      role="status"
      sx={[
        {
          display: "inline-flex",
          alignItems: "center",
          px: s.px,
          py: s.py,
          bgcolor: bgColor,
          border,
          borderRadius: s.borderRadius,
          lineHeight: 1,
          verticalAlign: "middle",
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Typography
        component="span"
        sx={{ fontSize: s.fontSize, fontWeight: 600, color: textColor, lineHeight: 1.2 }}
      >
        {formatLabel(label, max)}
      </Typography>
    </Box>
  );
}
