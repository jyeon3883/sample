import type { Meta, StoryObj } from "@storybook/react-vite";
import { EChart } from "./index";
import { barChartOption, lineChartOption, pieChartOption } from "./fixtures";

const meta = {
  title: "Chart/EChart",
  component: EChart,
  tags: ["autodocs"],
} satisfies Meta<typeof EChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bar: Story = {
  args: {
    option: barChartOption,
    height: 400,
  },
};

export const Line: Story = {
  args: {
    option: lineChartOption,
    height: 400,
  },
};

export const Pie: Story = {
  args: {
    option: pieChartOption,
    height: 400,
  },
};

export const Loading: Story = {
  args: {
    option: barChartOption,
    height: 400,
    loading: true,
  },
};
