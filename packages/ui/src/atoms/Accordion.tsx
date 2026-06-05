"use client";

import { useState } from "react";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export interface AccordionItem {
  id: string;
  label: string;
  content: React.ReactNode;
  defaultExpanded?: boolean;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /**
   * accordion: 회색 헤더 + 파란 좌측 강조선 (기본값)
   * disclosure: 흰 헤더, 보조 정보 노출 스타일
   */
  mode?: "accordion" | "disclosure";
  /**
   * accordion 모드:
   *   "plusminus" — +/- 아이콘 (기본값)
   *   "chevron"   — 위/아래 화살표 (ExpandMore 180° 회전)
   * disclosure 모드:
   *   "chevron-right" — > 아이콘, 열리면 90° 회전해 아래 방향 (기본값)
   *   "arrow"         — 위/아래 방향 화살표 전환
   */
  icon?: "plusminus" | "chevron" | "chevron-right" | "arrow";
  /**
   * line: 하단 구분선 (기본값)
   * contained: 전체 테두리 + 항목 간 여백
   */
  variant?: "line" | "contained";
  /** true: 한 번에 하나의 항목만 열기 */
  exclusiveOpen?: boolean;
  sx?: SxProps<Theme>;
}

const GOV_BLUE = "#004EA2";
const BORDER_COLOR = "#C8C8C8";

export function Accordion({
  items,
  mode = "accordion",
  icon,
  variant = "line",
  exclusiveOpen = false,
  sx,
}: AccordionProps) {
  const initialExpanded = items.reduce<Record<string, boolean>>((acc, item) => {
    acc[item.id] = item.defaultExpanded ?? false;
    return acc;
  }, {});

  const [expanded, setExpanded] = useState<Record<string, boolean>>(initialExpanded);

  const handleChange = (id: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    if (exclusiveOpen) {
      const next: Record<string, boolean> = {};
      items.forEach((item) => { next[item.id] = false; });
      next[id] = isExpanded;
      setExpanded(next);
    } else {
      setExpanded((prev) => ({ ...prev, [id]: isExpanded }));
    }
  };

  const isDisclosure = mode === "disclosure";
  const isContained = variant === "contained";

  // 모드별 기본 아이콘
  const resolvedIcon = icon ?? (isDisclosure ? "chevron-right" : "plusminus");

  const wrapperSx: SxProps<Theme> = [
    isContained
      ? { display: "flex", flexDirection: "column", gap: 1 }
      : {
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: 1,
        overflow: "hidden",
        "& .MuiAccordion-root:not(:last-of-type)": {
          borderBottom: `1px solid ${BORDER_COLOR}`,
        },
      },
    ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
  ];

  return (
    <Box sx={wrapperSx}>
      {items.map((item) => {
        const isOpen = expanded[item.id] ?? false;
        const iconColor = item.disabled ? "text.disabled" : "#555";

        // ── 아이콘 렌더링 ──────────────────────────────────────────────
        // CSS 회전을 쓰는 아이콘: expandIconWrapper의 Mui-expanded 클래스가 회전을 담당
        // 직접 교체하는 아이콘: isOpen 상태에 따라 다른 아이콘 렌더링
        let expandIcon: React.ReactNode;
        let iconRotateDeg: number | null = null; // null이면 CSS 회전 없음

        if (!isDisclosure) {
          // accordion 모드
          if (resolvedIcon === "chevron") {
            expandIcon = <ExpandMoreIcon sx={{ fontSize: 20, color: iconColor }} />;
            iconRotateDeg = 180;
          } else {
            // plusminus (기본): 아이콘 직접 교체
            expandIcon = isOpen
              ? <RemoveIcon sx={{ fontSize: 18, color: isOpen ? GOV_BLUE : iconColor }} />
              : <AddIcon sx={{ fontSize: 18, color: iconColor }} />;
          }
        } else {
          // disclosure 모드
          if (resolvedIcon === "arrow") {
            // 아이콘 직접 교체
            expandIcon = isOpen
              ? <KeyboardArrowUpIcon sx={{ fontSize: 20, color: iconColor }} />
              : <KeyboardArrowDownIcon sx={{ fontSize: 20, color: iconColor }} />;
          } else {
            // chevron-right (기본): > 아이콘이 90° 회전해 아래 방향이 됨
            expandIcon = <ChevronRightIcon sx={{ fontSize: 20, color: iconColor }} />;
            iconRotateDeg = 90;
          }
        }

        // ── 배경색 ─────────────────────────────────────────────────────
        const summaryBg = isDisclosure
          ? { default: "background.paper", hover: "#F5F5F5", expanded: "#F5F5F5" }
          : { default: "#F5F5F5", hover: isOpen ? "#E3EBF7" : "#EBEBEB", expanded: "#EEF3FB" };

        const accordionEl = (
          <MuiAccordion
            key={item.id}
            expanded={isOpen}
            onChange={handleChange(item.id)}
            disabled={item.disabled}
            disableGutters
            sx={{
              boxShadow: isContained ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              border: isContained ? `1px solid ${BORDER_COLOR}` : "none",
              borderRadius: isContained ? "4px !important" : 0,
              overflow: "hidden",
              "&::before": { display: "none" },
              margin: "0 !important",
              ...(!isDisclosure && isOpen && { borderLeft: `3px solid ${GOV_BLUE}` }),
            }}
          >
            <MuiAccordionSummary
              expandIcon={expandIcon}
              aria-controls={`${item.id}-panel`}
              id={`${item.id}-header`}
              sx={{
                px: 2,
                py: 0,
                minHeight: isDisclosure ? 52 : 56,
                bgcolor: isOpen ? summaryBg.expanded : summaryBg.default,
                "&:hover:not(.Mui-disabled)": { bgcolor: summaryBg.hover },
                "&.Mui-disabled": { opacity: 0.45 },
                "& .MuiAccordionSummary-content": { my: isDisclosure ? 1.75 : 2 },
                // CSS 회전이 필요한 아이콘만 적용
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  transform: iconRotateDeg !== null ? `rotate(${iconRotateDeg}deg)` : "none",
                },
                transition: "background-color 0.2s",
              }}
            >
              <Typography
                sx={{
                  fontWeight: isDisclosure ? 500 : 600,
                  fontSize: "0.9375rem",
                  color: !isDisclosure && isOpen
                    ? GOV_BLUE
                    : item.disabled
                      ? "text.disabled"
                      : "text.primary",
                  transition: "color 0.2s",
                }}
              >
                {item.label}
              </Typography>
            </MuiAccordionSummary>

            <MuiAccordionDetails
              id={`${item.id}-panel`}
              role="region"
              aria-labelledby={`${item.id}-header`}
              sx={{
                px: isDisclosure ? 2 : 2.5,
                py: 2,
                bgcolor: isDisclosure ? "#FAFAFA" : "background.paper",
                borderTop: `1px solid ${BORDER_COLOR}`,
              }}
            >
              {typeof item.content === "string" ? (
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: isDisclosure ? 1.75 : 1.8 }}>
                  {item.content}
                </Typography>
              ) : (
                item.content
              )}
            </MuiAccordionDetails>
          </MuiAccordion>
        );

        // accordion 모드는 h3으로 래핑해 heading 접근성 구조 확보
        return isDisclosure ? accordionEl : (
          <Typography key={item.id} component="h3" sx={{ m: 0, p: 0 }}>
            {accordionEl}
          </Typography>
        );
      })}
    </Box>
  );
}
