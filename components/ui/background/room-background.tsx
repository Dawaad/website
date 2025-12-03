"use client";

import { customImageLoader, VisualProps } from "@/lib/image";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const IMAGE: VisualProps = {
    src: "landing-desk-secondary.webp",
    alt: "A modern workspace with a desk, computer, and ambient lighting",
    placeholder:
        "data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAVAEADASIAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAAAAUCBAEDBgf/xAAmEAACAgIBAgUFAAAAAAAAAAABAgADBBESITEFIkFRYRMVUpGh/8QAGAEAAwEBAAAAAAAAAAAAAAAAAgMEAAH/xAAdEQEAAgIDAQEAAAAAAAAAAAABAAIDERMUITES/9oADAMBAAIRAxEAPwDzNDYvEhtA+0L962TsyytaWptdDXpL2J4ZS9ZtyXKoO3zNa5X1lGOn68rOeatePXfUzBTjYut7Mb5GJUzEoToHyibsTwqq/LXzniBsmHzAbYPCttEUAEEHcmxZeuu86r7Jhfmf1NOV4ThVUliWb4k/aovyUdW9Te4gNbrQLOQ4ntI6LjmB0HeXGVHArCkAdhNVlYSvX8ji6xDjNzOLsN0MvnLuuUVMQFHbQhCcsEOj9ksKsXWhW9TqPK8eqglUXXzCEmzLvUbjPIXWfSqZgN6izJyXdVDa1CELFUTbAy2SwEVV5HDMDBAfTRkMzraSOg9oQlABFNlZ/9k=",
    offset: { x: 0, y: 0 },
};

export const RoomBackground = () => {
    const [hasLoaded, setReady] = useState(false);
    return (
        <article className="absolute w-full h-auto overflow-hidden">
            <section className="relative mt-0.5 flex flex-col space-y-0.5 ">
                <div className="h-0.5 shadow w-full bg-primary/5" />
                <div className="h-1 shadow w-full bg-primary/5" />
                <div className="h-2 shadow w-full bg-primary/10" />
                <div className="h-2 shadow w-full bg-primary/20" />
                <div className="h-3 shadow w-full bg-primary/30" />
                <div className="h-3 shadow w-full bg-primary/40" />
            </section>
            <section className="relative w-full min-h-[50dvh] overflow-hidden z-0">
                <div className=""></div>
                <div
                    className="absolute inset-0"
                    style={{
                        transform: `${IMAGE.offset?.x || 0}px)) translateY(${
                            IMAGE.offset?.y || 0
                        }px)`,
                    }}
                >
                    <Image
                        src={IMAGE.src}
                        alt={IMAGE.alt}
                        loader={customImageLoader}
                        fill
                        priority={true}
                        // loading="lazy"
                        placeholder="blur"
                        blurDataURL={IMAGE.placeholder}
                        className={cn(
                            `absolute inset-0 transition-all duration-500 ${
                                !hasLoaded && "blur-xl"
                            }}`
                        )}
                        style={{ objectFit: "cover" }}
                        onLoad={() => setReady(true)}
                    />
                </div>
            </section>
            <section className="relative mt-0.5 flex flex-col space-y-0.5 ">
                <div className="h-3 shadow w-full bg-primary/40" />
                <div className="h-3 shadow w-full bg-primary/30" />
                <div className="h-2 shadow w-full bg-primary/20" />
                <div className="h-2 shadow w-full bg-primary/10" />
                <div className="h-1 shadow w-full bg-primary/5" />
                <div className="h-0.5 shadow w-full bg-primary/5" />
            </section>
        </article>
    );
};
