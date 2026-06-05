import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Chip } from "./Chip";
import { Checkbox } from "./Checkbox";
import MuiFormGroup from "@mui/material/FormGroup";
import MuiFormControlLabel from "@mui/material/FormControlLabel";

const meta = {
  title: "Atoms/Checkbox",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 상태들 (horizontal)
export const BasicStates: Story = {
  render: () => (
    <Box>
      <h3>체크박스 기본 상태</h3>
      <MuiFormGroup row>
        <MuiFormControlLabel value="basic" control={<Checkbox />} label="기본" />
        <MuiFormControlLabel
          value="selected"
          control={<Checkbox defaultChecked />}
          label="선택됨"
        />
        <MuiFormControlLabel value="disabled" control={<Checkbox disabled />} label="비활성화" />
      </MuiFormGroup>
      <MuiFormGroup row>
        <MuiFormControlLabel
          value="disabledSelected"
          control={<Checkbox disabled defaultChecked />}
          label="선택된 비활성화"
        />
      </MuiFormGroup>
    </Box>
  ),
};

// 수직 레이아웃 (column)
export const VerticalLayout: Story = {
  render: () => (
    <Box>
      <h3>체크박스 수직 레이아웃</h3>
      <MuiFormGroup defaultValue="option1">
        <MuiFormControlLabel
          value="option1"
          control={<Checkbox defaultChecked />}
          label="체크박스"
        />
        <MuiFormControlLabel value="option2" control={<Checkbox />} label="체크박스" />
      </MuiFormGroup>
    </Box>
  ),
};

// 설명과 함께 있는 체크박스 (with description)
export const WithDescription: Story = {
  render: () => (
    <Box>
      <h3>체크박스 (설명 포함)</h3>
      <MuiFormGroup>
        <Box sx={{ mb: 2 }}>
          <MuiFormControlLabel
            value="option1"
            control={<Checkbox defaultChecked />}
            label="체크박스"
          />
          <Box sx={{ ml: 4, mt: 0.5 }}>
            <p style={{ margin: "0", fontSize: "0.875rem", color: "#666" }}>
              부가적인 설명이 들어갑니다.
            </p>
          </Box>
        </Box>
        <Box sx={{ mb: 2 }}>
          <MuiFormControlLabel value="option2" control={<Checkbox />} label="체크박스" />
          <Box sx={{ ml: 4, mt: 0.5 }}>
            <p style={{ margin: "0", fontSize: "0.875rem", color: "#666" }}>
              부가적인 설명이 들어갑니다.
            </p>
          </Box>
        </Box>
      </MuiFormGroup>
    </Box>
  ),
};

// Chip 형태의 체크박스 (복수 선택)
const chipOptions = [
  { value: "unchecked", label: "활성화" },
  { value: "checked", label: "활성화" },
  { value: "disabled", label: "비활성화", disabled: true },
];

function ChipCheckboxGroup() {
  const [checkedValues, setCheckedValues] = useState<string[]>(["checked"]);

  const handleChange = (value: string) => {
    setCheckedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <MuiFormGroup row>
      {chipOptions.map((option) => {
        const isChecked = checkedValues.includes(option.value);

        return (
          <MuiFormControlLabel
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            control={
              <Checkbox
                sx={{ display: "none" }}
                checked={isChecked}
                onChange={() => handleChange(option.value)}
              />
            }
            label={
              <Chip
                label={option.label}
                clickable={!option.disabled}
                color={isChecked ? "primary" : "default"}
                variant={isChecked ? "filled" : "outlined"}
                disabled={option.disabled}
              />
            }
            sx={{
              mr: 2,
              "& .MuiFormControlLabel-label": {
                display: "flex",
              },
            }}
          />
        );
      })}
    </MuiFormGroup>
  );
}

export const ChipStates: Story = {
  render: () => (
    <Box>
      <h3>체크박스 - Chip 상태 (복수 선택 가능)</h3>
      <ChipCheckboxGroup />
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
          <MuiFormGroup row>
            <MuiFormControlLabel value="basic" control={<Checkbox />} label="기본" />
            <MuiFormControlLabel
              value="selected"
              control={<Checkbox defaultChecked />}
              label="선택됨"
            />
            <MuiFormControlLabel
              value="disabled"
              control={<Checkbox disabled />}
              label="비활성화"
            />
            <MuiFormControlLabel
              value="disabledSelected"
              control={<Checkbox disabled defaultChecked />}
              label="선택된 비활성화"
            />
          </MuiFormGroup>
        </Box>

        <Box>
          <h4>기본 상태 (Vertical)</h4>
          <MuiFormGroup>
            <MuiFormControlLabel value="basic" control={<Checkbox />} label="기본" />
            <MuiFormControlLabel
              value="selected"
              control={<Checkbox defaultChecked />}
              label="선택됨"
            />
            <MuiFormControlLabel
              value="disabled"
              control={<Checkbox disabled />}
              label="비활성화"
            />
            <MuiFormControlLabel
              value="disabledSelected"
              control={<Checkbox disabled defaultChecked />}
              label="선택된 비활성화"
            />
          </MuiFormGroup>
        </Box>

        <Box>
          <h4>설명과 함께 (Column)</h4>
          <MuiFormGroup>
            <Box sx={{ mb: 2 }}>
              <MuiFormControlLabel
                value="option1"
                control={<Checkbox defaultChecked />}
                label="체크박스"
              />
              <Box sx={{ ml: 4, mt: 0.5 }}>
                <p style={{ margin: "0", fontSize: "0.875rem", color: "#666" }}>
                  부가적인 설명이 들어갑니다.
                </p>
              </Box>
            </Box>
            <Box sx={{ mb: 2 }}>
              <MuiFormControlLabel value="option2" control={<Checkbox />} label="체크박스" />
              <Box sx={{ ml: 4, mt: 0.5 }}>
                <p style={{ margin: "0", fontSize: "0.875rem", color: "#666" }}>
                  부가적인 설명이 들어갑니다.
                </p>
              </Box>
            </Box>
          </MuiFormGroup>
        </Box>

        <Box>
          <h4>Chip 상태 (복수 선택 가능)</h4>
          <ChipCheckboxGroup />
        </Box>
      </Stack>
    </Box>
  ),
};
