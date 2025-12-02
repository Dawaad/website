"use client";

import { useCursor } from "@/lib/contexts/cursor-context";
import { Command, Github } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Timezone } from "../landing/nav-timezone";
import TextShift from "../text-shift";
import { AnimatedThemeToggler } from "./animated-theme-toggler";
import { Grid } from "./background/grids";
import { Button } from "./button";
import GlassSurface from "./glass-surface";
import { NavbarCommandMenu } from "./nav/nav-command-menu";

export const Navbar = () => {
    const { setLiquidCursorVisible } = useCursor();
    const [commandMenuOpen, setCommandMenuOpen] = useState(false);

    return (
        <>
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
                        <Grid className="-z-10 opacity-10" dynamic={false} size="sm" />
                        <div className="flex p-2 pr-4 items-center">
                            <Link href={"/"}>
                                <Button
                                    variant={"link"}
                                    className="cursor-pointer italic text-white/80"
                                >
                                    About
                                </Button>
                            </Link>
                            <Link href={"/"}>
                                <Button
                                    variant={"link"}
                                    className="cursor-pointer italic text-white/80"
                                >
                                    Contact
                                </Button>
                            </Link>
                            <Link href="https://github.com/Dawaad" target="_blank">
                                <Button variant={"ghost"} className="cursor-pointer">
                                    <Github />
                                </Button>
                            </Link>
                            <Button
                                variant={"ghost"}
                                onClick={() => setCommandMenuOpen(true)}
                                className="cursor-pointer"
                            >
                                <Command className="text-white/80" />
                            </Button>

                            <AnimatedThemeToggler className="text-white/80 cursor-pointer" />
                        </div>
                    </GlassSurface>
                </nav>
            </header>
            <NavbarCommandMenu open={commandMenuOpen} setOpen={setCommandMenuOpen} />
        </>
    );
};
