import type { Metadata } from "next";
import { AppProviders } from "@repo/ui/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "{{displayName}}",
  description: "{{displayName}} — Next.js 16.1 monorepo",
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
