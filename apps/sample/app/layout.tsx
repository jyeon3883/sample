import type { Metadata } from "next";
import { AppProviders } from "@repo/ui/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "샘플",
  description: "샘플 — Next.js 16.1 monorepo",
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
