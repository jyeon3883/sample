"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography } from "@repo/ui";
import { useRegisterTabClose, useTabState } from "@repo/ui/layout/mdi";
import { routes } from "@/shared/config/routes";

interface QnaFormState {
  text: string;
  category: string;
}

const INITIAL_STATE: QnaFormState = { text: "", category: "" };

const CATEGORY_OPTIONS = [
  { value: "", label: "카테고리 선택" },
  { value: "bug", label: "버그 제보" },
  { value: "feature", label: "기능 요청" },
  { value: "general", label: "일반 문의" },
];

export function QnaPage() {
  /**
   * useTabState: 두 필드를 객체 하나로 묶어 저장.
   * - 다른 탭으로 이동(언마운트)해도 text, category 모두 유지
   * - 탭 닫기 시 자동 삭제
   */
  const [form, setForm] = useTabState<QnaFormState>(routes.qna, INITIAL_STATE);

  const isDirty = form.text.trim().length > 0 || form.category !== "";

  const handleText = (value: string) => setForm((prev) => ({ ...prev, text: value }));
  const handleCategory = (value: string) => setForm((prev) => ({ ...prev, category: value }));
  const handleReset = () => setForm(INITIAL_STATE);

  // 탭 닫기 전 콜백: 입력값이 있으면 확인 다이얼로그 표시
  useRegisterTabClose(routes.qna, () => {
    if (!isDirty) return true;
    return window.confirm(
      "작성 중인 내용이 있습니다.\n탭을 닫으면 내용이 사라집니다. 닫으시겠습니까?",
    );
  });

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <Typography variant="h4" component="h1">
        Q&amp;A
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        값을 입력 후 다른 탭으로 이동했다가 돌아오면 상태가 유지됩니다.
      </Typography>

      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1.5, maxWidth: 480 }}>
        {/* 카테고리 select */}
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
            카테고리
          </Typography>
          <Select
            size="small"
            fullWidth
            displayEmpty
            value={form.category}
            onChange={(e) => handleCategory(e.target.value)}
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value} disabled={opt.value === ""}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* 질문 내용 textarea */}
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
            질문 내용
          </Typography>
          <textarea
            rows={5}
            placeholder="질문 내용을 입력하세요..."
            value={form.text}
            onChange={(e) => handleText(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              fontSize: "0.9rem",
              border: "1px solid #ccc",
              borderRadius: 4,
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        </Box>

        {/* 현재 저장된 상태 표시 (useTabState 확인용) */}
        <Box
          sx={{
            p: 1.5,
            bgcolor: "grey.100",
            borderRadius: 1,
            border: "1px dashed",
            borderColor: "grey.400",
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
            useTabState 저장값 (다른 탭 이동 후 복귀해도 유지됨)
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip
              size="small"
              label={`카테고리: ${form.category || "(미선택)"}`}
              color={form.category ? "primary" : "default"}
              variant="outlined"
            />
            <Chip
              size="small"
              label={`내용: ${form.text ? `"${form.text.slice(0, 20)}${form.text.length > 20 ? "…" : ""}"` : "(비어있음)"}`}
              color={form.text ? "primary" : "default"}
              variant="outlined"
            />
          </Box>
        </Box>

        {isDirty && (
          <Typography variant="caption" color="warning.main">
            저장되지 않은 내용이 있습니다. 탭을 닫으면 확인 창이 표시됩니다.
          </Typography>
        )}

        <Button
          variant="outlined"
          size="small"
          onClick={handleReset}
          disabled={!isDirty}
          sx={{ alignSelf: "flex-start" }}
        >
          초기화
        </Button>
      </Box>
    </main>
  );
}
