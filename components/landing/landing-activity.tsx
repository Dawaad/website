"use client";

import { GitHubCalendar } from "react-github-calendar";
import { GlassContainer } from "../ui/glass-container";

export const Activity = () => {
    return (
        <section className="w-full flex flex-col md:flex-row-reverse py-20 items-center">
            <article className="flex w-full justify-end">
                <div className="translate-x-4 z-30 space-y-6 min-w-xl max-w-4xl mt-40 mb-12">
                    <GlassContainer className="w-full gap-3 ml-4 p-8 py-12 flex flex-col items-start justify-start">
                        <h1 className="text-5xl font-semibold leading-[60px] text-neutral-100">
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
                        <div className="text-neutral-200 font-medium max-w-2xl leading-tight italic mt-2">
                            Watch me code!
                            <span className="text-primary/60 text-xs">
                                {" "}
                                (just not from my room, please)
                            </span>
                        </div>
                    </GlassContainer>
                </div>
            </article>
            <article className="p-20">
                <GitHubCalendar username="Dawaad" />
            </article>
        </section>
    );
};
