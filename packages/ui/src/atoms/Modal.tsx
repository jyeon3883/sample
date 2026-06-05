"use client";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

export type ModalSize = "sm" | "md" | "lg" | "full";
export type ModalType = "info" | "alert" | "confirm" | "blocking";

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  size?: ModalSize;
  /** blocking: 닫기 버튼 없음, 사용자 응답 전까지 진행 불가 */
  type?: ModalType;
}

const WIDTH_MAP: Record<Exclude<ModalSize, "full">, string> = {
  sm: "380px",
  md: "560px",
  lg: "800px",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  size = "md",
  type = "info",
}: ModalProps) {
  const isBlocking = type === "blocking";
  const isFull = size === "full";
  const hasHeader = title || description || !isBlocking;
  const hasBody = !!children;
  const hasFooter = !!actions;

  return (
    <Dialog
      open={open}
      onClose={isBlocking ? undefined : onClose}
      fullScreen={isFull}
      PaperProps={{
        sx: {
          width: isFull ? "100%" : WIDTH_MAP[size],
          maxWidth: isFull ? "100%" : WIDTH_MAP[size],
          borderRadius: isFull ? 0 : 2,
          m: isFull ? 0 : 2,
        },
      }}
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-desc" : undefined}
    >
      {hasHeader && (
        <DialogTitle
          component="div"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            px: 3,
            pt: 3,
            pb: hasBody || hasFooter ? 2 : 3,
            borderBottom: hasBody || hasFooter ? "1px solid #E5E7EB" : "none",
          }}
        >
          <Box>
            {title && (
              <Typography
                id="modal-title"
                variant="h6"
                sx={{ fontWeight: 700, fontSize: "1.0625rem", color: "text.primary" }}
              >
                {title}
              </Typography>
            )}
            {description && (
              <Typography
                id="modal-desc"
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {description}
              </Typography>
            )}
          </Box>

          {!isBlocking && onClose && (
            <IconButton
              onClick={onClose}
              aria-label="닫기"
              size="small"
              sx={{ mt: -0.5, mr: -1, color: "text.secondary", "&:hover": { color: "text.primary" } }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </DialogTitle>
      )}

      {hasBody && (
        <DialogContent sx={{ px: 3, py: 2.5 }}>
          {children}
        </DialogContent>
      )}

      {hasFooter && (
        <DialogActions
          sx={{
            px: 3,
            py: 2,
            gap: 1,
            borderTop: "1px solid #E5E7EB",
            justifyContent: "flex-end",
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}
