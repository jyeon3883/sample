import MuiCollapse from "@mui/material/Collapse";
import type { CollapseProps as MuiCollapseProps } from "@mui/material/Collapse";

export type CollapseProps = MuiCollapseProps;

export function Collapse(props: CollapseProps) {
  return <MuiCollapse {...props} />;
}
