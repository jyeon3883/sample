"use client";

import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import type { SxProps, Theme } from "@mui/material/styles";

export type LinkSize = "sm" | "md" | "lg";
export type LinkUnderline = "always" | "hover" | "none";
export type LinkColor = "primary" | "secondary";

export interface LinkProps {
  href?: string;
  children: React.ReactNode;
  size?: LinkSize;
  /** true: 새 탭으로 열고 외부 링크 아이콘 표시 */
  external?: boolean;
  disabled?: boolean;
  underline?: LinkUnderline;
  color?: LinkColor;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  sx?: SxProps<Theme>;
}

const GOV_BLUE = "#004EA2";
const GOV_BLUE_VISITED = "#5B3FA6";

const FONT_SIZE: Record<LinkSize, string> = {
  sm: "0.8125rem",
  md: "0.9375rem",
  lg: "1.0625rem",
};

export function Link({
  href,
  children,
  size = "md",
  external = false,
  disabled = false,
  underline = "always",
  color = "primary",
  onClick,
  sx,
}: LinkProps) {
  const baseColor = color === "primary" ? GOV_BLUE : "#4B5563";

  return (
    <MuiLink
      href={disabled ? undefined : href}
      onClick={disabled ? undefined : onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      underline={underline}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      sx={[
        {
          display: "inline-flex",
          alignItems: "center",
          gap: 0.375,
          fontSize: FONT_SIZE[size],
          fontWeight: 400,
          color: disabled ? "#9CA3AF" : baseColor,
          cursor: disabled ? "not-allowed" : "pointer",
          pointerEvents: disabled ? "none" : "auto",
          textDecorationColor: disabled ? "#9CA3AF" : baseColor,
          "&:visited": { color: disabled ? undefined : GOV_BLUE_VISITED },
          "&:hover": {
            color: disabled ? undefined : (color === "primary" ? "#003A7A" : "#1F2937"),
            textDecorationColor: "currentColor",
          },
          "&:active": { color: disabled ? undefined : (color === "primary" ? "#003A7A" : "#111827") },
          "&:focus-visible": {
            outline: `2px solid ${GOV_BLUE}`,
            outlineOffset: 2,
            borderRadius: "2px",
          },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {children}
      {external && !disabled && (
        <Box
          component="span"
          aria-label="외부 링크"
          sx={{ display: "inline-flex", alignItems: "center" }}
        >
          <OpenInNewIcon sx={{ fontSize: "1em" }} />
        </Box>
      )}
    </MuiLink>
  );
}
