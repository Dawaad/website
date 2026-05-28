import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "kade okafor — portfolio",
  description: "systems & interaction design — terminal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="scheme-phosphor">{children}</body>
    </html>
  );
}
