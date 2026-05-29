import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { QueryProvider } from "@repo/query/provider";
import { UiThemeProvider } from "@repo/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web App",
  description: "Next.js 16.1 + TanStack Query monorepo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AppRouterCacheProvider>
          <UiThemeProvider>
            <QueryProvider>{children}</QueryProvider>
          </UiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
