"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import type { SxProps, Theme } from "@mui/material/styles";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// ── 타입 ──────────────────────────────────────────────────────────

export type CriticalAlertSeverity = "danger" | "warning" | "info";

export interface CriticalAlertItem {
  /** 긴급도: danger(상) / warning(중) / info(하) */
  severity?: CriticalAlertSeverity;
  /** 배지 레이블 (기본값: severity별 자동 설정) */
  label?: string;
  /** 공지 본문 (최대 2줄) */
  message: string;
  /** 상세 링크 URL (선택) */
  linkHref?: string;
  /** 링크 텍스트 (기본값: "자세히보기") */
  linkLabel?: string;
}

export interface CriticalAlertsProps {
  items: CriticalAlertItem[];
  sx?: SxProps<Theme>;
}

// ── 상수 ──────────────────────────────────────────────────────────

const CONFIG: Record<
  CriticalAlertSeverity,
  { label: string; badgeBg: string; Icon: React.ElementType }
> = {
  danger: { label: "긴급", badgeBg: "#E03131", Icon: CrisisAlertIcon },
  warning: { label: "안전", badgeBg: "#E67700", Icon: WarningAmberIcon },
  info: { label: "안내", badgeBg: "#1971C2", Icon: InfoOutlinedIcon },
};

// ── 단일 알림 카드 ────────────────────────────────────────────────

function AlertCard({ item }: { item: CriticalAlertItem }) {
  const severity = item.severity ?? "info";
  const cfg = CONFIG[severity];
  const label = item.label ?? cfg.label;

  return (
    <Box
      role="alert"
      aria-live={severity === "danger" ? "assertive" : "polite"}
      aria-atomic="true"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        bgcolor: "#ffffff",
        border: "1px solid #D9D9D9",
        borderRadius: "12px",
        px: 2,
        py: 1.5,
        minHeight: 56,
      }}
    >
      {/* 배지: 아이콘 + 레이블 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          bgcolor: cfg.badgeBg,
          px: 1.25,
          py: 0.75,
          borderRadius: "8px",
          flexShrink: 0,
        }}
      >
        <cfg.Icon sx={{ fontSize: 18, color: "#ffffff" }} aria-hidden="true" />
        <Typography
          component="span"
          sx={{ fontSize: "0.875rem", fontWeight: 700, color: "#ffffff", lineHeight: 1, whiteSpace: "nowrap" }}
        >
          {label}
        </Typography>
      </Box>

      {/* 본문 텍스트 */}
      <Typography
        sx={{
          flex: 1,
          fontSize: "0.9375rem",
          fontWeight: 700,
          color: "#1A1A1A",
          lineHeight: 1.6,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          wordBreak: "keep-all",
        }}
      >
        {item.message}
      </Typography>

      {/* 상세 링크 */}
      {item.linkHref && (
        <MuiLink
          href={item.linkHref}
          underline="none"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.125,
            color: "#555555",
            fontSize: "0.875rem",
            fontWeight: 400,
            flexShrink: 0,
            whiteSpace: "nowrap",
            "&:hover": { color: "#1A1A1A" },
            "&:focus-visible": { outline: "2px solid #555", outlineOffset: 2, borderRadius: "2px" },
          }}
        >
          {item.linkLabel ?? "자세히보기"}
          <ChevronRightIcon sx={{ fontSize: 18, color: "#9E9E9E" }} aria-hidden="true" />
        </MuiLink>
      )}
    </Box>
  );
}

// ── 공개 컴포넌트 ─────────────────────────────────────────────────

export function CriticalAlerts({ items, sx }: CriticalAlertsProps) {
  if (items.length === 0) return null;

  return (
    <Box
      component="section"
      aria-label="긴급 공지"
      sx={[
        { width: "100%", display: "flex", flexDirection: "column", gap: 1.5 },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {items.map((item, i) => (
        <AlertCard key={i} item={item} />
      ))}
    </Box>
  );
}
