import { Box, Button, Stack, TextField } from "@repo/ui/atoms";
import type { EditFormProps } from "../model/types";
import type { ModalContentProps } from "@repo/ui/layout";

export const EditForm = ({ userName, close }: EditFormProps & ModalContentProps) => {
  return (
    <Stack spacing={2}>
      <TextField label="이름" defaultValue={userName} fullWidth />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button variant="outlined" onClick={() => close()}>
          취소
        </Button>
        <Button onClick={() => close({ saved: true, userName })}>저장</Button>
      </Box>
    </Stack>
  );
};
