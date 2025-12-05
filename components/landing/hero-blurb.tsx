"use client";

import { customImageLoader, VisualProps } from "@/lib/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { AnimatedImage } from "../ui/animated-image";
import { Button } from "../ui/button";
import { GlassContainer } from "../ui/glass-container";
import TargetCursor from "../ui/target-cursor";
import { Tooltip } from "../ui/tooltip-card";

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
                className="space-y-4 md:space-y-6 flex mt-32 md:mt-0  flex-col w-full items-end md:max-w-2xl lg:max-w-4xl md:translate-x-4 p-2 md:p-0"
                ref={containerRef}
                data-has-target-cursor="true"
            >
                {/* Title Container */}
                <GlassContainer
                    className="p-6 md:p-10 flex flex-col items-end md:items-start"
                    surfaceClassname="rounded-lg overflow-hidden w-fit md:w-full translate-x-4 sm:pr-8 md:translate-x-0 md:pr-0"
                >
                    <h1 className="text-end md:text-start text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight sm:leading-snug lg:leading-[70px] text-neutral-100">
                        <div>
                            Hi, I'm{" "}
                            <Link
                                href={"https://www.instagram.com/dawad.t/"}
                                target="_blank"
                                className="cursor-none"
                            >
                                <span className="bg-amber-500 rounded-lg rounded-b-none md:rounded-bl-lg md:rounded-br-none text-white px-3 py-1 inline-block cursor-target">
                                    Jared.
                                </span>
                            </Link>
                        </div>
                        <div>
                            a full-stack{" "}
                            <Link
                                className="cursor-none"
                                href={"https://www.linkedin.com/in/jared-tucker-00ba74250/"}
                                target="_blank"
                            >
                                <span className="bg-red-400 rounded-lg rounded-tr-none md:rounded-tr-md rounded-b-none md:rounded-l-none text-white px-3 py-1 inline-block cursor-target">
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
                                <span className="bg-purple-300 rounded-lg rounded-tr-none md:rounded-tr-lg text-white px-3 py-1 inline-block cursor-target">
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
                </GlassContainer>

                {/* Description & CTA Container */}
                <GlassContainer
                    className=" p-6 md:p-8 lg:p-10 flex flex-col items-start w-full"
                    surfaceClassname="rounded-lg -translate-x-4 md:translate-x-0 sm:pl-8 md:pl-0 w-fit md:w-full"
                >
                    <div className="text-xs sm:text-sm md:text-base text-start text-neutral-200 font-medium max-w-full md:max-w-lg lg:max-w-2xl leading-tight italic">
                        <div>
                            Software engineer, solutions architect, start-up founder,
                            <Tooltip content={<BodybuilderTooltipContent />}>
                                <span className="italic animate-pulse mx-1 cursor-target pointer-events-auto">
                                    natural bodybuilder,
                                </span>
                            </Tooltip>
                            <Tooltip content={<MarathonTooltipContent />}>
                                <span className="italic animate-pulse mr-1 cursor-target pointer-events-auto">
                                    marathon runner,
                                </span>
                            </Tooltip>
                            cat enthusiast, side quest enjoyer.
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

                    <div className="flex flex-row justify-start flex-wrap gap-4 sm:gap-7 pt-6 cursor-pointer w-full">
                        <Link target="_blank" href={"https://github.com/Dawaad"}>
                            <Button
                                variant="outline"
                                size={"lg"}
                                className="cursor-target hover:rounded-none transition-all"
                            >
                                <FaGithub className="size-6" />
                                <span>View my Github</span>
                            </Button>
                        </Link>
                    </div>
                </GlassContainer>
            </div>
        </article>
    );
};

const BodybuilderTooltipContent = () => {
    const [hasLoaded, setReady] = useState(false);
    const IMAGE: VisualProps = {
        src: "landing-bb.webp",
        placeholder:
            "data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABVAEADASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAABQYAAwQCAQf/xAAsEAACAQQBAgUEAQUAAAAAAAABAgMABAURIRIxBhMyQVEUIkJhcRUWUpGh/8QAGQEAAwEBAQAAAAAAAAAAAAAAAgMEAAUB/8QAIREAAgICAQUBAQAAAAAAAAAAAQIAAxEhEgQiMTJBE1H/2gAMAwEAAhEDEQA/APkN44kuWYHe6oAJPFHG8N3Hls0zCOTWwvzXGDWOHINDMiFzwpbsK3MAZ/kZwJbf2ZLfFXlyOqOE6+W4qy4xF3aRCZ0DJ7sp3qiGet721ZZGkBif0lDwKFJeXIhMCu3Sx7fNOrssIDDEzKgODM5G68Aotb4KeSESyusSnt1VjubJ7eQoSGHsR700urHRiuJA3Ko26a6ZtAfJqsA1otmjWRTKvUB7VuR4kCBxGcmHw8n0txLdSEvvpQn4pbMhF0ZEJ78Uevfr8lCGii6Lcja/xQ+0xFzcq7RRMwj9RA7VHUMg5lVusYjLjvJzOOhtZ4g/OgR7VnfwlNj7uS5KeZBGdqAeaw426bESmTqO17LTths3ay2D/XECSTlQfepGL0sVHiVoEtUE+YgXt7NIjgvpQeFPesLXXXF0sNEHijmewE8dzLdWw64m+7XxSyQd896rpwwzI7QVODDdjaPdWUj2iK835Kfj9VbgsRI94ZbmLpSP8X45rFjZLqxkWXodEPZtd6KSZCfLSrBCpVR6m7E1uNjMUTeYQatQGf5MseWEeNGtsxPA3wBXOPzt1ZpKkT9KzesfNDXja1ZoZBojsPiuEFGmBsRTsTo/JsmmMzE+5rfbZSOOJUnYIY+QCO9CQatFhLexNJENiP1k+1BagbZhVOV8Rtx3iD+qo0HkEDWtqKVMvjprG8KuvrO11V9t9VhJElSYdL88UzS5G1ubRL5oEmlUck9gaQrfk2QNGUkfsuCdiBpGmt/DnTejRYgxA9xWexuFhaORW0W/5WPJ30+QcyTNvXYewrPBcCKIqfUPTV/Th6O/HmRXlbe3+Sy8Vnu26js7rxYjrtVtvEZp9dyTTHJ4dnt7FbmSMqjDgkUKJqeM2TmK7IRRHBK8s0kPmdMba6l/yrPcx6YipjJJY71RCfuNDaDwOIVRHMZjfkbKG4w7tMFBjGlCjVKdjjTedSJMyc9vanNiJcSyP62GyaRY57iG/ZISfXxqoOndsECdDqFUEGarrwzkoV6wnmJ8rQw23R1eZtWXuDTNNk7u1gVbmcfd+Cnmgd3cC7mOiFU1XXe7HukltaKO2asRaXck3VHESV55pyyuRzk2HghktNRIPt1S1BfixjMqIzEca3TDbG+kxMeRgvlkR9gwt+H6phdw3FRmLFaFcscGJl1HdSSMzwsCT21XuJV4b7boRx3Io/8A3A1tIy3Nuh/kVRJf4+6YSBfLcHegeDSXt5AqwIjkqCkFWmy6vhFYk75C0Bx0aQ20+QkYGQkiNf3UzN8rReWn5H29qtt7AXWMV7WXreMbdB3pFSADesx9r8m18gOeS4nmMkpJJNTyWHtRi1x/1DsjzxxfPXxVzYMb0l7Ax+N11RSgGjOcWJO4OkuZE3Ep0KZsXM1v4TMq6JaQ7FSpSl9oR8Rdu7l5nPVqsRQb2OD+qlShbcITiVeRsk/zWuw6oG82J2Rh8GpUpZ9cT0e04u7mSeYs52fmqQ7fJ/3UqU9dACLOzP/Z",
        alt: "Bodybuilding Stage Photo",
        offset: { x: 0, y: 0 },
    };
    return (
        <div>
            <div className="w-64 h-96 relative overflow-hidden rounded-md">
                <AnimatedImage
                    src={IMAGE.src}
                    alt={IMAGE.alt}
                    loader={customImageLoader}
                    fill
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={IMAGE.placeholder}
                    className={cn(
                        `absolute inset-0 transition-all duration-500 ${!hasLoaded && "blur-xl"}}`
                    )}
                    style={{ objectFit: "cover" }}
                    onLoad={() => setReady(true)}
                />
            </div>
            <div className="p-2 text-xl">CHEEKS FOR FREE?</div>
        </div>
    );
};
const MarathonTooltipContent = () => {
    const [hasLoaded, setReady] = useState(false);

    const IMAGE: VisualProps = {
        src: "landing-marathon.webp",
        placeholder:
            "data:image/jpeg;base64,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",
        alt: "Marathon Photo",
        offset: { x: 0, y: 0 },
    };

    return (
        <div>
            <div className="w-64 h-96 relative overflow-hidden rounded-md">
                <AnimatedImage
                    src={IMAGE.src}
                    alt={IMAGE.alt}
                    loader={customImageLoader}
                    fill
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={IMAGE.placeholder}
                    className={cn(
                        `absolute inset-0 transition-all duration-500 ${!hasLoaded && "blur-xl"}}`
                    )}
                    style={{ objectFit: "cover" }}
                    onLoad={() => setReady(true)}
                />
            </div>
            <div className="p-2 text-3xl">🏃🏻🏃🏻💨💨💨</div>
        </div>
    );
};
