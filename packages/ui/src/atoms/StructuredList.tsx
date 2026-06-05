"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MuiButton from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { SxProps, Theme } from "@mui/material/styles";
import { Badge } from "./Badge";
import type { BadgeColor } from "./Badge";

// ── 타입 ──────────────────────────────────────────────────────────────

export interface StructuredListBadge {
  label: string;
  color?: BadgeColor;
}

export interface StructuredListMeta {
  /** 항목 라벨 (예: "신청 기간") */
  label: string;
  /** 항목 값  (예: "2025.01.01 ~ 2025.12.31") */
  value: string;
}

export interface StructuredListItem {
  /** 상단 배지 목록 */
  badges?: StructuredListBadge[];
  /** 제목 */
  title: string;
  /** 설명 텍스트 (최대 3줄 클램핑) */
  description?: string;
  /** 추가 메타 정보 */
  meta?: StructuredListMeta[];
  /** 하단 태그 목록 */
  tags?: string[];
  /** CTA 버튼 텍스트. 지정 시 버튼 표시 */
  actionLabel?: string;
  onAction?: () => void;
  /** 공유하기. 지정 시 버튼 표시 */
  onShare?: () => void;
  /** 찜하기 초기 상태. 지정 시 버튼 표시 */
  defaultBookmarked?: boolean;
  onBookmark?: (bookmarked: boolean) => void;
  /** 카드 전체 클릭 (링크 역할) */
  onClick?: () => void;
  disabled?: boolean;
}

export interface StructuredListProps {
  items: StructuredListItem[];
  /** 항목 없을 때 표시 텍스트 */
  emptyText?: string;
  sx?: SxProps<Theme>;
}

// ── 상수 ──────────────────────────────────────────────────────────────

const BORDER = "1px solid #E5E7EB";
const OUTER_BORDER = "1px solid #D0D0D0";
const GOV_BLUE = "#004EA2";

// ── 내부 카드 컴포넌트 ────────────────────────────────────────────────

function ListCard({ item }: { item: StructuredListItem }) {
  const [bookmarked, setBookmarked] = useState(item.defaultBookmarked ?? false);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !bookmarked;
    setBookmarked(next);
    item.onBookmark?.(next);
  };

  const hasTopRow =
    (item.badges && item.badges.length > 0) ||
    item.onShare !== undefined ||
    item.onBookmark !== undefined;

  const hasBottomRow =
    (item.tags && item.tags.length > 0) || item.actionLabel !== undefined;

  return (
    <Box
      role="article"
      tabIndex={item.onClick && !item.disabled ? 0 : undefined}
      aria-disabled={item.disabled || undefined}
      onClick={item.disabled ? undefined : item.onClick}
      onKeyDown={
        item.onClick && !item.disabled
          ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); item.onClick?.(); } }
          : undefined
      }
      sx={{
        p: 2.5,
        borderBottom: BORDER,
        "&:last-child": { borderBottom: "none" },
        cursor: item.onClick ? "pointer" : "default",
        transition: "background-color 0.15s",
        "&:hover": item.onClick && !item.disabled ? { bgcolor: "#F9FAFB" } : undefined,
        "&:focus-visible": { outline: `2px solid ${GOV_BLUE}`, outlineOffset: -2 },
        opacity: item.disabled ? 0.5 : 1,
      }}
    >
      {/* ① 배지 + 공유/찜 */}
      {hasTopRow && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {item.badges?.map((b, i) => (
              <Badge key={i} label={b.label} color={b.color ?? "primary"} size="sm" />
            ))}
          </Box>

          {/* 공유·찜 버튼 — 카드 클릭과 분리 */}
          <Box sx={{ display: "flex", gap: 0.25, ml: "auto", flexShrink: 0 }}>
            {item.onShare && (
              <Tooltip title="공유하기">
                <IconButton
                  size="small"
                  onClick={(e) => { e.stopPropagation(); item.onShare?.(); }}
                  aria-label="공유하기"
                  sx={{ color: "text.secondary", "&:hover": { color: GOV_BLUE } }}
                >
                  <ShareOutlinedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            )}
            {item.onBookmark !== undefined && (
              <Tooltip title={bookmarked ? "찜 해제" : "찜하기"}>
                <IconButton
                  size="small"
                  onClick={handleBookmark}
                  aria-label={bookmarked ? "찜 해제" : "찜하기"}
                  aria-pressed={bookmarked}
                  sx={{ color: bookmarked ? "#E53935" : "text.secondary", "&:hover": { color: "#E53935" } }}
                >
                  {bookmarked
                    ? <FavoriteIcon sx={{ fontSize: 18 }} />
                    : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      )}

      {/* ② 제목 */}
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: 700,
          color: "text.primary",
          lineHeight: 1.5,
          mb: item.description ? 0.625 : 0,
        }}
      >
        {item.title}
      </Typography>

      {/* ③ 설명 (최대 3줄) */}
      {item.description && (
        <Typography
          sx={{
            fontSize: "0.875rem",
            color: "text.secondary",
            lineHeight: 1.7,
            mb: item.meta && item.meta.length > 0 ? 1.25 : 0,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {item.description}
        </Typography>
      )}

      {/* ④ 메타 정보 */}
      {item.meta && item.meta.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.375,
            mb: hasBottomRow ? 1.5 : 0,
          }}
        >
          {item.meta.map((m, i) => (
            <Box key={i} sx={{ display: "flex", gap: 1, alignItems: "baseline" }}>
              <Typography
                component="span"
                sx={{
                  fontSize: "0.8125rem",
                  color: "text.disabled",
                  fontWeight: 500,
                  flexShrink: 0,
                  minWidth: 64,
                }}
              >
                {m.label}
              </Typography>
              <Typography
                component="span"
                sx={{ fontSize: "0.8125rem", color: "text.secondary" }}
              >
                {m.value}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* ⑤ 태그 + CTA 버튼 */}
      {hasBottomRow && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
            mt: item.meta && item.meta.length > 0 ? 0 : 1.5,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {item.tags?.map((tag, i) => (
              <Chip
                key={i}
                label={tag}
                size="small"
                sx={{
                  height: 24,
                  fontSize: "0.75rem",
                  bgcolor: "#F3F4F6",
                  color: "text.secondary",
                  border: "none",
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            ))}
          </Box>

          {item.actionLabel && (
            <MuiButton
              variant="outlined"
              size="small"
              disabled={item.disabled}
              onClick={item.onAction}
              sx={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                px: 2,
                py: 0.5,
                borderColor: GOV_BLUE,
                color: GOV_BLUE,
                flexShrink: 0,
                "&:hover": { bgcolor: "#EEF3FB", borderColor: GOV_BLUE },
                "&.Mui-disabled": { opacity: 0.45 },
              }}
            >
              {item.actionLabel}
            </MuiButton>
          )}
        </Box>
      )}
    </Box>
  );
}

// ── 공개 컴포넌트 ─────────────────────────────────────────────────────

export function StructuredList({
  items,
  emptyText = "항목이 없습니다.",
  sx,
}: StructuredListProps) {
  return (
    <Box
      role="list"
      sx={[
        {
          width: "100%",
          border: OUTER_BORDER,
          borderRadius: 1,
          overflow: "hidden",
          bgcolor: "background.paper",
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {items.length === 0 ? (
        <Box sx={{ py: 6, textAlign: "center" }}>
          <Typography sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            {emptyText}
          </Typography>
        </Box>
      ) : (
        items.map((item, i) => <ListCard key={i} item={item} />)
      )}
    </Box>
  );
}
