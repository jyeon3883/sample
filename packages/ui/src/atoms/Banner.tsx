import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { BoxProps } from "@mui/material/Box";
import type { TypographyProps } from "@mui/material/Typography";

export interface BannerProps extends Omit<BoxProps, "children"> {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  typographyProps?: TypographyProps;
}

export function Banner({
  text,
  backgroundColor = "#f5f5f5",
  textColor = "#333",
  typographyProps,
  sx,
  ...boxProps
}: BannerProps) {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor,
        py: 1.5,
        px: 2,
        ...sx,
      }}
      {...boxProps}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: textColor,
            fontSize: "0.875rem",
            fontWeight: 500,
            m: 0,
          }}
          {...typographyProps}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
}
