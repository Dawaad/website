"use client";

import { Github } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "../ui/button";
import { GlassContainer } from "../ui/glass-container";
import TargetCursor from "../ui/target-cursor";

export const Introduction = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <article className="w-full items-center justify-end flex z-30">
            <TargetCursor
                spinDuration={2}
                hideDefaultCursor={true}
                parallaxOn={true}
                containerRef={containerRef}
            />
            <div
                className="space-y-6  w-full md:max-w-2xl lg:max-w-4xl lg:translate-x-4"
                ref={containerRef}
                data-has-target-cursor="true"
            >
                <GlassContainer
                    className="rounded-none gap-3 p-10 flex flex-col items-start sm:items-end lg:items-start w-full"
                    surfaceClassname="rounded-none md:rounded-md"
                >
                    <h1 className="text-start sm:text-end lg:text-start text-2xl sm:text-5xl lg:text-6xl font-semibold lg:leading-[70px] text-neutral-100">
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
                            a Full-stack{" "}
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
                            and{" "}
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
                        <div className="hidden sm:block">
                            from{" "}
                            <span className="bg-blue-400 rounded-lg rounded-t-none text-white px-3 py-1 inline-block cursor-target">
                                Australia.
                            </span>
                        </div>
                    </h1>

                    <div className="text-xs sm:text-sm md:text-base text-start sm:text-end lg:text-start text-neutral-200 font-medium  max-w-sm sm:max-w-lg lg:max-w-2xl leading-tight italic mt-2">
                        <div>
                            Software engineer, solutions architect, start-up founder, natural
                            bodybuilder, marathon runner, cat enthusiast, side quest enjoyer.
                        </div>
                        <div className="mt-2">
                            {" "}
                            Im everything you want me to be{" "}
                            <span className="text-white/60">(and more bby grill).</span>
                        </div>

                        <div className="mt-2">
                            I take great joy in building performative, scalable enterprise-level
                            web-based applications.
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap gap-4 sm:gap-7 pt-4 cursor-pointer">
                        <Link target="_blank" href={"https://github.com/Dawaad"}>
                            <Button
                                variant="outline"
                                size={"lg"}
                                className="cursor-target hover:rounded-none transition-all"
                            >
                                <Github className="size-6" />
                                <span className="hidden sm:block">View Github</span>
                            </Button>
                        </Link>
                    </div>
                </GlassContainer>
            </div>
        </article>
    );
};
