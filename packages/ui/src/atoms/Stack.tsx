import MuiStack from "@mui/material/Stack";
import type { StackProps as MuiStackProps } from "@mui/material/Stack";

export type StackProps = MuiStackProps;

export function Stack(props: StackProps) {
  return <MuiStack {...props} />;
}
