import { ThemeProvider } from "@/components/provider/theme-context";
import { Navbar } from "@/components/ui/navbar";
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
            <body
                className={`${MontserratFont.className} antialiased bg-neutral-200 overflow-hidden`}
            >
                <ThemeProvider
                    attribute={"class"}
                    defaultTheme="theme"
                    enableSystem
                    disableTransitionOnChange
                >
                    <CursorProvider>
                        <Navbar />
                        <main className="w-full relative bg-background ">{children}</main>
                    </CursorProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
