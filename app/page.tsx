"use static";

import { Introduction } from "@/components/landing/hero-blurb";
import { ExperienceSection } from "@/components/landing/landing-experience";
import { SkylineHero } from "@/components/landing/skyline-hero";
import { LiquidCursor } from "@/components/ui/gsap/liquid-cursor";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jared Tucker | Full-stack Engineer & Startup Founder",
    description:
        "Portfolio website of Jared Tucker, a full-stack engineer and startup founder based in Australia.",
    openGraph: {
        locale: "en_AU",
        type: "website",
        url: "https://jtucker.io",
        title: "Jared Tucker | Full-stack Engineer & Startup Founder",
        description:
            "Portfolio website of Jared Tucker, a full-stack engineer and startup founder based in Australia.",
        siteName: "Jared Tucker",
    },
};

export default function Home() {
    return (
        <>
            <section className="w-full min-h-[95dvh] relative overflow-x-hidden z-20">
                {/* <Grid className=" opacity-30" size="md" /> */}
                <div className="absolute inset-0 h-[90dvh] bg-neutral-600"></div>
                <SkylineHero />
                <LiquidCursor size={30} />
                <div className="z-30 flex flex-col items-end justify-center h-[90dvh] space-y-4">
                    <Introduction />
                </div>
            </section>
            <ExperienceSection />
            <section className="w-full relative overflow-x-hidden min-h-screen"></section>
        </>
    );
}
