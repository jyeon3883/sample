"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";

export function {{PascalAppName}}HomePage() {
  return (
    <Box sx={{ minHeight: "100vh", p: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            {{displayName}}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {{packageName}} — apps/{{appName}} 샘플 서비스
          </Typography>
        </Box>
        <Chip label="포트 {{port}}" color="primary" variant="outlined" />
      </Stack>

      <Card elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <HomeIcon color="primary" fontSize="large" />
            <Box>
              <Typography variant="h6" fontWeight={600}>
                시작하기
              </Typography>
              <Typography variant="body2" color="text.secondary">
                FSD 구조와 MDI 탭 레이아웃이 준비되어 있습니다. 새 화면은 screens, widgets,
                shared/config/routes.ts에 추가하세요.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
