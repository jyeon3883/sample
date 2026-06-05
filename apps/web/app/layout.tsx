import type { Metadata } from "next";
import { AppProviders } from "@repo/ui/providers";
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
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
