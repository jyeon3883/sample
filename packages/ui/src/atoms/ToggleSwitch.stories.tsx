import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { ToggleSwitch } from "./ToggleSwitch";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const meta = {
  title: "Atoms/ToggleSwitch",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 상태들
export const BasicStates: Story = {
  render: () => (
    <Box>
      <h3>토글 스위치 기본 상태</h3>
      <Stack spacing={2}>
        <MuiFormControlLabel control={<ToggleSwitch />} label="switch : default" />
        <MuiFormControlLabel control={<ToggleSwitch defaultChecked />} label="switch : checked" />
        <MuiFormControlLabel control={<ToggleSwitch disabled />} label="switch : disabled" />
      </Stack>
    </Box>
  ),
};

// 상호작용이 있는 토글 스위치
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Box>
        <h3>토글 스위치 (상호작용)</h3>
        <MuiFormControlLabel
          control={
            <ToggleSwitch
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
          }
          label={`switch : ${checked ? "on" : "off"}`}
        />
      </Box>
    );
  },
};

// 비활성화 상태
export const Disabled: Story = {
  render: () => (
    <Box>
      <h3>토글 스위치 비활성화</h3>
      <Stack spacing={2}>
        <MuiFormControlLabel control={<ToggleSwitch disabled />} label="switch : disabled" />
        <MuiFormControlLabel
          control={<ToggleSwitch defaultChecked disabled />}
          label="switch : disabled checked"
        />
      </Stack>
    </Box>
  ),
};

// 사이즈 비교
export const Sizes: Story = {
  render: () => (
    <Box>
      <h3>토글 스위치 사이즈</h3>
      <Stack spacing={2}>
        <MuiFormControlLabel control={<ToggleSwitch size="small" />} label="switch : small" />
        <MuiFormControlLabel control={<ToggleSwitch size="medium" />} label="switch : medium" />
      </Stack>
    </Box>
  ),
};

// 모든 상태
export const AllStates: Story = {
  render: () => (
    <Box>
      <h3>토글 스위치 모든 상태</h3>
      <Stack spacing={3}>
        <div>
          <h4>기본 상태</h4>
          <Stack spacing={2}>
            <MuiFormControlLabel control={<ToggleSwitch />} label="switch : default" />
            <MuiFormControlLabel
              control={<ToggleSwitch defaultChecked />}
              label="switch : checked"
            />
            <MuiFormControlLabel control={<ToggleSwitch disabled />} label="switch : disabled" />
          </Stack>
        </div>

        <div>
          <h4>색상 변형</h4>
          <Stack spacing={2}>
            <MuiFormControlLabel
              control={<ToggleSwitch defaultChecked color="primary" />}
              label="Primary"
            />
            <MuiFormControlLabel
              control={<ToggleSwitch defaultChecked color="secondary" />}
              label="Secondary"
            />
            <MuiFormControlLabel
              control={<ToggleSwitch defaultChecked color="warning" />}
              label="Warning"
            />
            <MuiFormControlLabel
              control={<ToggleSwitch defaultChecked color="error" />}
              label="Error"
            />
          </Stack>
        </div>
      </Stack>
    </Box>
  ),
};
