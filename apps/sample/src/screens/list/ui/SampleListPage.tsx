"use client";
import { ListView } from "@/widgets/list";
import { Container, Typography, Box } from "@repo/ui/atoms";

export function SampleListPage() {
  return (
    <Container sx={{ pading: 0, paddingTop: 2 }}>
      <Typography variant="body1">목록 조회</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <ListView />
      </Box>
    </Container>
  );
}
