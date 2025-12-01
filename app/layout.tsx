import { ThemeProvider } from "@/components/provider/theme-context";
import { CursorProvider } from "@/lib/contexts/cursor-context";
import { Montserrat } from "next/font/google";
import "./globals.css";

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
                    <CursorProvider>
                        <main className="w-full relative">{children}</main>
                    </CursorProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
