import { Button } from "@repo/ui";
import { useModal } from "@repo/ui/layout/modal";
import { DetailView } from "./DetailView";

export const GlobalModalButton = () => {
  const { openModal } = useModal();

  return (
    <Button
      onClick={() =>
        openModal({
          component: DetailView,
          props: { itemId: 42 },
          title: "상세 (전역)",
          description: "자식 컴포넌트에서 openModal 호출 · 상세 모달에서 중첩 모달 가능",
          size: "sm",
          onClose: (result) => {
            console.log("[전역 모달] onClose:", result);
          },
        })
      }
    >
      전역 모달 열기
    </Button>
  );
};
