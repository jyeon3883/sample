import MuiTypography from "@mui/material/Typography";
import type { TypographyProps as MuiTypographyProps } from "@mui/material/Typography";
import type { AnchorHTMLAttributes } from "react";

export type TypographyProps = MuiTypographyProps &
  Partial<Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel" | "href">>;

export function Typography(props: TypographyProps) {
  return <MuiTypography {...props} />;
}
