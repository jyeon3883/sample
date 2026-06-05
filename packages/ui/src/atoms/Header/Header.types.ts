import type { Language } from "../LanguageSwitcher";
import type { ResizeScale, ResizeOption } from "../ResizeAdjuster";

export type { Language, ResizeScale, ResizeOption };

/** 유틸리티 메뉴 단순 링크 아이템 */
export type UtilityLinkItem = {
  type: "link";
  label: string;
  href: string;
  external?: boolean;
};

/** 유틸리티 메뉴 언어 변경 아이템 */
export type UtilityLanguageItem = {
  type: "language";
  languages: Language[];
  currentLanguage?: string;
  showCurrentLanguage?: boolean;
  onLanguageChange?: (code: string) => void;
};

/** 유틸리티 메뉴 화면 크기 조절 아이템 */
export type UtilityResizeItem = {
  type: "resize";
  options?: ResizeOption[];
  currentScale?: ResizeScale;
  onScaleChange?: (scale: ResizeScale) => void;
  onReset?: () => void;
};

/** 유틸리티 메뉴 커스텀 드롭다운 아이템 */
export type UtilityDropdownItem = {
  type: "dropdown";
  label: string;
  items: { label: string; href?: string; external?: boolean; onClick?: () => void }[];
};

export type UtilityItem =
  | UtilityLinkItem
  | UtilityLanguageItem
  | UtilityResizeItem
  | UtilityDropdownItem;

/** GNB Last depth 아이템 */
export type GnbLastDepthItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

/** GNB 2Depth 서브메뉴 */
export type GnbSubMenu = {
  label: string;
  href?: string;
  external?: boolean;
  items?: GnbLastDepthItem[];
  bannerBadge?: string;
  bannerLabel?: string;
  onBannerClick?: () => void;
};

/** GNB 1Depth 메뉴 */
export type GnbMenu = {
  label: string;
  href?: string;
  external?: boolean;
  subMenus?: GnbSubMenu[];
};

/** 로그인된 사용자 정보 */
export type UserInfo = {
  name: string;
  remainingTime?: string;
  onExtendTime?: () => void;
  onLogout?: () => void;
  myMenuItems?: { label: string; href: string }[];
};

export type HeaderProps = {
  logoHref?: string;
  logoAlt?: string;
  utilityItems?: UtilityItem[];
  gnbMenus?: GnbMenu[];
  isLoggedIn?: boolean;
  userInfo?: UserInfo;
  onLoginClick?: () => void;
  onJoinClick?: () => void;
  onSearchClick?: () => void;
};
