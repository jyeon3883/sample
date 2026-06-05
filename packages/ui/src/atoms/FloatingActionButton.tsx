"use client";

import { useState } from "react";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export interface FabAction {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export interface FloatingActionButtonProps {
  /** 단일 액션 아이콘 (sub-actions 없을 때 사용) */
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  /** 서브 액션 목록 (최대 3개). 지정 시 확장형 FAB로 동작 */
  actions?: FabAction[];
  size?: "sm" | "md";
  /** CSS bottom 값 (기본 24px) */
  bottom?: number | string;
  /** CSS right 값 (기본 24px) */
  right?: number | string;
}

const GOV_BLUE = "#004EA2";
const FAB_SIZE: Record<"sm" | "md", number> = { sm: 40, md: 56 };

export function FloatingActionButton({
  icon,
  label,
  onClick,
  actions,
  size = "md",
  bottom = 24,
  right = 24,
}: FloatingActionButtonProps) {
  const [open, setOpen] = useState(false);
  const hasActions = actions && actions.length > 0;
  const fabSize = FAB_SIZE[size];

  const handleMainClick = () => {
    if (hasActions) {
      setOpen((v) => !v);
    } else {
      onClick?.();
    }
  };

  const handleActionClick = (action: FabAction) => {
    action.onClick?.();
    setOpen(false);
  };

  return (
    <>
      {/* 배경 딤 */}
      {hasActions && (
        <Backdrop
          open={open}
          onClick={() => setOpen(false)}
          sx={{ zIndex: 1200, bgcolor: "rgba(0,0,0,0.3)" }}
        />
      )}

      <Box
        sx={{
          position: "fixed",
          bottom,
          right,
          zIndex: 1300,
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "flex-end",
          gap: 1.5,
        }}
      >
        {/* 서브 액션 목록 (위에서 아래 순으로 렌더, column-reverse로 역순 표시) */}
        {hasActions &&
          actions!.slice(0, 3).map((action, i) => (
            <Zoom key={i} in={open} style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexDirection: "row-reverse",
                }}
              >
                <Tooltip title={action.label} placement="left">
                  <Fab
                    size="small"
                    onClick={() => handleActionClick(action)}
                    aria-label={action.label}
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "background.paper",
                      color: GOV_BLUE,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      "&:hover": { bgcolor: "#EEF3FB" },
                    }}
                  >
                    {action.icon}
                  </Fab>
                </Tooltip>
                <Typography
                  variant="caption"
                  sx={{
                    bgcolor: "rgba(0,0,0,0.7)",
                    color: "white",
                    px: 1,
                    py: 0.375,
                    borderRadius: 1,
                    whiteSpace: "nowrap",
                    fontSize: "0.75rem",
                  }}
                >
                  {action.label}
                </Typography>
              </Box>
            </Zoom>
          ))}

        {/* 메인 FAB */}
        <Fab
          onClick={handleMainClick}
          aria-label={label}
          aria-expanded={hasActions ? open : undefined}
          sx={{
            width: fabSize,
            height: fabSize,
            bgcolor: GOV_BLUE,
            color: "white",
            boxShadow: "0 4px 12px rgba(0,78,162,0.4)",
            "&:hover": { bgcolor: "#003A7A" },
            "&:focus-visible": { outline: `3px solid ${GOV_BLUE}`, outlineOffset: 3 },
            transition: "background-color 0.2s",
          }}
        >
          {hasActions ? (open ? <CloseIcon /> : <AddIcon />) : (icon ?? <AddIcon />)}
        </Fab>
      </Box>
    </>
  );
}
