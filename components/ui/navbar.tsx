"use client";

import { CURSOR_HANDLER, useCursor } from "@/lib/contexts/cursor-context";
import { Command, Github } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Timezone } from "../landing/nav-timezone";
import TextShift from "../text-shift";
import { Button } from "./button";
import { GlassContainer } from "./glass-container";
import { NavbarCommandMenu } from "./nav/nav-command-menu";
import { ModeToggle } from "./theme-toggle";

export const Navbar = () => {
    const { setLiquidCursorVisible } = useCursor();
    const [commandMenuOpen, setCommandMenuOpen] = useState(false);
    const CURSOR_ATTRIBUTES = CURSOR_HANDLER(setLiquidCursorVisible);

    return (
        <>
            <header className="z-99 flex items-center justify-between py-4 fixed top-0 w-full">
                {/* Logo */}
                <div className="-translate-x-4">
                    <GlassContainer className="py-2 pr-6 pl-8" {...CURSOR_ATTRIBUTES}>
                        <Link href="/">
                            <TextShift
                                primaryText="jtucker.io"
                                secondaryText="jtucker.io"
                                primaryTextColor="text-white/80"
                                secondaryTextColor="text-blue-500"
                                className="lowercase italic cursor-pointer font-semibold"
                            />
                        </Link>
                    </GlassContainer>
                </div>

                <Timezone {...CURSOR_ATTRIBUTES} />

                <nav className="translate-x-2">
                    <GlassContainer
                        className="flex p-1 pr-4 flex-row items-center"
                        {...CURSOR_ATTRIBUTES}
                    >
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
                        <Link href={"/"}>
                            <Button
                                variant={"link"}
                                className="cursor-pointer italic text-white/80 rounded-none hover:bg-neutral-700/50"
                            >
                                Blog
                            </Button>
                        </Link>
                        <Link href="https://github.com/Dawaad" target="_blank">
                            <Button variant={"ghost"} className="cursor-pointer text-white/80">
                                <Github className="" />
                            </Button>
                        </Link>
                        <Button
                            variant={"ghost"}
                            onClick={() => setCommandMenuOpen(true)}
                            className="cursor-pointer text-white/80"
                        >
                            <Command className="" />
                        </Button>

                        <ModeToggle />
                    </GlassContainer>
                </nav>
            </header>
            <NavbarCommandMenu open={commandMenuOpen} setOpen={setCommandMenuOpen} />
        </>
    );
};
