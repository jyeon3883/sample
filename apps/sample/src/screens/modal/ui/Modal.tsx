"use client";

import { ModalSampleWidget } from "@/widgets/modalSample/ModalSample";
import { Box, Typography } from "@repo/ui/atoms";
export function Modal() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        모달 예시
      </Typography>

      <ModalSampleWidget />
    </Box>
  );
}
