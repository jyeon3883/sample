import { Container as MuiContainer } from "@mui/material";
import type { ContainerProps as MuiContainerProps } from "@mui/material/Container";

export type ContainerProps = MuiContainerProps;

export function Container(props: ContainerProps) {
  return <MuiContainer {...props} />;
}
