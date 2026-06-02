import type { ComponentType } from "react";

export const routes = {
  home: "/",
  notice: "/notice",
  qna: "/qna",
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];

interface TabRouteConfig {
  title: string;
  loader: () => Promise<{ default: ComponentType }>;
}

/**
 * MDI 탭으로 열릴 라우트 설정.
 * 새 페이지를 탭으로 추가하려면 여기에만 항목을 추가하면 됩니다.
 */
export const TAB_ROUTES: Record<string, TabRouteConfig> = {
  [routes.home]: {
    title: "홈",
    loader: () => import("@/screens/home").then((m) => ({ default: m.HomePage })),
  },
  [routes.notice]: {
    title: "공지사항",
    loader: () => import("@/screens/notice").then((m) => ({ default: m.NoticePage })),
  },
  [routes.qna]: {
    title: "Q&A",
    loader: () => import("@/screens/qna").then((m) => ({ default: m.QnaPage })),
  },
};
