import { useLayoutEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Menu, type MenuProps } from "./Menu";
import { MenuItem } from "./Select";

const defaultAnchorOrigin: NonNullable<MenuProps["anchorOrigin"]> = {
  vertical: "bottom",
  horizontal: "left",
};

const defaultTransformOrigin: NonNullable<MenuProps["transformOrigin"]> = {
  vertical: "top",
  horizontal: "left",
};

const defaultChildren = (
  <>
    <MenuItem>Menu Item 1</MenuItem>
    <MenuItem>Menu Item 2</MenuItem>
    <MenuItem>Menu Item 3</MenuItem>
  </>
);

/** Storybook Controls — [Menu API](https://mui.com/material-ui/api/menu/) + Popover/Modal 상속 props */
const menuArgTypes = {
  anchorEl: { table: { disable: true }, control: false },
  children: { table: { disable: true }, control: false },
  onClose: {
    action: "onClose",
    description: "닫힐 때 호출 (escapeKeyDown, backdropClick, tabKeyDown)",
  },

  open: {
    control: "boolean",
    description: "메뉴 표시 여부",
    table: { category: "Menu" },
  },
  autoFocus: {
    control: "boolean",
    description: "열릴 때 메뉴 또는 첫 포커스 가능 항목에 포커스",
    table: { category: "Menu", defaultValue: { summary: "true" } },
  },
  disableAutoFocusItem: {
    control: "boolean",
    description: "열릴 때 선택된 항목 대신 메뉴 컨테이너에 포커스",
    table: { category: "Menu", defaultValue: { summary: "false" } },
  },
  variant: {
    control: "select",
    options: ["menu", "selectedMenu"],
    description: "selectedMenu: 선택 항목이 초기 포커스에 영향",
    table: { category: "Menu", defaultValue: { summary: "selectedMenu" } },
  },
  transitionDuration: {
    control: "select",
    options: ["auto", 0, 150, 225, 300, 500],
    description: "전환 시간(ms) 또는 auto",
    table: { category: "Menu", defaultValue: { summary: "auto" } },
  },

  anchorOrigin: {
    control: "object",
    description: "앵커에 붙는 기준점 { vertical, horizontal }",
    table: { category: "Popover · 위치" },
  },
  transformOrigin: {
    control: "object",
    description: "메뉴 쪽 기준점 { vertical, horizontal }",
    table: { category: "Popover · 위치" },
  },
  anchorReference: {
    control: "select",
    options: ["anchorEl", "anchorPosition", "none"],
    table: {
      category: "Popover · 위치",
      defaultValue: { summary: "anchorEl" },
    },
  },
  anchorPosition: {
    control: "object",
    description: "anchorReference가 anchorPosition일 때 { top, left }",
    table: { category: "Popover · 위치" },
    if: { arg: "anchorReference", eq: "anchorPosition" },
  },
  marginThreshold: {
    control: { type: "number", min: 0, max: 64, step: 4 },
    description: "창 가장자리와의 최소 거리(px)",
    table: { category: "Popover · 위치", defaultValue: { summary: "16" } },
  },

  elevation: {
    control: { type: "number", min: 0, max: 24, step: 1 },
    description: "Paper elevation",
    table: { category: "Popover · 스타일", defaultValue: { summary: "8" } },
  },
  sx: {
    control: "object",
    description: "system sx (예: { minWidth: 200 })",
    table: { category: "Popover · 스타일" },
  },

  disablePortal: {
    control: "boolean",
    table: { category: "Modal", defaultValue: { summary: "false" } },
  },
  hideBackdrop: {
    control: "boolean",
    description: "배경(Backdrop) 미렌더",
    table: { category: "Modal", defaultValue: { summary: "false" } },
  },
  disableScrollLock: {
    control: "boolean",
    description:
      "false일 때 Menu/Modal이 열리면 Storybook Docs 스크롤도 잠길 수 있음",
    table: {
      category: "Modal",
      defaultValue: { summary: "true (스토리북 기본)" },
    },
  },
  keepMounted: {
    control: "boolean",
    description: "닫혀도 DOM에 유지",
    table: { category: "Modal", defaultValue: { summary: "false" } },
  },
  disableEscapeKeyDown: {
    control: "boolean",
    table: { category: "Modal", defaultValue: { summary: "false" } },
  },
  closeAfterTransition: {
    control: "boolean",
    table: { category: "Modal", defaultValue: { summary: "false" } },
  },

  classes: { table: { disable: true } },
  PopoverClasses: { table: { disable: true } },
  slots: { table: { disable: true } },
  slotProps: { table: { disable: true } },
  action: { table: { disable: true } },
  container: { table: { disable: true } },
  MenuListProps: { table: { category: "deprecated", disable: true } },
  TransitionProps: { table: { category: "deprecated", disable: true } },
  TransitionComponent: { table: { category: "deprecated", disable: true } },
  PaperProps: { table: { category: "deprecated", disable: true } },
  BackdropComponent: { table: { category: "deprecated", disable: true } },
  BackdropProps: { table: { category: "deprecated", disable: true } },
} satisfies Meta<typeof Menu>["argTypes"];

/**
 * Menu 아톰 미리보기. anchorEl은 스토리북용 DOM(회색 점)으로 고정합니다.
 */
function AtomicMenuPreview(props: Partial<MenuProps>) {
  const {
    open = true,
    onClose = fn(),
    children = defaultChildren,
    ...menuProps
  } = props;
  const anchorRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    setAnchorEl(anchorRef.current);
  }, []);

  return (
    <div style={{ padding: 48 }}>
      <div
        ref={anchorRef}
        aria-hidden
        style={{
          display: "inline-block",
          width: 8,
          height: 8,
          backgroundColor: "#bdbdbd",
          borderRadius: 1,
        }}
      />
      <Menu
        {...menuProps}
        anchorEl={anchorEl}
        open={open && Boolean(anchorEl)}
        onClose={onClose}
      >
        {children}
      </Menu>
    </div>
  );
}

const defaultMenuArgs = {
  open: true,
  onClose: fn(),
  autoFocus: true,
  disableAutoFocusItem: false,
  variant: "selectedMenu" as const,
  transitionDuration: "auto" as const,
  anchorOrigin: defaultAnchorOrigin,
  transformOrigin: defaultTransformOrigin,
  anchorReference: "anchorEl" as const,
  marginThreshold: 16,
  elevation: 8,
  disablePortal: false,
  hideBackdrop: false,
  // 스토리북 Docs/Controls 스크롤 잠금 방지 (열린 Menu가 body overflow를 막음)
  disableScrollLock: true,
  keepMounted: false,
  disableEscapeKeyDown: false,
  closeAfterTransition: false,
  children: defaultChildren,
};

const meta = {
  title: "Atoms/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "",
      },
    },
    controls: { expanded: true, sort: "requiredFirst" },
  },
  argTypes: menuArgTypes,
  args: defaultMenuArgs,
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <AtomicMenuPreview {...args} />,
};
