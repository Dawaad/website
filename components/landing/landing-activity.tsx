"use client";

import { GitHubCalendar } from "react-github-calendar";
import { Grid } from "../ui/background/grids";
import { RoomBackground } from "../ui/background/room-background";
import { GlassContainer } from "../ui/glass-container";

export const Activity = () => {
    return (
        <section className="w-full py-32 h-full min-h-[80dvh] items-center relative">
            <Grid className="opacity-40" />
            <RoomBackground />
            <section className="mt-40 flex flex-col 2xl:flex-row-reverse">
                <article className="flex w-full justify-end">
                    <div className="translate-x-4 z-30 space-y-6  w-full md:w-auto md:max-w-4xl mb-6 2xl:mb-12 ">
                        <GlassContainer className="w-full gap-3 ml-4 px-4 md:p-8 py-6 md:py-12 flex flex-col items-start justify-start pr-16">
                            <h1 className="text-4xl sm:text-5xl font-semibold leading-[60px] text-neutral-100">
                                <div>
                                    <span className="bg-red-400 rounded-lg rounded-b-none text-white px-3 py-1 inline-block cursor-target italic">
                                        Peep
                                    </span>{" "}
                                    my
                                </div>
                                <div></div>
                                <div>
                                    <span className="bg-purple-300 rounded-lg rounded-tl-none  text-white px-3 py-1 inline-block cursor-target">
                                        Github Activity
                                    </span>
                                </div>
                            </h1>
                            <div className="text-sm md:text-base text-neutral-200 font-medium max-w-md md:max-w-2xl leading-tight italic mt-2">
                                Watch me code!
                                <span className="text-white/60 text-xs">
                                    {" "}
                                    (just not from my room, please)
                                </span>
                            </div>
                        </GlassContainer>
                    </div>
                </article>
                <article className="z-20">
                    <div className="-translate-x-4 z-30 w-fit mb-12">
                        <GlassContainer className="p-10 lg:p-14 w-full max-w-lg md:max-w-[50rem] lg:max-w-none">
                            <GitHubCalendar
                                username="Dawaad"
                                colorScheme="light"
                                blockMargin={2}
                                theme={{
                                    light: [
                                        "hsl(0, 0%, 92%, 0.3)",
                                        "#c4edde",
                                        "#7ac7c4",
                                        "#f73859",
                                        "#384259",
                                    ],
                                }}
                            />
                        </GlassContainer>
                    </div>
                </article>
            </section>
        </section>
    );
};
