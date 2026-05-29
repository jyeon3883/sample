import type { ReactNode } from "react";

export type TabPanelProps = {
  value: number;
  index: number;
  children: ReactNode;
};

export function TabPanel({ value, index, children }: TabPanelProps) {
  if (value !== index) {
    return null;
  }

  return <div style={{ marginTop: "1rem" }}>{children}</div>;
}

