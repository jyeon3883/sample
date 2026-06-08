"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { QueryProvider } from "@repo/query/provider";
import { UiThemeProvider } from "../theme";
import { ModalProvider } from "../layout/modal";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <UiThemeProvider>
        <QueryProvider>
          <ModalProvider>{children}</ModalProvider>
        </QueryProvider>
      </UiThemeProvider>
    </AppRouterCacheProvider>
  );
}
