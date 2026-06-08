"use client";

import { ConfirmDelete, EditForm, GlobalModalButton } from "@/features/modalSample";
import { Button } from "@repo/ui";
import { Box, Stack, Typography } from "@repo/ui/atoms";
import { useLocalModal } from "@repo/ui/layout/modal";
export function ModalSampleWidget() {
  const { openModal: openEditModal, ModalHost: EditModalHost } = useLocalModal({
    component: EditForm,
    props: { userName: "홍길동" },
    title: "수정 (로컬)",
    size: "md",
    onClose: (result) => {
      console.log("[수정 모달] onClose:", result);
    },
  });

  const deleteModal = useLocalModal({
    component: ConfirmDelete,
    props: { itemId: 1 },
    title: "삭제 확인 (로컬)",
    type: "confirm",
    size: "sm",
    onClose: (result) => {
      console.log("[삭제 모달] onClose:", result);
    },
  });

  return (
    <>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Button onClick={openEditModal}>수정 모달 (로컬)</Button>
        <Button color="error" onClick={deleteModal.openModal}>
          삭제 확인 (로컬)
        </Button>
        <GlobalModalButton />
      </Stack>

      <EditModalHost />
      <deleteModal.ModalHost />
    </>
  );
}
