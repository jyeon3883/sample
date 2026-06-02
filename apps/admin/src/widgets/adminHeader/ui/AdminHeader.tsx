"use client";

import Chip from "@mui/material/Chip";
import { CommonHeader } from "@repo/ui/layout";

type Props = {
  title?: string;
};

export function AdminHeader({ title = "Admin" }: Props) {
  return <CommonHeader title={title} actions={<Chip label="PORT 3001" color="default" size="small" />} />;
}
