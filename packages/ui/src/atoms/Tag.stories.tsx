import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from "./Chip";
import { Stack } from "@mui/material";

const meta = {
  title: "Atoms/Tag",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 기본 Tag - 삭제 버튼이 있는 형태
 */
export const BasicTagLarge: Story = {
  render: () => (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      <Chip label="태그" onDelete={() => {}} size="medium" variant="outlined" />
      <Chip label="태그" onDelete={() => {}} size="medium" variant="outlined" />
      <Chip label="태그" onDelete={() => {}} size="medium" variant="outlined" />
    </Stack>
  ),
};

export const BasicTagMedium: Story = {
  render: () => (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      <Chip label="태그" onDelete={() => {}} size="medium" variant="outlined" />
      <Chip label="태그" onDelete={() => {}} size="medium" variant="outlined" />
      <Chip label="태그" onDelete={() => {}} size="medium" variant="outlined" />
    </Stack>
  ),
};

export const BasicTagSmall: Story = {
  render: () => (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      <Chip label="태그" onDelete={() => {}} size="small" variant="outlined" />
      <Chip label="태그" onDelete={() => {}} size="small" variant="outlined" />
      <Chip label="태그" onDelete={() => {}} size="small" variant="outlined" />
    </Stack>
  ),
};

/**
 * 링크형 Tag - 클릭 가능한 링크 형태
 */
export const LinkTagLarge: Story = {
  render: () => (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      <Chip label="태그" onClick={() => {}} clickable size="medium" variant="outlined" />
      <Chip label="태그" onClick={() => {}} clickable size="medium" variant="outlined" />
      <Chip label="태그" onClick={() => {}} clickable size="medium" variant="outlined" />
    </Stack>
  ),
};

export const LinkTagMedium: Story = {
  render: () => (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      <Chip label="태그" onClick={() => {}} clickable size="medium" variant="outlined" />
      <Chip label="태그" onClick={() => {}} clickable size="medium" variant="outlined" />
      <Chip label="태그" onClick={() => {}} clickable size="medium" variant="outlined" />
    </Stack>
  ),
};

export const LinkTagSmall: Story = {
  render: () => (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      <Chip label="태그" onClick={() => {}} clickable size="small" variant="outlined" />
      <Chip label="태그" onClick={() => {}} clickable size="small" variant="outlined" />
      <Chip label="태그" onClick={() => {}} clickable size="small" variant="outlined" />
    </Stack>
  ),
};

/**
 * 모든 태그 상태
 */
export const AllTags: Story = {
  render: () => (
    <Stack spacing={3}>
      <div>
        <h3>기본 Tag (삭제 버튼 있음)</h3>
        <Stack spacing={2}>
          <div>
            <h4>Large</h4>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="태그" onDelete={() => {}} size="medium" variant="outlined" />
              <Chip label="태그" onDelete={() => {}} size="medium" variant="outlined" />
              <Chip label="태그" onDelete={() => {}} size="medium" variant="outlined" />
            </Stack>
          </div>
          <div>
            <h4>Medium</h4>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="태그" onDelete={() => {}} size="medium" variant="outlined" />
              <Chip label="태그" onDelete={() => {}} size="medium" variant="outlined" />
              <Chip label="태그" onDelete={() => {}} size="medium" variant="outlined" />
            </Stack>
          </div>
          <div>
            <h4>Small</h4>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="태그" onDelete={() => {}} size="small" variant="outlined" />
              <Chip label="태그" onDelete={() => {}} size="small" variant="outlined" />
              <Chip label="태그" onDelete={() => {}} size="small" variant="outlined" />
            </Stack>
          </div>
        </Stack>
      </div>

      <div>
        <h3>링크형 Tag</h3>
        <Stack spacing={2}>
          <div>
            <h4>Large</h4>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="태그" onClick={() => {}} clickable size="medium" variant="outlined" />
              <Chip label="태그" onClick={() => {}} clickable size="medium" variant="outlined" />
              <Chip label="태그" onClick={() => {}} clickable size="medium" variant="outlined" />
            </Stack>
          </div>
          <div>
            <h4>Medium</h4>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="태그" onClick={() => {}} clickable size="medium" variant="outlined" />
              <Chip label="태그" onClick={() => {}} clickable size="medium" variant="outlined" />
              <Chip label="태그" onClick={() => {}} clickable size="medium" variant="outlined" />
            </Stack>
          </div>
          <div>
            <h4>Small</h4>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="태그" onClick={() => {}} clickable size="small" variant="outlined" />
              <Chip label="태그" onClick={() => {}} clickable size="small" variant="outlined" />
              <Chip label="태그" onClick={() => {}} clickable size="small" variant="outlined" />
            </Stack>
          </div>
        </Stack>
      </div>
    </Stack>
  ),
};
