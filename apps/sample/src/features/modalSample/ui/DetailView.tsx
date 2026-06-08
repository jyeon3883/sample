"use client";

import { Box, Button, Stack, Typography } from "@repo/ui/atoms";
import type { DetailViewProps } from "../model/types";
import type { ModalContentProps } from "@repo/ui/layout";
import { useModal } from "@repo/ui/layout/modal";
import { ConfirmDelete } from "./ConfirmDelete";

export const DetailView = ({ itemId, close }: DetailViewProps & ModalContentProps) => {
  const { openModal } = useModal();

  return (
    <Stack spacing={2}>
      <Typography variant="body2">항목 #{itemId} 상세 정보입니다.</Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button
          color="error"
          variant="outlined"
          onClick={() =>
            openModal({
              component: ConfirmDelete,
              props: { itemId },
              title: "삭제 확인 (중첩 전역)",
              type: "confirm",
              size: "sm",
              onClose: (confirmed) => {
                if (confirmed) {
                  close({ itemId, deleted: true });
                }
              },
            })
          }
        >
          삭제 (중첩 모달)
        </Button>
        <Button onClick={() => close({ itemId })}>닫기</Button>
      </Box>
    </Stack>
  );
};