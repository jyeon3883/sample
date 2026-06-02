"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function SettingsPage() {
  return (
    <Stack sx={{ p: 3 }} spacing={2}>
      <Typography variant="h5" fontWeight={700}>
        설정
      </Typography>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            시스템 설정, 운영 설정 등 admin 전용 옵션을 구성할 수 있습니다.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
