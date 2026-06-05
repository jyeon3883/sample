import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import type { BreadcrumbsProps as MuiBreadcrumbsProps } from "@mui/material/Breadcrumbs";

export type BreadcrumbProps = MuiBreadcrumbsProps;

export function Breadcrumb(props: BreadcrumbProps) {
  return <MuiBreadcrumbs aria-label="breadcrumb" {...props} />;
}
