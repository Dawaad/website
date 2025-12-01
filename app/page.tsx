"use static";

import { GradualBlur } from "@/components/GradualBlur";
import { Introduction } from "@/components/landing/hero-blurb";
import { Timezone } from "@/components/landing/hero-timezone";
import { SkylineHero } from "@/components/landing/skyline-hero";
import { LiquidCursor } from "@/components/ui/gsap/liquid-cursor";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jared Tucker | Full-stack Engineer & Startup Founder",
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

export default function Home() {
    return (
        <div className="relative">
            <div className="w-full min-h-screen relative bg-page-background overflow-x-hidden">
                <section className="absolute inset-0 h-dvh bg-neutral-400"></section>
                <SkylineHero />
                <LiquidCursor size={30} />
                <div className="z-30 flex flex-col items-end justify-center h-[90dvh] space-y-4">
                    <Introduction />
                    <Timezone />
                </div>
            </div>
            <GradualBlur
                target="parent"
                position="bottom"
                height="10rem"
                strength={2}
                divCount={5}
                curve="bezier"
                exponential={true}
                opacity={1}
            />
        </div>
    );
}
