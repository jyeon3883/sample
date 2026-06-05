import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from "./Chip";

const meta = {
  title: "Atoms/Chip",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  render: () => <Chip label="선택되지 않음" variant="outlined" />,
};

export const Checked: Story = {
  render: () => <Chip label="선택됨" color="primary" variant="filled" />,
};

export const Disabled: Story = {
  render: () => <Chip label="비활성화" disabled variant="outlined" />,
};
