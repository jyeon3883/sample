"use client";

import { useState, useMemo } from "react";
import MuiTable from "@mui/material/Table";
import type { SxProps, Theme } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  width?: string | number;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  rows: Record<string, unknown>[];
  /** 행 선택 체크박스 표시 */
  checkable?: boolean;
  /** 홀짝 행 배경색 구분 */
  striped?: boolean;
  caption?: string;
  stickyHeader?: boolean;
  maxHeight?: string | number;
  /** 데이터가 없을 때 표시할 텍스트 */
  emptyText?: string;
  onSelectionChange?: (selected: Record<string, unknown>[]) => void;
  sx?: SxProps<Theme>;
}

type SortOrder = "asc" | "desc";

const GOV_BLUE = "#004EA2";

export function Table({
  columns,
  rows,
  checkable = false,
  striped = false,
  caption,
  stickyHeader = false,
  maxHeight,
  emptyText = "데이터가 없습니다.",
  onSelectionChange,
  sx,
}: TableProps) {
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [order, setOrder] = useState<SortOrder>("asc");
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const handleSort = (key: string) => {
    if (orderBy === key) {
      setOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(key);
      setOrder("asc");
    }
  };

  const sortedRows = useMemo(() => {
    if (!orderBy) return rows;
    return [...rows].sort((a, b) => {
      const av = a[orderBy];
      const bv = b[orderBy];
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return order === "asc" ? cmp : -cmp;
    });
  }, [rows, orderBy, order]);

  const isAllSelected  = rows.length > 0 && selected.size === rows.length;
  const isIndeterminate = selected.size > 0 && selected.size < rows.length;

  const handleSelectAll = () => {
    const next = isAllSelected
      ? new Set<number>()
      : new Set(rows.map((_, i) => i));
    setSelected(next);
    onSelectionChange?.(isAllSelected ? [] : [...rows]);
  };

  const handleSelectRow = (idx: number) => {
    const next = new Set(selected);
    next.has(idx) ? next.delete(idx) : next.add(idx);
    setSelected(next);
    onSelectionChange?.(sortedRows.filter((_, i) => next.has(i)));
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={[
        {
          border: "1px solid #D0D0D0",
          borderRadius: 1,
          maxHeight: maxHeight ?? "none",
          overflow: maxHeight ? "auto" : "visible",
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <MuiTable stickyHeader={stickyHeader} aria-label={caption ?? "데이터 테이블"}>
        {caption && (
          <Box
            component="caption"
            sx={{
              captionSide: "top",
              px: 2,
              py: 1,
              textAlign: "left",
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            {caption}
          </Box>
        )}

        <TableHead>
          <TableRow>
            {checkable && (
              <TableCell
                padding="checkbox"
                sx={{ bgcolor: "#F5F5F5", borderBottom: "2px solid #C8C8C8" }}
              >
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={handleSelectAll}
                  aria-label="전체 선택"
                  size="small"
                  sx={{ "&.Mui-checked, &.MuiCheckbox-indeterminate": { color: GOV_BLUE } }}
                />
              </TableCell>
            )}
            {columns.map((col) => (
              <TableCell
                key={col.key}
                align={col.align ?? "left"}
                width={col.width}
                sortDirection={orderBy === col.key ? order : false}
                sx={{
                  bgcolor: "#F5F5F5",
                  borderBottom: "2px solid #C8C8C8",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  color: "text.primary",
                  whiteSpace: "nowrap",
                }}
              >
                {col.sortable ? (
                  <TableSortLabel
                    active={orderBy === col.key}
                    direction={orderBy === col.key ? order : "asc"}
                    onClick={() => handleSort(col.key)}
                    sx={{
                      "&.Mui-active": { color: GOV_BLUE },
                      "& .MuiTableSortLabel-icon": { color: `${GOV_BLUE} !important` },
                    }}
                  >
                    {col.label}
                  </TableSortLabel>
                ) : (
                  col.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedRows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (checkable ? 1 : 0)}
                align="center"
                sx={{ py: 5, color: "text.secondary", fontSize: "0.875rem" }}
              >
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            sortedRows.map((row, i) => (
              <TableRow
                key={i}
                selected={selected.has(i)}
                onClick={checkable ? () => handleSelectRow(i) : undefined}
                sx={{
                  cursor: checkable ? "pointer" : "default",
                  bgcolor: striped && i % 2 === 1 ? "#FAFAFA" : "background.paper",
                  "&.Mui-selected":       { bgcolor: "#EEF3FB" },
                  "&.Mui-selected:hover": { bgcolor: "#E3EBF7" },
                  "&:hover": { bgcolor: !striped && !checkable ? "#F9FAFB" : undefined },
                  "&:last-child td": { borderBottom: "none" },
                }}
              >
                {checkable && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.has(i)}
                      onChange={() => handleSelectRow(i)}
                      onClick={(e) => e.stopPropagation()}
                      size="small"
                      aria-label={`행 ${i + 1} 선택`}
                      sx={{ "&.Mui-checked": { color: GOV_BLUE } }}
                    />
                  </TableCell>
                )}
                {columns.map((col) => {
                  const val = row[col.key];
                  return (
                    <TableCell
                      key={col.key}
                      align={col.align ?? (typeof val === "number" ? "right" : "left")}
                      sx={{ fontSize: "0.875rem", color: "text.primary" }}
                    >
                      {col.render
                        ? col.render(val, row)
                        : val == null ? "–" : String(val)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
