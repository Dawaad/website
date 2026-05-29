import type { Metadata } from "next";
import localFont from "next/font/local";

import { PortfolioShell } from "@/components/feature-modules/portfolio/components/portfolio-shell";

import "./globals.css";

const jetbrainsMono = localFont({
  src: "../public/fonts/JetBrainsMono-Variable.ttf",
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Jared Tucker",
  description: "Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body className="scheme-moonlit flex h-dvh items-center justify-center overflow-hidden p-6 font-mono text-[13px] leading-[1.55] text-fg-1 max-md:p-0">
        <PortfolioShell>{children}</PortfolioShell>
      </body>
    </html>
  );
}
