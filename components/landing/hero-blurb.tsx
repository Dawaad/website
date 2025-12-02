"use client";

import { Github, User } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Grid } from "../ui/background/grids";
import { Button } from "../ui/button";
import GlassSurface from "../ui/glass-surface";
import TargetCursor from "../ui/target-cursor";

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
                    <Grid className="-z-10 opacity-10" dynamic={false} size="sm" />
                    <div className="gap-3 p-8 md:p-12 flex flex-col items-start ">
                        <h1 className="text-6xl font-semibold leading-[70px] text-neutral-100">
                            <div>
                                Hi, I'm{" "}
                                <Link
                                    href={"https://www.instagram.com/dawad.t/"}
                                    target="_blank"
                                    className="cursor-none"
                                >
                                    <span className="bg-amber-500 rounded-lg rounded-br-none text-white px-3 py-1 inline-block cursor-target">
                                        Jared.
                                    </span>
                                </Link>
                            </div>
                            <div>
                                A Full-stack{" "}
                                <Link
                                    className="cursor-none"
                                    href={"https://www.linkedin.com/in/jared-tucker-00ba74250/"}
                                    target="_blank"
                                >
                                    <span className="bg-red-400 rounded-lg rounded-l-none text-white px-3 py-1 inline-block cursor-target">
                                        Engineer
                                    </span>{" "}
                                </Link>
                            </div>
                            <div>
                                And{" "}
                                <Link
                                    href={"https://github.com/rmr-studio/riven"}
                                    target="_blank"
                                    className="cursor-none"
                                >
                                    <span className="bg-purple-300 rounded-lg rounded-tr-none text-white px-3 py-1 inline-block cursor-target">
                                        Startup Founder{" "}
                                    </span>{" "}
                                </Link>
                            </div>
                            from{" "}
                            <span className="bg-blue-400 rounded-lg rounded-t-none text-white px-3 py-1 inline-block cursor-target">
                                Australia.
                            </span>
                        </h1>

                        <p className="text-neutral-200 font-medium max-w-2xl leading-tight italic mt-2">
                            <div>
                                Software engineer, solutions Architect, start-up founder, natural
                                bodybuilder, marathon runner, cat enthusiast, side quest enjoyer.
                            </div>

                            <div className="mt-2">
                                I work on, and take <span className="font-semibold">immense</span>{" "}
                                amounts of pride from building performative, scalable enterprise
                                level web-based applications.
                            </div>
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
