import MuiSkipLink from "@mui/material/Link";
import type { LinkProps as MuiLinkProps } from "@mui/material/Link";

export type SkipLinkProps = MuiLinkProps;

export function SkipLink(props: SkipLinkProps) {
  return <MuiSkipLink underline="none" {...props} />;
}
