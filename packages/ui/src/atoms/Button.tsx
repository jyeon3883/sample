import MuiButton from "@mui/material/Button";
import type { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import type { AnchorHTMLAttributes } from "react";

export type ButtonProps = MuiButtonProps &
  Partial<Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel" | "href">>;

export function Button(props: ButtonProps) {
  return <MuiButton variant="contained" size="medium" {...props} />;
}
