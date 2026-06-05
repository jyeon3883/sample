"use client";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import type { SxProps, Theme } from "@mui/material/styles";

export type SpinnerSize = "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "indeterminate" | "determinate";

export interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  /** determinate일 때 진행률 (0-100) */
  value?: number;
  /** 스피너 하단에 표시할 텍스트 */
  label?: string;
  /** 화면 전체를 덮는 오버레이 표시 */
  overlay?: boolean;
  color?: "primary" | "white";
  sx?: SxProps<Theme>;
}

const SIZE_PX: Record<SpinnerSize, number> = {
  sm: 24,
  md: 40,
  lg: 56,
  xl: 72,
};

const GOV_BLUE = "#004EA2";

function SpinnerCore({
  size = "md",
  variant = "indeterminate",
  value,
  label,
  color = "primary",
  sx,
}: Omit<SpinnerProps, "overlay">) {
  const px = SIZE_PX[size];
  const spinnerColor = color === "white" ? "#ffffff" : GOV_BLUE;

  return (
    <Box
      role="status"
      aria-label={label ?? "로딩 중"}
      aria-live="polite"
      sx={[
        { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 1.25 },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        {/* 트랙 (배경 원) */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={px}
          thickness={4}
          sx={{ color: color === "white" ? "rgba(255,255,255,0.25)" : "rgba(0,78,162,0.15)", position: "absolute" }}
        />
        {/* 진행 원 */}
        <CircularProgress
          variant={variant}
          value={variant === "determinate" ? (value ?? 0) : undefined}
          size={px}
          thickness={4}
          sx={{ color: spinnerColor }}
        />
        {/* determinate: 중앙 퍼센트 텍스트 */}
        {variant === "determinate" && size !== "sm" && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: px < 48 ? "0.6rem" : "0.75rem",
                fontWeight: 700,
                color: spinnerColor,
                lineHeight: 1,
              }}
            >
              {`${Math.round(value ?? 0)}%`}
            </Typography>
          </Box>
        )}
      </Box>

      {label && (
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.875rem",
            color: color === "white" ? "#ffffff" : "text.secondary",
            lineHeight: 1.4,
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
}

export function Spinner({ overlay = false, ...props }: SpinnerProps) {
  if (overlay) {
    return (
      <Backdrop
        open
        sx={{
          zIndex: 1400,
          bgcolor: "rgba(0,0,0,0.45)",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <SpinnerCore {...props} color="white" />
      </Backdrop>
    );
  }

  return <SpinnerCore {...props} />;
}
