import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FormControl, InputLabel, Select, MenuItem } from "./Select";

const meta = {
  title: "Atoms/Select",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 상태들
export const BasicStates: Story = {
  render: () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("option1");
    const [value3, setValue3] = useState("");

    return (
      <Box>
        <h3>Select 기본 상태</h3>
        <Stack spacing={2} sx={{ maxWidth: 300 }}>
          {/* 기본 */}
          <FormControl>
            <InputLabel>기본</InputLabel>
            <Select value={value1} onChange={(e) => setValue1(e.target.value)}>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </Select>
          </FormControl>

          {/* 선택됨 */}
          <FormControl>
            <InputLabel>선택됨</InputLabel>
            <Select value={value2} onChange={(e) => setValue2(e.target.value)}>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </Select>
          </FormControl>

          {/* 비활성화 */}
          <FormControl disabled>
            <InputLabel>비활성화</InputLabel>
            <Select value={value3} onChange={(e) => setValue3(e.target.value)}>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
    );
  },
};

// 기본 (아무것도 선택 안 됨)
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <Box sx={{ maxWidth: 300 }}>
        <FormControl>
          <InputLabel>기본</InputLabel>
          <Select value={value} onChange={(e) => setValue(e.target.value)}>
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  },
};

// 선택됨
export const Selected: Story = {
  render: () => {
    const [value, setValue] = useState("option1");

    return (
      <Box sx={{ maxWidth: 300 }}>
        <FormControl>
          <InputLabel>선택됨</InputLabel>
          <Select value={value} onChange={(e) => setValue(e.target.value)}>
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  },
};

// 비활성화
export const Disabled: Story = {
  render: () => (
    <Box sx={{ maxWidth: 300 }}>
      <FormControl disabled>
        <InputLabel>비활성화</InputLabel>
        <Select value="option1" onChange={() => {}}>
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  ),
};

// 모든 상태 한눈에 보기
export const AllStates: Story = {
  render: () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("option1");
    const [value3, setValue3] = useState("");

    return (
      <Box sx={{ p: 2 }}>
        <Stack spacing={3}>
          <Box>
            <h4>기본 상태</h4>
            <Stack spacing={2} sx={{ maxWidth: 300 }}>
              <Box>
                <h5 style={{ marginTop: 0 }}>기본</h5>
                <FormControl>
                  <InputLabel>선택 안 됨</InputLabel>
                  <Select value={value1} onChange={(e) => setValue1(e.target.value)}>
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <h5 style={{ marginTop: 0 }}>선택됨</h5>
                <FormControl>
                  <InputLabel>선택됨</InputLabel>
                  <Select value={value2} onChange={(e) => setValue2(e.target.value)}>
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <h5 style={{ marginTop: 0 }}>비활성화</h5>
                <FormControl disabled>
                  <InputLabel>비활성화</InputLabel>
                  <Select value={value3} onChange={(e) => setValue3(e.target.value)}>
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  },
};
