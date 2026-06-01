import MuiTab from "@mui/material/Tab";
import MuiTabs from "@mui/material/Tabs";
import type { TabProps as MuiTabProps } from "@mui/material/Tab";
import type { TabsProps as MuiTabsProps } from "@mui/material/Tabs";

export type TabProps = MuiTabProps;
export type TabsProps = MuiTabsProps;

export function Tab(props: TabProps) {
  return <MuiTab {...props} />;
}

export function Tabs(props: TabsProps) {
  return <MuiTabs variant="scrollable" allowScrollButtonsMobile {...props} />;
}

