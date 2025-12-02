"use client";

import { useCursor } from "@/lib/contexts/cursor-context";
import Link from "next/link";
import { Timezone } from "../landing/nav-timezone";
import TextShift from "../text-shift";
import { AnimatedThemeToggler } from "./animated-theme-toggler";
import { Grid } from "./background/grids";
import GlassSurface from "./glass-surface";

export const Navbar = () => {
    const { setLiquidCursorVisible } = useCursor();

    return (
        <header className="z-99 flex items-center justify-between py-4 fixed top-0 w-full">
            {/* Logo */}
            <div className="-translate-x-4">
                <GlassSurface
                    className="rounded-md p-0"
                    width={"100%"}
                    displace={15}
                    distortionScale={-150}
                    redOffset={5}
                    greenOffset={15}
                    blueOffset={25}
                    brightness={40}
                    backgroundOpacity={0.05}
                    opacity={0.9}
                    mixBlendMode="screen"
                >
                    <div
                        className="py-2 pr-6 pl-8"
                        onMouseEnter={() => setLiquidCursorVisible(false)}
                        onMouseLeave={() => setLiquidCursorVisible(true)}
                    >
                        <Grid className="-z-10 opacity-10" dynamic={false} size="sm" />
                        <Link href="/">
                            <TextShift
                                primaryText="jtucker.io"
                                secondaryText="jtucker.io"
                                primaryTextColor="text-white/80"
                                secondaryTextColor="text-blue-500"
                                className="lowercase italic cursor-pointer font-semibold"
                            />
                        </Link>
                    </div>
                </GlassSurface>
            </div>

            {/* Navigation */}
            <Timezone />
            <nav className="translate-x-2">
                <GlassSurface
                    className="rounded-md p-0"
                    width={"100%"}
                    displace={15}
                    distortionScale={-150}
                    redOffset={5}
                    greenOffset={15}
                    blueOffset={25}
                    brightness={40}
                    backgroundOpacity={0.05}
                    opacity={0.9}
                    mixBlendMode="screen"
                >
                    <div className="flex p-2 pr-4">
                        <AnimatedThemeToggler />
                    </div>
                </GlassSurface>
            </nav>
        </header>
    );
};
