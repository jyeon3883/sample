import type { Meta, StoryObj } from "@storybook/react-vite";
import { Banner } from "./Banner";
import Box from "@mui/material/Box";

const meta = {
  title: "Atoms/Banner",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 기본 배너 - 공식 전자정부 누리집 배너
 */
export const Default: Story = {
  render: () => <Banner text="이 누리집은 대한민국 공식 전자정부 누리집입니다." />,
};

/**
 * 정보 배너
 */
export const Information: Story = {
  render: () => (
    <Banner
      text="📢 새로운 기능이 추가되었습니다. 더 나은 서비스를 위해 업데이트되었습니다."
      backgroundColor="#e3f2fd"
      textColor="#1976d2"
    />
  ),
};

/**
 * 경고 배너
 */
export const Warning: Story = {
  render: () => (
    <Banner
      text="⚠️ 시스템 점검 예정: 2024년 01월 15일 23:00 ~ 02:00"
      backgroundColor="#fff3e0"
      textColor="#f57c00"
    />
  ),
};

/**
 * 성공 배너
 */
export const Success: Story = {
  render: () => (
    <Banner
      text="✓ 요청이 정상적으로 처리되었습니다."
      backgroundColor="#e8f5e9"
      textColor="#388e3c"
    />
  ),
};

/**
 * 에러 배너
 */
export const Error: Story = {
  render: () => (
    <Banner
      text="✕ 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      backgroundColor="#ffebee"
      textColor="#d32f2f"
    />
  ),
};

/**
 * 모든 배너 상태
 */
export const AllTypes: Story = {
  render: () => (
    <Box>
      <h3>배너 컴포넌트 모든 상태</h3>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div>
          <h4>기본</h4>
          <Banner text="이 누리집은 대한민국 공식 전자정부 누리집입니다." />
        </div>

        <div>
          <h4>정보</h4>
          <Banner
            text="📢 새로운 기능이 추가되었습니다."
            backgroundColor="#e3f2fd"
            textColor="#1976d2"
          />
        </div>

        <div>
          <h4>경고</h4>
          <Banner text="⚠️ 시스템 점검 예정입니다." backgroundColor="#fff3e0" textColor="#f57c00" />
        </div>

        <div>
          <h4>성공</h4>
          <Banner
            text="✓ 요청이 정상적으로 처리되었습니다."
            backgroundColor="#e8f5e9"
            textColor="#388e3c"
          />
        </div>

        <div>
          <h4>에러</h4>
          <Banner text="✕ 오류가 발생했습니다." backgroundColor="#ffebee" textColor="#d32f2f" />
        </div>
      </Box>
    </Box>
  ),
};
