import type { TabRouteMap } from "@repo/ui/layout/mdi";

export const routes = {
  home: "/",
  members: "/members",
  settings: "/settings",
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];

export const TAB_ROUTES: TabRouteMap = {
  [routes.home]: {
    title: "대시보드",
    loader: () =>
      import("@/screens/dashboard").then((m) => ({ default: m.AdminDashboard })),
  },
  [routes.members]: {
    title: "회원 관리",
    loader: () => import("@/screens/members").then((m) => ({ default: m.MembersPage })),
  },
  [routes.settings]: {
    title: "설정",
    loader: () => import("@/screens/settings").then((m) => ({ default: m.SettingsPage })),
  },
};
