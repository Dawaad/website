"use client";

import { Scroll } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { EnvironmentBackground } from "../ui/background/environment-background";
import { GlassContainer } from "../ui/glass-container";
import TargetCursor from "../ui/target-cursor";

export const Contact = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
        <section className="w-full py-20 h-[80dvh] items-center  relative">
            {/* <Grid className="z-30 opacity-20" /> */}
            <EnvironmentBackground />
            <article className="w-full h-full items-end sm:items-center justify-start flex z-30">
                <TargetCursor
                    spinDuration={2}
                    hideDefaultCursor={true}
                    parallaxOn={true}
                    containerRef={containerRef}
                />
                <div
                    className="space-y-6  w-full md:max-w-2xl lg:max-w-3xl lg:-translate-x-4 z-30"
                    ref={containerRef}
                    data-has-target-cursor="true"
                >
                    <GlassContainer
                        className="rounded-none  p-10 flex flex-col items-start sm:items-end lg:items-end w-full"
                        surfaceClassname="rounded-none md:rounded-md"
                    >
                        <h1 className="text-start sm:text-end lg:text-start text-3xl sm:text-4xl lg:text-5xl font-semibold lg:leading-[70px] text-neutral-100">
                            So let's{" "}
                            <span className="bg-amber-500 rounded-lg text-white px-3 py-1 inline-block cursor-target">
                                get in touch?
                            </span>
                        </h1>
                        <div className="text-sm md:text-base text-neutral-200/50 font-medium  sm:text-end w-full leading-tight italic mt-2">
                            <div>Ill be waiting for you to reach out.</div>
                            <div>legs swinging in the air and all that cute shit</div>
                            :p
                        </div>
                        <div className="flex flex-col space-y-4 items-end w-full mt-12">
                            <Link href={"https://github.com/Dawaad"} target="_blank">
                                <h1 className="flex items-center min-w-64 sm:min-w-72 text-start sm:text-end lg:text-start text-2xl sm:text-3xl lg:text-5xl font-semibold lg:leading-[70px] text-neutral-100 rounded-lg px-3 py-1 cursor-target bg-black/30 backdrop-blur-md border-4 border-white/70">
                                    <FaGithub className="mr-4" />
                                    Dawaad
                                </h1>
                            </Link>
                            <Link
                                href={"https://www.linkedin.com/in/jared-tucker-00ba74250/"}
                                target="_blank"
                            >
                                <h1 className="flex items-center min-w-64 sm:min-w-72 text-start sm:text-end lg:text-start text-2xl sm:text-3xl lg:text-5xl font-semibold lg:leading-[70px] text-neutral-100/90 rounded-lg px-3 py-1 cursor-target bg-black/30 backdrop-blur-md border-4 border-blue-500">
                                    <FaLinkedin className="mr-5 " />
                                    Jared Tucker
                                </h1>
                            </Link>
                            <Link
                                href={"https://github.com/Dawaad/Resume/blob/main/Resume.pdf"}
                                target="_blank"
                            >
                                <h1 className="flex items-center text-start sm:text-end min-w-64 sm:min-w-72 lg:text-start text-2xl sm:text-3xl lg:text-5xl font-semibold lg:leading-[70px] text-neutral-100 rounded-lg px-3 py-1 cursor-target bg-black/30 backdrop-blur-md border-4 border-purple-300">
                                    <Scroll className="size-8 lg:size-12 mr-4" />
                                    Resume
                                </h1>
                            </Link>
                        </div>
                    </GlassContainer>
                </div>
            </article>
        </section>
    );
};
