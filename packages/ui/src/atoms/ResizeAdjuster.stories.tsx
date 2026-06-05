import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ResizeAdjuster, type ResizeScale } from "./ResizeAdjuster";
import Box from "@mui/material/Box";

const meta = {
  title: "Atoms/ResizeAdjuster",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 기본 화면 크기 조정기
 */
export const Basic: Story = {
  render: () => {
    const [scale, setScale] = useState<ResizeScale>("md");

    const scaleValues = {
      sm: 0.8,
      md: 1,
      lg: 1.2,
      xlg: 1.4,
      xxlg: 1.6,
    };

    const labelMap = {
      sm: "작게",
      md: "보통",
      lg: "조금 크게",
      xlg: "크게",
      xxlg: "가장 크게",
    };

    return (
      <Box>
        <h3>화면 크기 조정기</h3>
        <ResizeAdjuster
          currentScale={scale}
          onScaleChange={(newScale) => {
            setScale(newScale);
            console.log("Scale changed to:", newScale);
          }}
          onReset={() => {
            setScale("md");
            console.log("Reset to default scale");
          }}
        />

        <Box sx={{ mt: 4 }}>
          <div
            style={{
              transform: `scale(${scaleValues[scale]})`,
              transformOrigin: "top left",
              transition: "transform 0.3s ease",
            }}
          >
            <h4>화면 크기 미리보기</h4>
            <Box
              sx={{
                p: 3,
                backgroundColor: "#f0f0f0",
                borderRadius: 1,
                width: "300px",
              }}
            >
              <p>
                현재 크기: <strong>{labelMap[scale]}</strong>
              </p>
              <p>
                스케일: <strong>{scaleValues[scale].toFixed(1)}배</strong>
              </p>
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  textAlign: "center",
                }}
              >
                <p>이 영역이 화면 크기에 따라 확대/축소됩니다.</p>
              </Box>
            </Box>
          </div>
        </Box>
      </Box>
    );
  },
};
