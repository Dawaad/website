"use client";

import { Github, User } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import GlassSurface from "../GlassSurface";
import TargetCursor from "../TargetCursor";
import { Button } from "../ui/button";
import { BGPattern } from "../ui/grids";

export const Introduction = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <article className="w-full items-center justify-end flex z-30  ">
            <TargetCursor
                spinDuration={2}
                hideDefaultCursor={true}
                parallaxOn={true}
                containerRef={containerRef}
            />
            <div
                className="space-y-6 min-w-4xl max-w-5xl translate-x-4"
                ref={containerRef}
                data-has-target-cursor="true"
            >
                <GlassSurface
                    width={"100%"}
                    height={"auto"}
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
                    <BGPattern
                        variant="grid"
                        mask="fade-edges"
                        className="opacity-20"
                        fill="white"
                    />
                    <div className="gap-6 p-8 md:p-12 flex flex-col items-start ">
                        <h1 className="text-[36px] leading-[50px] md:text-[64px] font-bold md:leading-[70px] text-neutral-100">
                            <div>
                                Hi, I'm{" "}
                                <span className="bg-amber-500 rounded-lg rounded-br-none text-white px-3 py-1 inline-block cursor-target">
                                    Jared.
                                </span>
                            </div>
                            <div>
                                A Full-stack{" "}
                                <span className="bg-red-400 rounded-lg rounded-l-none text-white px-3 py-1 inline-block cursor-target">
                                    Engineer
                                </span>{" "}
                            </div>
                            <div>
                                And{" "}
                                <span className="bg-purple-300 rounded-lg rounded-tr-none text-white px-3 py-1 inline-block cursor-target">
                                    Startup Founder{" "}
                                </span>{" "}
                            </div>
                            from{" "}
                            <span className="bg-blue-400 rounded-lg rounded-t-none text-white px-3 py-1 inline-block cursor-target">
                                Australia.
                            </span>
                        </h1>

                        <p className="text-neutral-200 text-[16px] md:text-[18px] font-medium leading-[28px] md:leading-[30px] max-w-xl">
                            Software Engineer at Leidos, working on building performative, scalable
                            enterprise web applications, specializing in React
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-7 pt-4 cursor-pointer">
                            <Button
                                size={"lg"}
                                className="cursor-target hover:rounded-none transition-all"
                            >
                                <User className="size-6" />
                                Learn More
                            </Button>
                            <Link target="_blank" href={"https://github.com/Dawaad"}>
                                <Button
                                    variant="outline"
                                    size={"lg"}
                                    className="cursor-target hover:rounded-none transition-all"
                                >
                                    <Github className="size-6" />
                                    View Github
                                </Button>
                            </Link>
                        </div>
                    </div>
                </GlassSurface>
            </div>
        </article>
    );
};
