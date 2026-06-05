/** 관련 사이트 퀵 링크 */
export type FooterQuickItem = {
  label: string;
  href: string;
  external?: boolean;
};

/** 고객센터 정보 */
export type FooterCsItem = {
  strong: string;
  description?: string;
};

/** 바로가기 링크 */
export type FooterGoLink = {
  label: string;
  href: string;
  external?: boolean;
};

/** SNS 링크 */
export type FooterSnsItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

/** 하단 메뉴 링크 */
export type FooterBottomMenu = {
  label: string;
  href: string;
  highlight?: boolean;
};

export type FooterProps = {
  /** 관련 사이트 퀵 링크 목록 */
  quickItems?: FooterQuickItem[];
  /** 로고 대체 텍스트 */
  logoAlt?: string;
  /** 주소 */
  address?: string;
  /** 고객센터 정보 */
  csItems?: FooterCsItem[];
  /** 바로가기 링크 */
  goLinks?: FooterGoLink[];
  /** SNS 링크 */
  snsItems?: FooterSnsItem[];
  /** 하단 메뉴 */
  bottomMenus?: FooterBottomMenu[];
  /** 저작권 문구 */
  copyright?: string;
  /** 식별 배너 텍스트 */
  identifierText?: string;
  /** 식별 배너 로고 대체 텍스트 */
  identifierLogoAlt?: string;
};
