"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

export interface TextListItem {
  content: React.ReactNode;
  children?: TextListItem[];
}

export type TextListType = "bullet" | "dash" | "hollow" | "decimal" | "alpha";

export interface TextListProps {
  items: TextListItem[];
  /** bullet: ● / dash: – / hollow: ○ / decimal: 1. / alpha: a. */
  type?: TextListType;
  sx?: SxProps<Theme>;
}

const TAG: Record<TextListType, "ul" | "ol"> = {
  bullet:  "ul",
  dash:    "ul",
  hollow:  "ul",
  decimal: "ol",
  alpha:   "ol",
};

const LIST_STYLE: Record<TextListType, string> = {
  bullet:  "disc",
  dash:    "none",
  hollow:  "circle",
  decimal: "decimal",
  alpha:   "lower-alpha",
};

function TextListLevel({
  items,
  type,
  level,
  rootSx,
}: {
  items: TextListItem[];
  type: TextListType;
  level: number;
  rootSx?: SxProps<Theme>;
}) {
  const isDash = type === "dash";
  const tag = TAG[type];

  return (
    <Box
      component={tag}
      role="list"
      sx={[
        {
          m: 0,
          pl: level === 0 ? "1.5rem" : "1.25rem",
          mt: level > 0 ? 0.5 : 0,
          listStyleType: LIST_STYLE[type],
          "& li + li": { mt: 0.5 },
        },
        ...(level === 0 ? (Array.isArray(rootSx) ? rootSx : rootSx ? [rootSx] : []) : []),
      ]}
    >
      {items.map((item, i) => (
        <Box
          key={i}
          component="li"
          role="listitem"
          sx={{
            pl: isDash ? 0 : undefined,
            listStyleType: isDash ? "none" : undefined,
          }}
        >
          <Typography
            variant="body2"
            component="span"
            sx={{ lineHeight: 1.75, color: "text.primary" }}
          >
            {isDash && (
              <Typography component="span" sx={{ mr: 0.75, color: "#555", fontWeight: 500 }}>
                –
              </Typography>
            )}
            {item.content}
          </Typography>

          {item.children && item.children.length > 0 && (
            <TextListLevel items={item.children} type={type} level={level + 1} rootSx={rootSx} />
          )}
        </Box>
      ))}
    </Box>
  );
}

export function TextList({ items, type = "bullet", sx }: TextListProps) {
  return <TextListLevel items={items} type={type} level={0} rootSx={sx} />;
}
