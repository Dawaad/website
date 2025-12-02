"use client";

import { customImageLoader, VisualProps } from "@/lib/image";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";

type PhaseKey = "sunrise" | "day" | "sunset" | "night";
interface SkylineImage extends VisualProps {
    key: PhaseKey;
}

const SKYLINE_IMAGES: SkylineImage[] = [
    {
        key: "sunrise",
        src: "landing-sunrise.webp",
        alt: "Home office setup with city skyline at sunrise",
        placeholder:
            "data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAkAEADASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAAMEBQYCAf/EACkQAAICAgICAQMDBQAAAAAAAAECAwQAEQUSITFBBhMiFVFhFCNxgZH/xAAWAQEBAQAAAAAAAAAAAAAAAAACAwT/xAAfEQACAgMAAgMAAAAAAAAAAAABAgADESExBBITIkH/2gAMAwEAAhEDEQA/AKHh6wmtwLrYLes2p4WmmjJBGOx0Nj3mT+nZoq9yOWZgqp52c1M98XjWfsNCQ+v2yN5cvrk2+N6KmxkxNPhoHabVVGCyEesmfoVMDzXjH+s743kYxbkgiIbcv5HNQlGOWH7qkFcxtbYDNINYGSJiY+FrfqMyGBOqqDrWdXOOpVarzNVXx68ZMsWOvIzvXbQBVTlZyvKLI9ioz77Edf4yyF2IgZkUHUfQ46lcqCcVkHwfHzmQ5isIrky60A3gZe1vqGGrQaidodn88peWPdu5bZYb3mioOtm+TNeUevXRI8TiKsuxrZy1guItYom++tg5nZrIkrLGF/MN7HxkyNbKKiQxs7a7dgcTZzIqxB1yPsW7lPiZpqknSbv7+cuOM+ub1ThxVskyTeyw/bMdy9uSe4y+UCjXX+cZWSw1UP8Ab7MP5+Mp8VZANkL3WbWv8lynMWrFmRombvJ7AxduexFN/cXU3sk4nhnkgnMzR+D48/GSuSnaz+TwkMD42fjAzKtnqo1Egdq8v2QWWaxGdDbA7IyTcLvWHdNaGQV5L+lZ+kI23ggnGNyLNWAdNbPgbxEk41ACBkZlTWlc7JOE080Mh+3M6/4OGGLH2k1OpWyTSMzMzksT7OdranMgX7rAa1oHDDNBAgBMkpPMCNSv/wBxzWZnOmkY+Pk4YZFgMyqk4iy7AA7855LK5YecMMoZAz//2Q==",
        offset: { x: 0, y: 0 },
    },
    {
        key: "day",
        src: "landing-day.webp",
        alt: "Home office setup with city skyline during the day",
        placeholder:
            "data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAkAEADASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAYDBAUCAQf/xAApEAACAgIBBAEEAQUAAAAAAAABAgMEABEFEhMhMUEGFFFhcQcWJDJS/8QAGAEBAQEBAQAAAAAAAAAAAAAAAwQCAAX/xAAiEQACAgEEAgMBAAAAAAAAAAABAgARAwQSITEFQRMiQpH/2gAMAwEAAhEDEQA/AF7gKqz8lWQjqUuNjPolvh+JVwY6SqT403reI30m0UfIRyzMAiednHt7SWjA4YEdZ9fjH0oFliIPkma1VTUqcXwHGzLP3ggYOQB05L/blctpaqMPyFyzxVmJrU0SEMDKdnGyKohg7iN418YwyKq8iQsmR3oE/wBiLDwvHNyc8X2YOkHSD8HC7wFalF3GgiYH/nNCxIDy1l4jrXSpyhf5KPvS1WbZJ8frExkV1M5N+4cn17nNPiKllEK1Itg+SRiLz1UV+SsJoAK58D1jjDz9aCu9Vtod/wC/7xU+ox/kF976xveTar8kCeh44sGZWMi42RYKoLDXUfZxlgvJ9qUiJ6+n3iY9lWqLEqHrDex6GaMTW0jSKCJmbpDdan4ybFlZOPUfUYvmaxLly9eocFPNSl6J+5735zW4r+oVynwyVbgaawB5cYi81els3mXZQKAOn95JVjsvVDdvqYfv4ygMvBbqE2IkELyYyRc/Yt3ZGhZw8nxnlq3YjmIkXU3slhmdwMstSwZzF49efjL3KXXsgM8HS4PjZ+MydQFfaOpy6UstsOZA/dniJHlgdkZxzBeSsGdPQGspjl2qs5SIbbwyk57NyTS01EiAbOx5w8uRnFVFwIMb3cy6UzkMTo+dZHYsTwTN2pnT+GwwzNfebQ8GZck8rOzs5LE+zkgt2DJ091gNa0DhhlRAqECbllbM4IAmfX85K1qdzppWPj5OGGTsBcoQmpwXYKDvZP5zmaaQkbbDDGIkx7n/2Q==",
        offset: { x: 0, y: 0 },
    },
    {
        key: "sunset",
        src: "landing-sunset.webp",
        alt: "Home office setup with city skyline at sunset",
        placeholder:
            "data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAkAEADASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAUCAwQGAQf/xAApEAABBAEEAQMDBQAAAAAAAAABAAIDBBEFEiExExQiQRVhcQYkMlGR/8QAGQEAAwEBAQAAAAAAAAAAAAAAAgMEAAEF/8QAHhEAAgICAwEBAAAAAAAAAAAAAQIAAxESITFBIgT/2gAMAwEAAhEDEQA/APn2mweW1E3vJXT/AEuFmPIxgBOBwkOhyRwWmyyu2tZzlPprnrXVn7hgSHgf0kl2DcDie1SK9Oe5VBprXGTFdpAfhafpUGOYmD8hX0rjPVOhjIcC/wBxXRs01ksHmG0tUlv7TVjYdyxKaSM5nGt0uL1cjTG3AAPS8tVK1as6UwDjrITGxL+8lfA7ADmtKV6nfD3T1XOzuI2/ZU1Wu/kRYKkBxJ0qde1VEwhA+CMLnNSh8VqVuMAFOKusx1qLqZBacn3pXqXuIeTkuHab9bciTOayg179kYMCrgjspjHK1lfazO8DgpS6Zprhgad2e1sYyxhjYo3OdjduBXMn2TBztkdQdPZq6dJLXftl3d/Kc0v1TdraWK0pL5OyQuX1Oy6a24AFgbxt+6trCwa+7ZuI+/wiNVbgG0QWvtGRV5Npv2pJnFjnb5OwFVbNiGXErcS95Ku0lz4p/K6LjrlXak51j3viLXA8ZPws1irZqvUJN2ry/cVlk00ZwMkHJCuuB5rDezGFAXxXLtsQyeCCiS4ZKwD2gZPCzMT5AVwCeZjryO5UZZpYpD45Xt/BQhFj6iVJxML5XucXOcSSeypixMX48jgMfBQhOIGIsEy5s8wIxK7/AFTdYmf/ACkcfyUISyBHKTiV7jgHOSvZJHE8lCEcSZ//2Q==",
        offset: { x: 1, y: 0 },
    },
    {
        key: "night",
        src: "landing-night.webp",
        alt: "Home office setup with city skyline at night",
        placeholder:
            "data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAkAEADASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAAMBAgQFB//EACcQAAICAgEDAwQDAAAAAAAAAAECAAMEESESEzEFFGEiQVGBMnGx/8QAFwEBAQEBAAAAAAAAAAAAAAAAAwIEAf/EAB0RAQADAAIDAQAAAAAAAAAAAAEAAhESMQMhIlH/2gAMAwEAAhEDEQA/APLcavbCMaog8n7ycIqm3fwojWZbFBGjzNVU97Op6JGNiC9yrWBNAnZ+5i+wwPmaEZerpHPPM1rQGGx4i1Ksn6nM7J2BKtUyjZM2WD6z08ainYdwpve5C1CdxiFrZhvcjIr036jhatRKMD8mRkjdat+eITcclcXHZNSA4eteTLtUa6wFGyRz8SvcX24QKQ25sSu/SLXUztrq2OZnbIxQ3JzmFiUMyfy3OhRZemMFYgsRv+pk9Tu68oqqdvpABHzG4vfajq7ZYj/I1XAbeoduWpTuUsruY7BJZvsJNuNk4nSLU07DY2J0PSnZMoWtVwDrmbPVrPdJtqiGU6Xf4mby+TLla9TR4aLTlbucDtXXVMoG28kS9tdgwyLE1qMGauMxIq+rwQT5g+b3cchk0CeBudry7yS2NTZjx2OjIsyL6bD27XXX4MIRc+oFVyY3td3LuxZieSZf3NwIAsYDWuDCEZCSLLrk3rrVrD9xjZeQ/DWsR8mEIbU/JZZzuLLEjZOzB3Y6G4Qlw2f/2Q==",
        offset: { x: -5, y: -3 },
    },
];

const CONTINUED_IMAGE: VisualProps = {
    src: "landing-desk-secondary.webp",
    alt: "Close-up of home office desk setup with laptop and accessories",
    placeholder:
        "data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAVAEADASIAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAAAAUCBAEDBgf/xAAmEAACAgIBAgUFAAAAAAAAAAABAgADBBESITEFIkFRYRMVUpGh/8QAGAEAAwEBAAAAAAAAAAAAAAAAAgMEAAH/xAAdEQEAAgIDAQEAAAAAAAAAAAABAAIDERMUITES/9oADAMBAAIRAxEAPwDzNDYvEhtA+0L962TsyytaWptdDXpL2J4ZS9ZtyXKoO3zNa5X1lGOn68rOeatePXfUzBTjYut7Mb5GJUzEoToHyibsTwqq/LXzniBsmHzAbYPCttEUAEEHcmxZeuu86r7Jhfmf1NOV4ThVUliWb4k/aovyUdW9Te4gNbrQLOQ4ntI6LjmB0HeXGVHArCkAdhNVlYSvX8ji6xDjNzOLsN0MvnLuuUVMQFHbQhCcsEOj9ksKsXWhW9TqPK8eqglUXXzCEmzLvUbjPIXWfSqZgN6izJyXdVDa1CELFUTbAy2SwEVV5HDMDBAfTRkMzraSOg9oQlABFNlZ/9k=",
};

// Tunables
const FULL_CYCLE_MS = 3 * 60 * 1000; // 3 min loop for all 4 phases
const CROSSFADE_MS = 1800; // crossfade duration between phases
const PARALLAX_STENGTH = -0.5; // max parallax offset percentage
const PARALLAX_DELAY_FACTOR = 0.04; // parallax smoothing factor

// --- Utilities --------------------------------------------------------------

function phaseIndexForDate(d: Date): number {
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const m = hours * 60 + minutes;
    const phase =
        m >= 5 * 60 && m < 9 * 60
            ? 0 // sunrise 05:00–08:59
            : m >= 9 * 60 && m < 17 * 60
            ? 1 // day     09:00–16:59
            : m >= 17 * 60 && m < 20 * 60
            ? 2 // sunset  17:00–19:59
            : 3; // night   20:00–04:59

    return phase;
}

function useReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined") return;

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
    if (typeof window === "undefined") return;

    const img = new window.Image();
    img.decoding = "async";
    img.src = `https://cdn.jtucker.io/${src}`; // Match customImageLoader CDN path
}

// Compute per-phase opacities given a fractional segment position [0..4)
// Uses reveal transition: current image fades out to reveal next underneath
function opacitiesForSegment(seg: number, count = SKYLINE_IMAGES.length) {
    const values = new Array(count).fill(0);
    const current = Math.floor(seg) % count;
    const next = (current + 1) % count;
    const intra = seg - Math.floor(seg);

    // Next image is always fully visible (underneath)
    values[next] = 1;
    // Current image fades out from 1 → 0 to reveal the next
    values[current] = 1 - intra;

    return values;
}

// --- Component --------------------------------------------------------------

export const SkylineHero: FC = () => {
    const reducedMotion = useReducedMotion();

    // Always use index 0 (sunrise) for SSR and initial hydration - prevents mismatch
    const [initialPhase] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [mode, setMode] = useState<"boot" | "cycle">("boot");
    const [segment, setSegment] = useState(0); // Always start at 0 for SSR consistency
    const [ready, setReady] = useState(false);
    const [parallaxX, setParallaxX] = useState(0);

    const rafRef = useRef<number | null>(null);
    const parallaxRafRef = useRef<number | null>(null);
    const targetParallaxX = useRef(0);
    const containerRef = useRef<HTMLElement>(null);

    // Mark as client-side after mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Start the cycle after client hydration
    useEffect(() => {
        if (!isClient) return;

        // Preload all images in background
        SKYLINE_IMAGES.forEach((img) => preload(img.src));

        // Small delay to allow initial render with placeholder, then start cycle
        const timer = setTimeout(() => {
            setMode("cycle");
        }, 100);

        return () => clearTimeout(timer);
    }, [isClient]);

    // Continuous loop - cycles through phases starting at current time-of-day phase
    useEffect(() => {
        if (!isClient || mode !== "cycle") return;

        // Start at the current actual phase based on time of day
        const phase = phaseIndexForDate(new Date());
        const t0 = performance.now();

        const loop = (t: number) => {
            const elapsed = t - t0;
            const seg =
                (phase + (elapsed / FULL_CYCLE_MS) * SKYLINE_IMAGES.length) % SKYLINE_IMAGES.length;
            setSegment(seg);
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isClient, mode]);

    // Preload the two most likely images for next transition
    useEffect(() => {
        if (!isClient) return;

        const count = SKYLINE_IMAGES.length;
        const current = Math.floor(segment) % count;
        const next = (current + 1) % count;
        preload(SKYLINE_IMAGES[current].src);
        preload(SKYLINE_IMAGES[next].src);
    }, [isClient, segment]);

    // Compute opacities
    const opacities =
        !isClient || mode === "boot"
            ? // During SSR/boot: show only sunrise (index 0)
              SKYLINE_IMAGES.map((_, i) => (i === 0 ? 1 : 0))
            : // During cycle: reveal transition
              opacitiesForSegment(segment);

    // Mark ready once first frame paints
    useEffect(() => {
        if (!isClient) return;

        const id = requestAnimationFrame(() => setReady(true));
        return () => cancelAnimationFrame(id);
    }, [isClient]);

    // Parallax effect - only active when hovering inside container
    useEffect(() => {
        if (!isClient || reducedMotion || !containerRef.current) return;

        const container = containerRef.current;
        let isInsideContainer = false;

        const handleMouseMove = (e: MouseEvent) => {
            if (!isInsideContainer) return;

            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            targetParallaxX.current = normalizedX * PARALLAX_STENGTH;
        };

        const handleMouseEnter = () => {
            isInsideContainer = true;
        };

        const handleMouseLeave = () => {
            isInsideContainer = false;
            // Smoothly reset parallax to center when leaving
            targetParallaxX.current = 0;
        };

        const smoothParallax = () => {
            setParallaxX((current) => {
                const target = targetParallaxX.current;
                const next = current + (target - current) * PARALLAX_DELAY_FACTOR;
                return Math.abs(next - target) < 0.001 ? target : next;
            });
            parallaxRafRef.current = requestAnimationFrame(smoothParallax);
        };

        parallaxRafRef.current = requestAnimationFrame(smoothParallax);
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        return () => {
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mousemove", handleMouseMove);
            if (parallaxRafRef.current) cancelAnimationFrame(parallaxRafRef.current);
        };
    }, [isClient, reducedMotion]);

    return (
        <article className="absolute w-full h-auto overflow-hidden">
            <section
                ref={containerRef}
                className="relative w-full min-h-[90dvh] overflow-hidden z-0 shadow-xl"
                data-phase={mode}
            >
                {SKYLINE_IMAGES.map((image, index) => {
                    // Always treat index 0 as initial for SSR consistency
                    // const isInitialPhase = index === initialPhase;
                    const current = Math.floor(segment) % SKYLINE_IMAGES.length;
                    const next = (current + 1) % SKYLINE_IMAGES.length;
                    const zIndex = index === current ? 2 : index === next ? 1 : 0;

                    return (
                        <div
                            key={image.key}
                            className="absolute inset-0 will-change-opacity transition-opacity ease-linear"
                            style={{
                                opacity: opacities[index],
                                transitionDuration: `${reducedMotion ? 0 : CROSSFADE_MS}ms`,
                                pointerEvents: "none",
                                zIndex,
                            }}
                            aria-hidden={opacities[index] < 0.01}
                        >
                            <div
                                className="absolute inset-0 will-change-transform"
                                style={{
                                    transform: `translateX(calc(${parallaxX}% + ${
                                        image.offset?.x || 0
                                    }px)) translateY(${image.offset?.y || 0}px)`,
                                    width: "110%",
                                    height: "100%",
                                    left: "-5%",
                                }}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    loader={customImageLoader}
                                    fill
                                    priority={index === initialPhase}
                                    loading={index === initialPhase ? "eager" : "lazy"}
                                    placeholder="blur"
                                    blurDataURL={image.placeholder}
                                    className={cn("absolute inset-0")}
                                    style={{ objectFit: "cover" }}
                                    onLoad={() => setReady(true)}
                                />
                            </div>
                        </div>
                    );
                })}
            </section>
            <section className="relative mt-0.5 flex flex-col space-y-0.5 ">
                <div className="h-3 shadow w-full bg-primary" />
                <div className="h-3 shadow w-full bg-primary/80" />
                <div className="h-2 shadow w-full bg-primary/60" />
                <div className="h-2 shadow w-full bg-primary/40" />
                <div className="h-1 shadow w-full bg-primary/20" />
                <div className="h-0.5 shadow w-full bg-primary/10" />
            </section>
        </article>
    );
};
