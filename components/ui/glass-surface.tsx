import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export interface GlassSurfaceProps {
    children?: React.ReactNode;
    width?: number | string;
    height?: number | string;
    borderRadius?: number;
    borderWidth?: number;
    brightness?: number;
    opacity?: number;
    blur?: number;
    backgroundOpacity?: number;
    saturation?: number;
    className?: string;
    style?: React.CSSProperties;

    // kept for API compatibility – currently unused
    displace?: number;
    distortionScale?: number;
    redOffset?: number;
    greenOffset?: number;
    blueOffset?: number;
    xChannel?: "R" | "G" | "B";
    yChannel?: "R" | "G" | "B";
    mixBlendMode?:
        | "normal"
        | "multiply"
        | "screen"
        | "overlay"
        | "darken"
        | "lighten"
        | "color-dodge"
        | "color-burn"
        | "hard-light"
        | "soft-light"
        | "difference"
        | "exclusion"
        | "hue"
        | "saturation"
        | "color"
        | "luminosity"
        | "plus-darker"
        | "plus-lighter";
}

// cache backdrop-filter support once per module
let cachedBackdropSupport: boolean | null = null;

const detectBackdropFilterSupport = (): boolean => {
    if (cachedBackdropSupport !== null) return cachedBackdropSupport;
    if (typeof window === "undefined" || typeof CSS === "undefined") {
        cachedBackdropSupport = false;
        return cachedBackdropSupport;
    }

    // most browsers support CSS.supports now
    if (CSS.supports && CSS.supports("backdrop-filter", "blur(10px)")) {
        cachedBackdropSupport = true;
        return cachedBackdropSupport;
    }

    // fallback manual test
    const el = document.createElement("div");
    el.style.backdropFilter = "blur(10px)";
    cachedBackdropSupport = el.style.backdropFilter !== "";
    return cachedBackdropSupport;
};

const GlassSurface: React.FC<GlassSurfaceProps> = ({
    children,
    width = 420,
    height = "auto",
    brightness = 100,
    opacity = 1,
    blur = 20,
    backgroundOpacity = 0.1,
    saturation = 1.4,
    className = "",
    style = {},
}) => {
    const [supportsBackdrop, setSupportsBackdrop] = useState(true);

    // only run detection on client
    useEffect(() => {
        setSupportsBackdrop(detectBackdropFilterSupport());
    }, []);

    const baseStyles: React.CSSProperties = {
        ...style,
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        position: "relative",
        overflow: "hidden",
    };

    let background: string;
    let borderColor: string;
    let boxShadow: string;
    let backdropFilter: string | undefined;
    let webkitBackdropFilter: string | undefined;

    if (supportsBackdrop) {
        // Natural glass effect with backdrop-filter
        background = `rgba(255,255,255,${backgroundOpacity})`;
        borderColor = `rgba(255,255,255,${backgroundOpacity * 0.45})`;
        boxShadow = "0 18px 48px rgba(15,23,42,0.35), 0 0 0 1px rgba(255,255,255,0.6)";
        backdropFilter = `blur(${blur}px) saturate(${saturation}) brightness(${brightness / 100})`;
        webkitBackdropFilter = backdropFilter;
    } else {
        // Fallback for browsers without backdrop-filter support
        background = `rgba(255, 255, 255, ${backgroundOpacity})`;
        borderColor = "rgba(148, 163, 184, 0.6)";
        boxShadow = "0 20px 40px rgba(15,23,42,0.25), inset 0 1px 0 rgba(255,255,255,0.9)";
    }

    const containerStyles: React.CSSProperties = {
        ...baseStyles,
        background,
        borderColor,
        boxShadow,
        backdropFilter,
        WebkitBackdropFilter: webkitBackdropFilter,
    };

    return (
        <div
            className={cn(
                "transition-all relative flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#007AFF] focus-visible:outline-offset-2 rounded-lg shadow-lg backdrop-blur-xl",
                className
            )}
            style={containerStyles}
        >
            {/* subtle inner gradient highlight, cheap because it's not a filter */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "inherit",
                    background:
                        "radial-gradient(circle at 15% 0%, rgba(255,255,255,0.45), transparent 50%)",
                    opacity: 0.05,
                    pointerEvents: "none",
                }}
            />
            <div className="relative z-10 w-full h-full flex items-center justify-center ">
                {children}
            </div>
        </div>
    );
};

export default GlassSurface;
