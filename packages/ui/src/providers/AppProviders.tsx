"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { QueryProvider } from "@repo/query/provider";
import { UiThemeProvider } from "../theme";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <UiThemeProvider>
        <QueryProvider>{children}</QueryProvider>
      </UiThemeProvider>
    </AppRouterCacheProvider>
  );
}
