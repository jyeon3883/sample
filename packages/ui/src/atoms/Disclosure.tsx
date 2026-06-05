"use client";

import { Accordion } from "./Accordion";
import type { AccordionItem } from "./Accordion";
import type { SxProps, Theme } from "@mui/material/styles";

export type { AccordionItem as DisclosureItem };

export interface DisclosureProps {
  items: AccordionItem[];
  /** chevron-right: > 아이콘, 열리면 90° 회전 (기본값) / arrow: 위아래 화살표 전환 */
  icon?: "chevron-right" | "arrow";
  sx?: SxProps<Theme>;
}

export function Disclosure({ items, icon, sx }: DisclosureProps) {
  return <Accordion mode="disclosure" items={items} icon={icon} sx={sx} />;
}
