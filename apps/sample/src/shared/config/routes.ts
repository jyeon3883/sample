import type { TabRouteMap } from "@repo/ui/layout/mdi";

export const routes = {
  home: "/",
  list: "/list",
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];

export const TAB_ROUTES: TabRouteMap = {
  [routes.home]: {
    title: "홈",
    loader: () => import("@/screens/home").then((m) => ({ default: m.SampleHomePage })),
  },
  [routes.list]: {
    title: "목록",
    loader: () => import("@/screens/list").then((m) => ({ default: m.SampleListPage })),
  },
};
