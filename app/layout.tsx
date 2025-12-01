import { ThemeProvider } from "@/components/provider/theme-context";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
    title: "Riven | The Next-Gen Client & Invoice Management Platform",
    description:
        "Riven is the next step in managing your invoices, clients and reports. Designed for all types of businesses, big, small or solo. Riven is the perfect tool to help you manage your administration seamlessly.",
    openGraph: {
        locale: "en_AU",
        type: "website",
        url: "https://riven.software",
        title: "Riven | The Next-Gen Client & Invoice Management Platform",
        description:
            "Riven is the next step in managing your invoices, clients and reports. Designed for all types of businesses, big, small or solo. Riven is the perfect tool to help you manage your administration seamlessly.",
        siteName: "Riven",
    },
};

const MontserratFont = Montserrat({
    subsets: ["latin"],
    weight: ["200", "400", "700"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true} className="overflow-x-hidden">
            <body className={`${MontserratFont.className} antialiased bg-neutral-200`}>
                <ThemeProvider
                    attribute={"class"}
                    defaultTheme="theme"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="w-full relative">{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}
