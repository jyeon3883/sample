import { useState, useRef } from "react";
import { Button } from "./Button";
import { Menu } from "./Menu";
import { MenuItem } from "./Select";
import Box from "@mui/material/Box";
import type { ButtonProps } from "./Button";

export interface Language {
  code: string;
  label: string;
  icon?: React.ReactNode;
  isNewWindow?: boolean;
}

export interface LanguageSwitcherProps extends Omit<ButtonProps, "children"> {
  languages: Language[];
  currentLanguage?: string;
  showCurrentLanguage?: boolean;
  onLanguageChange?: (languageCode: string) => void;
}

export function LanguageSwitcher({
  languages,
  currentLanguage = "ko",
  showCurrentLanguage = false,
  onLanguageChange,
  ...buttonProps
}: LanguageSwitcherProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (languageCode: string) => {
    onLanguageChange?.(languageCode);
    handleClose();
  };

  const currentLangLabel = languages.find((lang) => lang.code === currentLanguage)?.label;

  const filterLanguages = languages.filter((lang) => lang.code !== currentLanguage);

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={handleOpen}
        variant="text"
        size="small"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          textTransform: "none",
          fontSize: "0.875rem",
        }}
        {...buttonProps}
      >
        <span>언어 변경</span>
        <span style={{ fontSize: "1rem" }}>▼</span>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {showCurrentLanguage && currentLangLabel && (
          <Box
            sx={{
              px: 2,
              py: 1,
              borderBottom: "1px solid #eee",
              fontSize: "0.875rem",
            }}
          >
            <Box sx={{ color: "#999" }}>현재 언어</Box>
            <Box sx={{ fontWeight: "bold" }}>{currentLangLabel}</Box>
          </Box>
        )}

        {filterLanguages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageSelect(language.code)}
            sx={{
              fontSize: "0.875rem",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {language.label}
              {language.isNewWindow && <span> ↗</span>}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
