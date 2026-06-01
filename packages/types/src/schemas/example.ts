import { z } from "zod";

// ── 조회용 스키마 (API 응답 파싱에 사용) ──────────────────────────────────
export const ExampleItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.string().datetime(),
});

export type ExampleItem = z.infer<typeof ExampleItemSchema>;

// ── 등록/수정 폼 스키마 (react-hook-form + zodResolver에 사용) ────────────
export const ExampleFormSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요.").max(50, "50자 이내로 입력해주세요."),
  description: z.string().max(200, "200자 이내로 입력해주세요.").optional(),
});

export type ExampleFormValues = z.infer<typeof ExampleFormSchema>;
