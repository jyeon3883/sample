"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const STAT_CARDS = [
  {
    label: "전체 회원",
    value: "12,480",
    delta: "+3.2%",
    positive: true,
    icon: <GroupIcon fontSize="large" />,
    color: "#1976d2",
  },
  {
    label: "이번 달 주문",
    value: "3,821",
    delta: "+8.7%",
    positive: true,
    icon: <ReceiptIcon fontSize="large" />,
    color: "#2e7d32",
  },
  {
    label: "월 매출",
    value: "₩ 48,200,000",
    delta: "+12.1%",
    positive: true,
    icon: <TrendingUpIcon fontSize="large" />,
    color: "#7b1fa2",
  },
  {
    label: "미처리 이슈",
    value: "7",
    delta: "-2",
    positive: false,
    icon: <WarningAmberIcon fontSize="large" />,
    color: "#ed6c02",
  },
];

const RECENT_LOGS = [
  { id: 1, user: "kim@example.com", action: "회원가입", time: "2분 전" },
  { id: 2, user: "lee@example.com", action: "주문 완료 (#20481)", time: "15분 전" },
  { id: 3, user: "park@example.com", action: "비밀번호 변경", time: "1시간 전" },
  { id: 4, user: "choi@example.com", action: "주문 취소 (#20479)", time: "2시간 전" },
  { id: 5, user: "admin", action: "공지사항 등록", time: "3시간 전" },
];

export function AdminDashboard() {
  return (
    <Box sx={{ minHeight: "100vh", p: 4 }}>
      {/* 헤더 */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Admin Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            @repo/admin — apps/admin 샘플 서비스
          </Typography>
        </Box>
        <Chip label="포트 3001" color="primary" variant="outlined" />
      </Stack>

      {/* 통계 카드 */}
      <Grid container spacing={3} mb={4}>
        {STAT_CARDS.map((card) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.label}>
            <Card elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
              <CardContent>
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {card.label}
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                      {card.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      color={card.positive ? "success.main" : "error.main"}
                      fontWeight={600}
                    >
                      {card.delta} 전월 대비
                    </Typography>
                  </Box>
                  <Box sx={{ color: card.color, opacity: 0.8 }}>{card.icon}</Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 최근 활동 로그 */}
      <Card elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            최근 활동
          </Typography>
          <Stack divider={<Divider />} spacing={0}>
            {RECENT_LOGS.map((log) => (
              <Stack
                key={log.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                py={1.5}
              >
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {log.action}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {log.user}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {log.time}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
