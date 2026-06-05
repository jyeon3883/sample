"use client";

import Chip from "@mui/material/Chip";
import { CommonHeader } from "@repo/ui/layout";

type Props = {
  title?: string;
};

export function SampleHeader({ title = "샘플" }: Props) {
  return (
    <CommonHeader
      title={title}
      actions={<Chip label="PORT 3002" color="default" size="small" />}
    />
  );
}
