import MuiBox from "@mui/material/Box";
import type { BoxProps as MuiBoxProps } from "@mui/material/Box";

export type BoxProps = MuiBoxProps;

export function Box(props: BoxProps) {
  return <MuiBox {...props} />;
}
