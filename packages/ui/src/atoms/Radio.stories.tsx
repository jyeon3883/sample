import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Radio, RadioGroup } from "./Radio";
import { Chip } from "./Chip";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MuiFormControlLabel from "@mui/material/FormControlLabel";

const meta = {
  title: "Atoms/Radio",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const chipOptions = [
  { value: "unchecked", label: "활성화" },
  { value: "checked", label: "활성화" },
  { value: "disabled", label: "비활성화", disabled: true },
];

function ChipRadioGroup() {
  const [value, setValue] = useState("checked");

  return (
    <RadioGroup row value={value} onChange={(event) => setValue(event.target.value)}>
      {chipOptions.map((option) => {
        const selected = value === option.value;

        return (
          <MuiFormControlLabel
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            control={
              <Radio
                sx={{ display: "none" }}
                slotProps={{
                  input: {
                    "aria-label": option.label,
                  },
                }}
              />
            }
            label={
              <Chip
                label={option.label}
                clickable={!option.disabled}
                color={selected ? "primary" : "default"}
                variant={selected ? "filled" : "outlined"}
                disabled={option.disabled}
              />
            }
            sx={{
              mr: 2,
              "& .MuiMuiFormControlLabel-label": {
                display: "flex",
              },
            }}
          />
        );
      })}
    </RadioGroup>
  );
}

// 기본 상태들 (horizontal)
export const BasicStates: Story = {
  render: () => (
    <Box>
      <h3>라디오 버튼 기본 상태</h3>
      <RadioGroup row defaultValue="selected">
        <MuiFormControlLabel value="basic" control={<Radio />} label="활성화" />
        <MuiFormControlLabel value="selected" control={<Radio defaultChecked />} label="활성화" />
        <MuiFormControlLabel value="disabled" control={<Radio disabled />} label="비활성화" />
      </RadioGroup>
    </Box>
  ),
};

// 수직 레이아웃 (column)
export const VerticalLayout: Story = {
  render: () => (
    <Box>
      <h3>라디오 버튼 수직 레이아웃</h3>
      <RadioGroup defaultValue="option1">
        <MuiFormControlLabel value="option1" control={<Radio />} label="라디오버튼" />
        <MuiFormControlLabel value="option2" control={<Radio />} label="라디오버튼" />
      </RadioGroup>
    </Box>
  ),
};

// 설명과 함께 있는 라디오 버튼 (with description)
export const WithDescription: Story = {
  render: () => (
    <Box>
      <h3>라디오 버튼 (설명 포함)</h3>
      <RadioGroup defaultValue="option1">
        <Box sx={{ mb: 2 }}>
          <MuiFormControlLabel
            value="option1"
            control={<Radio defaultChecked />}
            label="라디오버튼"
          />
          <Box sx={{ ml: 4, mt: 1 }}>
            <p style={{ margin: "0 0 0 0", fontSize: "0.875rem", color: "#666" }}>
              부가적인 설명이 들어갑니다.
            </p>
          </Box>
        </Box>
        <Box sx={{ mb: 2 }}>
          <MuiFormControlLabel value="option2" control={<Radio />} label="라디오버튼" />
          <Box sx={{ ml: 4, mt: 1 }}>
            <p style={{ margin: "0 0 0 0", fontSize: "0.875rem", color: "#666" }}>
              부가적인 설명이 들어갑니다.
            </p>
          </Box>
        </Box>
      </RadioGroup>
    </Box>
  ),
};

// 선택된 비활성화
export const DisabledSelected: Story = {
  render: () => (
    <Box>
      <h3>선택된 비활성화</h3>
      <RadioGroup row defaultValue="disabledSelected">
        <MuiFormControlLabel
          value="disabledSelected"
          control={<Radio disabled defaultChecked />}
          label="선택된 비활성화"
        />
      </RadioGroup>
    </Box>
  ),
};

// Chip
export const ChipStates: Story = {
  render: () => (
    <Box>
      <h3>Chip 상태</h3>
      <ChipRadioGroup />
    </Box>
  ),
};

// 모든 상태 한눈에 보기
export const AllStates: Story = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <Stack spacing={3}>
        <Box>
          <h4>기본 상태 (Horizontal)</h4>
          <RadioGroup row defaultValue="basic">
            <MuiFormControlLabel value="basic" control={<Radio />} label="활성화" />
            <MuiFormControlLabel
              value="selected"
              control={<Radio defaultChecked />}
              label="활성화"
            />
            <MuiFormControlLabel value="disabled" control={<Radio disabled />} label="비활성화" />
          </RadioGroup>
        </Box>

        <Box>
          <h4>기본 상태 (Vertical)</h4>
          <RadioGroup defaultValue="basic">
            <MuiFormControlLabel value="basic" control={<Radio />} label="활성화" />
            <MuiFormControlLabel
              value="selected"
              control={<Radio defaultChecked />}
              label="활성화"
            />
            <MuiFormControlLabel value="disabled" control={<Radio disabled />} label="비활성화" />
          </RadioGroup>
        </Box>

        <Box>
          <h4>설명과 함께 (Column)</h4>
          <RadioGroup defaultValue="option1">
            <Box sx={{ mb: 2 }}>
              <MuiFormControlLabel
                value="option1"
                control={<Radio defaultChecked />}
                label="라디오버튼"
              />
              <Box sx={{ ml: 4, mt: 0.5 }}>
                <p style={{ margin: "0", fontSize: "0.875rem", color: "#666" }}>
                  부가적인 설명이 들어갑니다.
                </p>
              </Box>
            </Box>
            <Box sx={{ mb: 2 }}>
              <MuiFormControlLabel value="option2" control={<Radio />} label="라디오버튼" />
              <Box sx={{ ml: 4, mt: 0.5 }}>
                <p style={{ margin: "0", fontSize: "0.875rem", color: "#666" }}>
                  부가적인 설명이 들어갑니다.
                </p>
              </Box>
            </Box>
          </RadioGroup>
        </Box>

        <Box>
          <h3>선택된 비활성화</h3>
          <RadioGroup row defaultValue="disabledSelected">
            <MuiFormControlLabel
              value="disabledSelected"
              control={<Radio disabled defaultChecked />}
              label="선택된 비활성화"
            />
          </RadioGroup>
        </Box>

        <Box>
          <h3>Chip 상태</h3>
          <ChipRadioGroup />
        </Box>
      </Stack>
    </Box>
  ),
};
