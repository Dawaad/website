"use client";

import dynamic from "next/dynamic";

// Load SkylineHero client-side only to avoid hydration mismatch with time-based phase detection
const SkylineHero = dynamic(
    () => import("@/components/landing/skyline-hero").then((mod) => ({ default: mod.SkylineHero })),
    { ssr: false }
);

export default function Home() {
    return (
        <div className="w-full min-h-screen relative bg-page-background overflow-x-hidden flex flex-col justify-start items-center">
            <SkylineHero />
        </div>
    );
}
