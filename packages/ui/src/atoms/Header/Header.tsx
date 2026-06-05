import { useState } from "react";
import MuiBox from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import MuiIconButton from "@mui/material/IconButton";
import MuiDivider from "@mui/material/Divider";
import MuiList from "@mui/material/List";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import MuiListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Button } from "../Button";
import { Menu } from "../Menu";
import { MenuItem } from "../Select";
import { Typography } from "../Typography";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { ResizeAdjuster } from "../ResizeAdjuster";

import type {
  HeaderProps,
  UtilityItem,
  UtilityDropdownItem,
  UtilityLinkItem,
  GnbMenu,
  GnbSubMenu,
  UserInfo,
} from "./Header.types";

// ─────────────────────────────────────────────
// 유틸리티 메뉴 아이템
// ─────────────────────────────────────────────
function UtilityMenuItem({ item }: { item: UtilityItem }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (item.type === "language") {
    return (
      <LanguageSwitcher
        languages={item.languages}
        currentLanguage={item.currentLanguage}
        showCurrentLanguage={item.showCurrentLanguage}
        onLanguageChange={item.onLanguageChange}
        variant="text"
        size="small"
      />
    );
  }

  if (item.type === "resize") {
    return (
      <ResizeAdjuster
        options={item.options}
        currentScale={item.currentScale}
        onScaleChange={item.onScaleChange}
        onReset={item.onReset}
        variant="text"
        size="small"
      />
    );
  }

  if (item.type === "link") {
    const linkItem = item as UtilityLinkItem;
    return (
      <Button
        component="a"
        href={linkItem.href}
        target={linkItem.external ? "_blank" : undefined}
        rel={linkItem.external ? "noopener noreferrer" : undefined}
        variant="text"
        size="small"
        endIcon={linkItem.external ? <ChevronRightIcon fontSize="small" /> : undefined}
        sx={{ color: "text.secondary", fontSize: "0.75rem" }}
      >
        {linkItem.label}
      </Button>
    );
  }

  // type === "dropdown"
  const dropdownItem = item as UtilityDropdownItem;
  return (
    <>
      <Button
        variant="text"
        size="small"
        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ color: "text.secondary", fontSize: "0.75rem" }}
      >
        {dropdownItem.label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {dropdownItem.items.map((sub, idx) => (
          <MenuItem
            key={idx}
            component={sub.href ? "a" : "li"}
            href={sub.href}
            target={sub.external ? "_blank" : undefined}
            rel={sub.external ? "noopener noreferrer" : undefined}
            onClick={() => {
              sub.onClick?.();
              setAnchorEl(null);
            }}
            sx={{ fontSize: "0.875rem" }}
          >
            {sub.label}
            {sub.external && <ChevronRightIcon fontSize="small" sx={{ ml: 0.5 }} />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

// ─────────────────────────────────────────────
// GNB 서브메뉴 패널
// ─────────────────────────────────────────────
function GnbSubPanel({ sub }: { sub: GnbSubMenu }) {
  return (
    <MuiBox sx={{ minWidth: 180 }}>
      <Typography variant="subtitle2" sx={{ px: 2, pt: 2, pb: 1, fontWeight: 700 }}>
        {sub.label}
      </Typography>
      {sub.items && sub.items.length > 0 && (
        <MuiList dense disablePadding>
          {sub.items.map((item, idx) => (
            <MuiListItem key={idx} disablePadding>
              <MuiListItemButton
                component={item.href ? "a" : "button"}
                href={item.href}
                onClick={item.onClick}
                sx={{ px: 2, py: 0.5 }}
              >
                <MuiListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: "0.875rem" }}
                />
              </MuiListItemButton>
            </MuiListItem>
          ))}
        </MuiList>
      )}
      {sub.bannerLabel && (
        <MuiBox
          sx={{
            px: 2,
            py: 1.5,
            mt: 1,
            borderTop: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {sub.bannerBadge && (
            <MuiBox
              component="span"
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: 1,
                bgcolor: "secondary.main",
                color: "secondary.contrastText",
                fontSize: "0.75rem",
              }}
            >
              {sub.bannerBadge}
            </MuiBox>
          )}
          <Button
            variant="text"
            size="small"
            endIcon={<ChevronRightIcon fontSize="small" />}
            onClick={sub.onBannerClick}
            sx={{ fontSize: "0.75rem" }}
          >
            {sub.bannerLabel}
          </Button>
        </MuiBox>
      )}
    </MuiBox>
  );
}

// ─────────────────────────────────────────────
// GNB 1Depth 버튼
// ─────────────────────────────────────────────
function GnbMenuItem({ menu }: { menu: GnbMenu }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const hasSubMenus = menu.subMenus && menu.subMenus.length > 0;

  if (!hasSubMenus) {
    return (
      <Button
        component={menu.href ? "a" : "button"}
        href={menu.href}
        target={menu.external ? "_blank" : undefined}
        rel={menu.external ? "noopener noreferrer" : undefined}
        variant="text"
        sx={{ color: "text.primary", fontWeight: 600 }}
      >
        {menu.label}
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="text"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ color: "text.primary", fontWeight: 600 }}
      >
        {menu.label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            elevation: 2,
            sx: { display: "flex", flexDirection: "row", p: 1 },
          },
        }}
      >
        {menu.subMenus!.map((sub, idx) => (
          <MuiBox key={idx} sx={{ display: "flex" }}>
            {idx > 0 && <MuiDivider orientation="vertical" flexItem sx={{ mx: 1 }} />}
            <GnbSubPanel sub={sub} />
          </MuiBox>
        ))}
      </Menu>
    </>
  );
}

// ─────────────────────────────────────────────
// 나의 GOV 드롭다운
// ─────────────────────────────────────────────
function MyGovMenu({ userInfo }: { userInfo: UserInfo }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <Button
        variant="text"
        size="small"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ color: "text.primary" }}
      >
        나의 GOV
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { minWidth: 220 } } }}
      >
        <MuiBox sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" fontWeight={700}>
            {userInfo.name}님
          </Typography>
          {userInfo.remainingTime && (
            <MuiBox sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                로그아웃까지 남은 시간
              </Typography>
              <Typography variant="caption" fontWeight={700}>
                {userInfo.remainingTime}
              </Typography>
              {userInfo.onExtendTime && (
                <Button
                  variant="text"
                  size="small"
                  onClick={userInfo.onExtendTime}
                  sx={{ fontSize: "0.75rem", minWidth: "auto" }}
                >
                  시간 연장
                </Button>
              )}
            </MuiBox>
          )}
        </MuiBox>

        <MuiDivider />

        {userInfo.myMenuItems?.map((item, idx) => (
          <MenuItem key={idx} component="a" href={item.href} sx={{ fontSize: "0.875rem" }}>
            {item.label}
          </MenuItem>
        ))}

        <MuiDivider />

        <MuiBox sx={{ px: 1, py: 0.5 }}>
          <Button
            variant="text"
            size="small"
            startIcon={<LogoutIcon fontSize="small" />}
            fullWidth
            onClick={() => {
              setAnchorEl(null);
              userInfo.onLogout?.();
            }}
            sx={{ justifyContent: "flex-start", fontSize: "0.875rem" }}
          >
            로그아웃
          </Button>
        </MuiBox>
      </Menu>
    </>
  );
}

// ─────────────────────────────────────────────
// 모바일 Drawer
// ─────────────────────────────────────────────
function MobileNavDrawer({
  open,
  onClose,
  gnbMenus = [],
  isLoggedIn,
  userInfo,
  onLoginClick,
  onSearchClick,
}: {
  open: boolean;
  onClose: () => void;
  gnbMenus?: GnbMenu[];
  isLoggedIn?: boolean;
  userInfo?: UserInfo;
  onLoginClick?: () => void;
  onSearchClick?: () => void;
}) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <MuiDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: "100%", maxWidth: 360 } } }}
    >
      <MuiBox sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* 헤더 영역 */}
        <MuiBox
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {isLoggedIn && userInfo ? (
            <MuiBox sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="subtitle2" fontWeight={700}>
                {userInfo.name}님
              </Typography>
              <Button
                variant="text"
                size="small"
                startIcon={<LogoutIcon fontSize="small" />}
                onClick={userInfo.onLogout}
              >
                로그아웃
              </Button>
            </MuiBox>
          ) : (
            <Button
              variant="text"
              fullWidth
              onClick={onLoginClick}
              sx={{ justifyContent: "flex-start" }}
            >
              로그인을 해주세요
            </Button>
          )}
        </MuiBox>

        {/* 검색 */}
        <MuiBox sx={{ px: 2, py: 1 }}>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            startIcon={<SearchIcon />}
            onClick={onSearchClick}
          >
            검색
          </Button>
        </MuiBox>

        {/* GNB */}
        <MuiBox sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* 1Depth */}
          <MuiList
            disablePadding
            sx={{
              width: 120,
              borderRight: "1px solid",
              borderColor: "divider",
              overflowY: "auto",
            }}
          >
            {gnbMenus.map((menu, idx) => (
              <MuiListItemButton
                key={idx}
                selected={selectedIdx === idx}
                onClick={() => setSelectedIdx(idx)}
                sx={{ py: 1.5 }}
              >
                <MuiListItemText
                  primary={menu.label}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: selectedIdx === idx ? 700 : 400,
                  }}
                />
              </MuiListItemButton>
            ))}
          </MuiList>

          {/* 2Depth */}
          <MuiBox sx={{ flex: 1, overflowY: "auto", p: 1 }}>
            {gnbMenus[selectedIdx]?.subMenus?.map((sub, idx) => (
              <MuiBox key={idx} sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="text.secondary"
                  sx={{ px: 1 }}
                >
                  {sub.label}
                </Typography>
                <MuiList dense disablePadding>
                  {sub.items?.map((item, itemIdx) => (
                    <MuiListItemButton
                      key={itemIdx}
                      component={item.href ? "a" : "button"}
                      href={item.href}
                      onClick={item.onClick}
                      sx={{ py: 0.75, px: 1 }}
                    >
                      <MuiListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontSize: "0.875rem" }}
                      />
                    </MuiListItemButton>
                  ))}
                </MuiList>
              </MuiBox>
            ))}
          </MuiBox>
        </MuiBox>
      </MuiBox>

      {/* 닫기 버튼 */}
      <MuiIconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8 }}
        aria-label="전체메뉴 닫기"
      >
        <CloseIcon />
      </MuiIconButton>
    </MuiDrawer>
  );
}

// ─────────────────────────────────────────────
// Header (최상위)
// ─────────────────────────────────────────────
export type { HeaderProps };

export function Header({
  logoHref = "#",
  logoAlt = "KRDS - Korea Design System",
  utilityItems = [],
  gnbMenus = [],
  isLoggedIn = false,
  userInfo,
  onLoginClick,
  onJoinClick,
  onSearchClick,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <MuiBox component="header" id="krds-header" sx={{ position: "sticky", top: 0, zIndex: 1100 }}>
      <MuiAppBar position="static" color="inherit" elevation={1}>
        {/* 유틸리티 메뉴 */}
        {utilityItems.length > 0 && (
          <MuiBox
            sx={{
              borderBottom: "1px solid",
              borderColor: "divider",
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              px: 3,
              py: 0.5,
              gap: 0.5,
            }}
          >
            {utilityItems.map((item, idx) => (
              <UtilityMenuItem key={idx} item={item} />
            ))}
          </MuiBox>
        )}

        {/* 브랜딩 + 액션 */}
        <MuiToolbar sx={{ gap: 1, minHeight: { xs: 56, sm: 64 } }}>
          {/* 로고 */}
          <MuiBox
            component="a"
            href={logoHref}
            aria-label={logoAlt}
            sx={{
              textDecoration: "none",
              color: "text.primary",
              mr: 2,
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1.125rem" }}>
              {logoAlt}
            </Typography>
          </MuiBox>

          {/* 데스크탑 GNB */}
          <MuiBox sx={{ display: { xs: "none", md: "flex" }, flex: 1, gap: 0.5 }}>
            {gnbMenus.map((menu, idx) => (
              <GnbMenuItem key={idx} menu={menu} />
            ))}
          </MuiBox>

          {/* 오른쪽 액션 */}
          <MuiBox sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 0.5 }}>
            {/* 검색 */}
            <MuiIconButton onClick={onSearchClick} aria-label="통합검색" size="small">
              <SearchIcon />
            </MuiIconButton>

            {/* 로그인/회원가입 or 나의 GOV */}
            {isLoggedIn && userInfo ? (
              <MuiBox sx={{ display: { xs: "none", md: "flex" } }}>
                <MyGovMenu userInfo={userInfo} />
              </MuiBox>
            ) : (
              <MuiBox sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
                <Button variant="text" size="small" onClick={onLoginClick}>
                  로그인
                </Button>
                <Button variant="outlined" size="small" onClick={onJoinClick}>
                  회원가입
                </Button>
              </MuiBox>
            )}

            {/* 모바일 전체메뉴 */}
            <MuiIconButton
              onClick={() => setMobileOpen(true)}
              aria-label="전체메뉴"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon />
            </MuiIconButton>
          </MuiBox>
        </MuiToolbar>
      </MuiAppBar>

      <MobileNavDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        gnbMenus={gnbMenus}
        isLoggedIn={isLoggedIn}
        userInfo={userInfo}
        onLoginClick={onLoginClick}
        onSearchClick={onSearchClick}
      />
    </MuiBox>
  );
}
