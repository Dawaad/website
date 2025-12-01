"use client";

import { customImageLoader } from "@/lib/image";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type PhaseKey = "sunrise" | "day" | "sunset" | "night";
interface SkylineImage {
    key: PhaseKey;
    src: string;
    alt: string;
    placeholder: string;
}

// Helper to get initial phase (can be used in SSR/client)
function getInitialPhase(): number {
    if (typeof window === "undefined") return 0; // SSR fallback to sunrise
    return phaseIndexForDate(new Date());
}

const SKYLINE_IMAGES: SkylineImage[] = [
    {
        key: "sunrise",
        src: "landing-sunrise.webp",
        alt: "Home office setup with city skyline at sunrise",
        placeholder:
            "data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAASACADASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAAAAECBAUGB//EACUQAAIBBAIABgMAAAAAAAAAAAECAwAEERIFIQYTFCIxUUFhcf/EABcBAQEBAQAAAAAAAAAAAAAAAAEEAgP/xAAcEQADAAMAAwAAAAAAAAAAAAAAAQIDITERQVH/2gAMAwEAAhEDEQA/AG+HVtU41jIFaQnpTWl4zi7S8gJjVGK/Nc6tL4xtqna64yKS35+7tb6T0c8iAJqRno1xrFVt+GVRnUStG1uVsrSCUaqH2IU4/NUfNTWlxxsYh1Mij34+6rRPJPYmWWdvMJzg1FS4g0dTIdiO61EKX3aC8zpc0ynZ2W3BDEH9GoCu4YkO2SfuiiqY4yT4TIpH0I3bH9pGJ1PZooon2GTiP//Z",
    },
    {
        key: "day",
        src: "landing-day.webp",
        alt: "Home office setup with city skyline during the day",
        placeholder:
            "data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAASACADASIAAhEBAxEB/8QAGgAAAgIDAAAAAAAAAAAAAAAAAAQFBgIDB//EACMQAAIBBAEFAAMAAAAAAAAAAAECAwAEERIFBhMhQVEiMXH/xAAXAQADAQAAAAAAAAAAAAAAAAAAAQME/8QAGREAAwEBAQAAAAAAAAAAAAAAAQIDADFB/9oADAMBAAIRAxEAPwDZ0jFbDh5O4qM7t4z+xVp4zhrO+txrHHlM5I91zjjOTNsvbXyuuMisIep7215GQ2M8iAJqRnwavKgCgDQvEvRmPNe54LC3gkDxoGDEKRVd6mNpLxSdjUuh/LHqkI76S448zTXDd0tnX1SUl7byQSIZDsw8/KdKqUK5QgyVDnQbuy2ilWIP0GoxZHDEh2BJ+0UVFOHbD5nI5ZNCN2x/aHY6HyaKKF9xTg3/2Q==",
    },
    {
        key: "sunset",
        src: "landing-sunset.webp",
        alt: "Home office setup with city skyline at sunset",
        placeholder:
            "data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAASACADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAIEBQb/xAAjEAACAgICAgEFAAAAAAAAAAABAgADBBESIQUTYSIxMlGR/8QAGQEAAgMBAAAAAAAAAAAAAAAAAgMAAQQF/8QAHhEAAgICAgMAAAAAAAAAAAAAAQIAEQNBBCEiMVH/2gAMAwEAAhEDEQA/AOU8LXjrgln0bCelm/4/xVGXUTWFYr95x+Ldx6Xv6dbEfG8tkY2W641rqAvE99RDJkYeDUZ1k5KIO1ub2VXjY1NgAHLZAPzMjyj492BX69GxRt9RCGvw2te5i5P4mSBqRW49h5EdwwKFE2RAfOG1QMiZmWgEMQfgyIOwYkMd7/cIRq7mD5KUsfgRzb+xdnie4QkXcvJ6E//Z",
    },
    {
        key: "night",
        src: "landing-night.webp",
        alt: "Home office setup with city skyline at night",
        placeholder:
            "data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAASACADASIAAhEBAxEB/8QAGgAAAgIDAAAAAAAAAAAAAAAAAAQBAgMFB//EACIQAAICAQMEAwAAAAAAAAAAAAECAAMRBCExEhMiUWFxkf/EABYBAQEBAAAAAAAAAAAAAAAAAAACA//EABwRAAICAwEBAAAAAAAAAAAAAAABAhEDIUExUf/aAAwDAQACEQMRAD8A5lVWppGTv6jCaZbUAUbjkyKa1cADkDGRIpYV6l0VicDGZvDLuinHVlHoVc+5Rq17RxuRzNimhrt0j39wiwHZYsFoCtmzzxgiZvNbaRax0k30WLMtIKkg/BigdgzEMc/cIRHpPwzJZZ0kdbfsqScHeEIj0T8R/9k=",
    },
];

// Tunables
const FULL_CYCLE_MS = 3 * 60 * 1000; // 3 min loop for all 4 phases
const CROSSFADE_MS = 3000; // crossfade duration between phases

// --- Utilities --------------------------------------------------------------

function phaseIndexForDate(d: Date): number {
    const m = d.getHours() * 60 + d.getMinutes();
    if (m >= 5 * 60 && m < 9 * 60) return 0; // sunrise 05:00–08:59
    if (m >= 9 * 60 && m < 17 * 60) return 1; // day     09:00–16:59
    if (m >= 17 * 60 && m < 20 * 60) return 2; // sunset  17:00–19:59
    return 3; // night   20:00–04:59
}

function useReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handler = () => setReduced(mq.matches);
        handler();
        mq.addEventListener?.("change", handler);
        return () => mq.removeEventListener?.("change", handler);
    }, []);
    return reduced;
}

// Preload an image in the background (helps avoid crossfade popping)
function preload(src: string) {
    const img = new window.Image();
    img.decoding = "async";
    img.src = `https://cdn.jtucker.io/${src}`; // Match customImageLoader CDN path
}

// Compute per-phase opacities given a fractional segment position [0..4)
function opacitiesForSegment(seg: number, count = SKYLINE_IMAGES.length) {
    const values = new Array(count).fill(0);
    const current = Math.floor(seg) % count;
    const next = (current + 1) % count;
    const intra = seg - Math.floor(seg);
    values[current] = 1 - intra;
    values[next] = intra;
    return values;
}

// --- Component --------------------------------------------------------------

export function SkylineHero() {
    const reducedMotion = useReducedMotion();
    const initialPhase = useMemo(() => getInitialPhase(), []);

    const [mode, setMode] = useState<"boot" | "cycle">("boot");
    const [segment, setSegment] = useState(initialPhase); // Start at correct phase
    const [ready, setReady] = useState(false);

    const rafRef = useRef<number | null>(null);

    // Start the cycle immediately after mount
    useEffect(() => {
        // Preload all images in background
        SKYLINE_IMAGES.forEach((img) => preload(img.src));

        // Start cycle mode immediately (segment already initialized to correct phase)
        setMode("cycle");
    }, []);

    // Continuous loop after initial fade
    useEffect(() => {
        if (mode !== "cycle") return;

        // Offset the loop so we begin in the correct phase segment
        const now = new Date();
        const phase = phaseIndexForDate(now);

        // Intra-phase fraction — coarse but good enough for visual alignment
        const minutes = now.getHours() * 60 + now.getMinutes();
        const phaseStartMin =
            phase === 0 ? 5 * 60 : phase === 1 ? 9 * 60 : phase === 2 ? 17 * 60 : 20 * 60;
        const phaseEndMin =
            phase === 0 ? 9 * 60 : phase === 1 ? 17 * 60 : phase === 2 ? 20 * 60 : 29 * 60; // night wraps
        const span = phaseEndMin + (phase === 3 ? 24 * 60 : 0) - phaseStartMin; // handle wrap for night
        const intraPhase = Math.max(
            0,
            Math.min(1, (minutes + (phase === 3 ? 24 * 60 : 0) - phaseStartMin) / span)
        );

        const initialSeg = phase + intraPhase; // e.g., 1.42 for "day"
        const t0 = performance.now();

        const loop = (t: number) => {
            const elapsed = t - t0;
            const seg =
                (initialSeg + (elapsed / FULL_CYCLE_MS) * SKYLINE_IMAGES.length) %
                SKYLINE_IMAGES.length;
            setSegment(seg);
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [mode]);

    // Preload the two most likely images for next transition to avoid pop
    useEffect(() => {
        const count = SKYLINE_IMAGES.length;
        const current = Math.floor(segment) % count;
        const next = (current + 1) % count;
        preload(SKYLINE_IMAGES[current].src);
        preload(SKYLINE_IMAGES[next].src);
    }, [segment]);

    // Compute opacities: crossfade current -> next based on `segment`
    const opacities = useMemo(() => {
        if (mode === "boot") {
            // Show only the initial phase while booting
            const v = new Array(SKYLINE_IMAGES.length).fill(0);
            v[initialPhase] = 1;
            return v;
        }
        // cycle mode: smooth crossfade between phases
        return opacitiesForSegment(segment);
    }, [mode, segment, initialPhase]);

    // Mark ready once first frame paints (avoids gradient flashing)
    useEffect(() => {
        const id = requestAnimationFrame(() => setReady(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <article className="absolute w-full h-dvh min-h-[800px] overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-xs w-full h-full z-10" />
            <section
                className="relative w-full h-dvh min-h-[800px] overflow-hidden z-0"
                data-phase={mode}
            >
                {SKYLINE_IMAGES.map((image, index) => {
                    const isInitialPhase = index === initialPhase;

                    return (
                        <div
                            key={image.key}
                            className="absolute inset-0 will-change-opacity transition-opacity ease-linear"
                            style={{
                                opacity: opacities[index],
                                transitionDuration: `${reducedMotion ? 0 : CROSSFADE_MS}ms`,
                                pointerEvents: "none",
                            }}
                            aria-hidden={opacities[index] < 0.01}
                            suppressHydrationWarning
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                loader={customImageLoader}
                                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                fill
                                priority={isInitialPhase} // Prioritize initial phase based on time
                                loading={isInitialPhase ? "eager" : "lazy"}
                                placeholder="blur"
                                blurDataURL={image.placeholder}
                                className="absolute inset-0"
                                style={{ objectFit: "cover" }}
                                onLoad={isInitialPhase ? () => setReady(true) : undefined}
                            />
                        </div>
                    );
                })}

                {/* Gentle vignette/grade; tweak per your brand */}
                <div
                    className={[
                        "absolute opacity-100 inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60 pointer-events-none",
                        ready && " transition-opacity duration-300",
                    ].join(" ")}
                />
            </section>
        </article>
    );
}
