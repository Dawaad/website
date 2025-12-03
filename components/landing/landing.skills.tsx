"use client";
import { DisplayCard, DisplayStack } from "../ui/display-cards";
import { GlassContainer } from "../ui/glass-container";

export const Skills = () => {
    return (
        <section className="w-full relative overflow-x-hidden z-20 pt-24 flex flex-col gap-y-12 lg:flex-row h-full min-h-[80dvh] overflow-hidden">
            <div className="-translate-x-4 z-30 space-y-6 w-fit lg:w-full max-w-3xl mb-6 2xl:mb-12">
                <GlassContainer className="w-full gap-3 ml-4 p-8 py-12 flex flex-col items-start justify-start">
                    <h1 className="text-3xl sm:text-4xl  font-semibold leading-12 md:leading-[60px] text-neutral-100">
                        <div>
                            So what are my{" "}
                            <span className="bg-red-400 rounded-lg text-white px-3 py-1 inline-block cursor-target italic">
                                specialities?
                            </span>
                        </div>
                    </h1>
                    <div className="text-sm sm:text-base text-neutral-200 font-medium max-w-2xl leading-tight italic mt-2">
                        Besides
                        <span className="font-semibold"> doomscrolling </span>
                        and
                        <span className="font-semibold"> brainrotting </span>
                    </div>
                </GlassContainer>
            </div>
            <article className="w-full justify-center items-start hidden sm:flex">
                <DisplayStack className="group">
                    <DisplayCard className=" hover:-translate-y-20 hover:-translate-x-8">
                        Lowkey into Languages
                    </DisplayCard>
                    <DisplayCard className="translate-x-16 translate-y-12 hover:-translate-y-1 hover:translate-x-12">
                        <div>Intimately into Infrastructure</div>
                        <section>
                        
                        </section>
                    </DisplayCard>
                    <DisplayCard className="translate-x-32 translate-y-24 hover:translate-y-20">
                        <div className="flex border-b ">Baller in the Backend</div>
                    </DisplayCard>
                    <DisplayCard className="translate-x-48 translate-y-36 hover:translate-y-40 hover:translate-x-28">
                        <div className="flex border-b py-2">Freaky in the Frontend</div>
                    </DisplayCard>
                </DisplayStack>
            </article>
        </section>
    );
};
