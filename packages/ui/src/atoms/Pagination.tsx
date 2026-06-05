import MuiPagination from "@mui/material/Pagination";
import type { PaginationProps as MuiPaginationProps } from "@mui/material/Pagination";

export type PaginationProps = MuiPaginationProps;

export function Pagination(props: PaginationProps) {
  return <MuiPagination {...props} />;
}
