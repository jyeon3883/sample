"use client";

import Chip from "@mui/material/Chip";
import { CommonHeader } from "@repo/ui/layout";

type Props = {
  title?: string;
};

export function {{PascalAppName}}Header({ title = "{{displayName}}" }: Props) {
  return (
    <CommonHeader
      title={title}
      actions={<Chip label="PORT {{port}}" color="default" size="small" />}
    />
  );
}
