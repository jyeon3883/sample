"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function MembersPage() {
  return (
    <Stack sx={{ p: 3 }} spacing={2}>
      <Typography variant="h5" fontWeight={700}>
        회원 관리
      </Typography>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            회원 목록/권한 관리 기능을 이 화면에 확장하면 됩니다.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
