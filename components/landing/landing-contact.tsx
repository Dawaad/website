"use client";

import { CURSOR_HANDLER, useCursor } from "@/lib/contexts/cursor-context";
import { Mail, Scroll, User } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { EnvironmentBackground } from "../ui/background/environment-background";
import { Button } from "../ui/button";
import { GlassContainer } from "../ui/glass-container";

export const Contact = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { setLiquidCursorVisible } = useCursor();
    const CURSOR_ATTRIBUTES = CURSOR_HANDLER(setLiquidCursorVisible);

    return (
        <section className="w-full  items-center relative py-20 ">
            <EnvironmentBackground />
            <div
                className="w-full max-w-6xl mx-auto px-4 space-y-6 md:space-y-12 flex flex-col py-8"
                ref={containerRef}
                data-has-target-cursor="true"
            >
                {/* Header */}
                <div className="text-center space-y-2 z-50">
                    <h1 className="text-4xl md:text-6xl font-semibold text-primary">Contact</h1>
                    <p className="text-neutral-200/70 text-lg">
                        Let's connect and build something amazing together.
                    </p>
                </div>

                {/* Main Card */}
                <GlassContainer
                    className="p-6 md:p-12 w-full z-40"
                    surfaceClassname="rounded-lg"
                    {...CURSOR_ATTRIBUTES}
                >
                    <div className="flex flex-col space-y-6">
                        <div className="flex md:items-center space-x-4 flex-col md:flex-row">
                            <div className="p-3 bg-white/10 rounded-lg w-fit mb-4 md:mb-0">
                                <User className="size-6 md:size-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-semibold text-neutral-100">
                                    Let's work together
                                </h2>
                            </div>
                        </div>
                        <p className="text-neutral-200/60 italic text-sm md:text-base">
                            Available for discussions, employment opportunities, and collaborations.
                            Let's create something extraordinary together.
                        </p>
                        <Link href="mailto:jntucker02@gmail.com">
                            <Button variant={"outline"} className="cursor-pointer">
                                <Mail className="size-5" />
                                <span>Send a message</span>
                            </Button>
                        </Link>
                    </div>
                </GlassContainer>

                {/* Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* GitHub Card */}
                    <Link href="https://github.com/Dawaad" target="_blank">
                        <GlassContainer
                            className="p-6 md:p-8 h-full hover:scale-105 transition-transform cursor-target w-full"
                            surfaceClassname="rounded-lg"
                            {...CURSOR_ATTRIBUTES}
                        >
                            <div className="flex flex-col space-y-4">
                                <div className="p-3 bg-white/10 rounded-lg w-fit">
                                    <FaGithub className="size-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-neutral-100">
                                        GitHub Profile
                                    </h3>
                                    <p className="text-neutral-200/70 text-sm mt-2">
                                        Check out my projects and contributions on GitHub.
                                    </p>
                                </div>
                                <div className="text-white/50 text-sm font-medium">@Dawaad →</div>
                            </div>
                        </GlassContainer>
                    </Link>

                    {/* LinkedIn Card */}
                    <Link
                        href="https://www.linkedin.com/in/jared-tucker-00ba74250/"
                        target="_blank"
                    >
                        <GlassContainer
                            className="p-6 md:p-8 h-full hover:scale-105 transition-transform cursor-target w-full"
                            surfaceClassname="rounded-lg"
                            {...CURSOR_ATTRIBUTES}
                        >
                            <div className="flex flex-col space-y-4">
                                <div className="p-3 bg-blue-500/20 rounded-lg w-fit">
                                    <FaLinkedin className="size-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-neutral-100">
                                        LinkedIn
                                    </h3>
                                    <p className="text-neutral-200/70 text-sm mt-2">
                                        Connect with me professionally and see my experience.
                                    </p>
                                </div>
                                <div className="text-white/50 text-sm font-medium">
                                    Jared Tucker →
                                </div>
                            </div>
                        </GlassContainer>
                    </Link>

                    {/* Resume Card */}
                    <Link
                        href="https://github.com/Dawaad/Resume/blob/main/Resume.pdf"
                        target="_blank"
                    >
                        <GlassContainer
                            {...CURSOR_ATTRIBUTES}
                            className="p-6 md:p-8 h-full hover:scale-105 transition-transform cursor-target w-full"
                            surfaceClassname="rounded-lg"
                        >
                            <div className="flex flex-col space-y-4">
                                <div className="p-3 bg-purple-500/20 rounded-lg w-fit">
                                    <Scroll className="size-6 text-purple-300" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-neutral-100">
                                        Resume
                                    </h3>
                                    <p className="text-neutral-200/70 text-sm mt-2">
                                        Download my resume and view my full work history.
                                    </p>
                                </div>
                                <div className="text-white/50 text-sm font-medium">View PDF →</div>
                            </div>
                        </GlassContainer>
                    </Link>
                </div>
            </div>
        </section>
    );
};
