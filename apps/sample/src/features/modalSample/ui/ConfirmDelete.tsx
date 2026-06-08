import { Box, Button, Stack, Typography } from "@repo/ui/atoms";
import type { ConfirmDeleteProps } from "../model/types";
import type { ModalContentProps } from "@repo/ui/layout";

export const ConfirmDelete = ({ itemId, close }: ConfirmDeleteProps & ModalContentProps) => {
  return (
    <Stack spacing={2}>
      <Typography variant="body2">
        {itemId != null
          ? `항목 #${itemId}을(를) 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`
          : "정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button variant="outlined" onClick={() => close(false)}>
          취소
        </Button>
        <Button color="error" onClick={() => close(true)}>
          삭제
        </Button>
      </Box>
    </Stack>
  );
};
