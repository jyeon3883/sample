import MuiButton from "@mui/material/Button";
import type { ButtonProps as MuiButtonProps } from "@mui/material/Button";

export type ButtonProps = MuiButtonProps;

export function Button(props: ButtonProps) {
  return <MuiButton variant="contained" size="medium" {...props} />;
}

