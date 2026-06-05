import { useState, useRef } from "react";
import { Button } from "./Button";
import { Menu } from "./Menu";
import { MenuItem } from "./Select";
import Box from "@mui/material/Box";
import type { ButtonProps } from "./Button";

export type ResizeScale = "sm" | "md" | "lg" | "xlg" | "xxlg";

export interface ResizeOption {
  scale: ResizeScale;
  label: string;
}

export interface ResizeAdjusterProps extends Omit<ButtonProps, "children"> {
  options?: ResizeOption[];
  currentScale?: ResizeScale;
  onScaleChange?: (scale: ResizeScale) => void;
  onReset?: () => void;
}

const defaultOptions: ResizeOption[] = [
  { scale: "sm", label: "작게" },
  { scale: "md", label: "보통" },
  { scale: "lg", label: "조금 크게" },
  { scale: "xlg", label: "크게" },
  { scale: "xxlg", label: "가장 크게" },
];

export function ResizeAdjuster({
  options = defaultOptions,
  currentScale = "md",
  onScaleChange,
  onReset,
  ...buttonProps
}: ResizeAdjusterProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleScaleSelect = (scale: ResizeScale) => {
    onScaleChange?.(scale);
    handleClose();
  };

  const handleReset = () => {
    onReset?.();
    handleClose();
  };

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={handleOpen}
        variant="text"
        size="small"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          textTransform: "none",
          fontSize: "0.875rem",
        }}
        {...buttonProps}
      >
        <span>화면크기</span>
        <span style={{ fontSize: "1rem" }}>▼</span>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ py: 1 }}>
          {options.map((option) => (
            <MenuItem
              key={option.scale}
              onClick={() => handleScaleSelect(option.scale)}
              selected={currentScale === option.scale}
              sx={{
                fontSize: "0.875rem",
                backgroundColor: currentScale === option.scale ? "#f5f5f5" : "transparent",
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Box>

        <Box
          sx={{
            borderTop: "1px solid #eee",
            p: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            size="small"
            variant="text"
            onClick={handleReset}
            sx={{
              fontSize: "0.875rem",
              textTransform: "none",
            }}
          >
            ↺ 초기화
          </Button>
        </Box>
      </Menu>
    </>
  );
}
