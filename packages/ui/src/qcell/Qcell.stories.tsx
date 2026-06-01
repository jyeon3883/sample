import type { Meta, StoryObj } from "@storybook/react-vite";
import { QCELLGrid } from "./index";

const meta = {
  title: "Qcell/QCELLGrid",
  component: QCELLGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof QCELLGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultObjProperty = {
  id: "grid1",
  parentid: "gridParent",
  columns: [
    { name: "col1", title: "Column 1", width: 120 },
    { name: "col2", title: "Column 2", width: 120 },
  ],
};

export const Default: Story = {
  args: {
    width: "100%",
    height: "400px",
    objProperty: defaultObjProperty,
  },
};

export const CustomLoading: Story = {
  args: {
    width: "100%",
    height: "400px",
    objProperty: defaultObjProperty,
    loadingFallback: (
      <div style={{ padding: 16, border: "1px dashed #ccc" }}>QCELL 로딩 중 (custom)...</div>
    ),
  },
};

export const CustomError: Story = {
  args: {
    width: "100%",
    height: "200px",
    objProperty: defaultObjProperty,
    suppressKnownQcellErrors: false,
    errorFallback: (
      <div style={{ padding: 16, border: "1px solid #f44336", color: "#f44336" }}>
        QCELL 로딩 실패 (custom fallback)
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "qcell-react 로딩 실패 시 errorFallback UI를 확인합니다. 실제 로딩 성공 여부는 qcell-react 환경에 따라 달라질 수 있습니다.",
      },
    },
  },
};
