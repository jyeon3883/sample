"use client";

import * as React from "react";
import { CommonHeader } from "@repo/ui/layout";

type Props = {
  title?: string;
  actions?: React.ReactNode;
};

export function AppHeader({ title = "Web App", actions }: Props) {
  return <CommonHeader title={title} actions={actions} />;
}
