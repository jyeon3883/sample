import { Typography } from "@repo/ui";

export function QnaPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <Typography variant="h4" component="h1">
        Q&amp;A
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        qna entity · API 연동은 이후 추가
      </Typography>
    </main>
  );
}
