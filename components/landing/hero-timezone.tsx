"use client";

import { cn } from "@/lib/utils";
import GlassSurface from "../GlassSurface";
import {
    RelativeTime,
    RelativeTimeZone,
    RelativeTimeZoneDate,
    RelativeTimeZoneDisplay,
    RelativeTimeZoneLabel,
} from "../kibo-ui/relative-time";
import { BGPattern } from "../ui/grids";

interface TimezoneProps {
    label: string;
    zone: string;
    active?: boolean;
}

export const Timezone = () => {
    const timezones: TimezoneProps[] = [
        { label: "AEST", zone: "Australia/Sydney", active: true },
        { label: "EST", zone: "America/New_York" },
        { label: "GMT", zone: "Europe/London" },
        { label: "JST", zone: "Asia/Tokyo" },
    ];
    return (
        <article className="max-w-2xl translate-x-4">
            <GlassSurface
                className="rounded-md"
                width={"100%"}
                height={"auto"}
                displace={15}
                distortionScale={-150}
                redOffset={5}
                greenOffset={15}
                blueOffset={25}
                brightness={40}
                backgroundOpacity={0.05}
                opacity={0.9}
                mixBlendMode="screen"
            >
                <BGPattern variant="grid" mask="fade-edges" className="opacity-20" fill="white" />
                <RelativeTime className="pr-4">
                    {timezones.map(({ zone, label, active }) => (
                        <RelativeTimeZone key={zone} zone={zone}>
                            <div className="flex justify-end w-12">
                                <RelativeTimeZoneLabel className={cn(active && "bg-green-400")}>
                                    {label}
                                </RelativeTimeZoneLabel>
                            </div>
                            <RelativeTimeZoneDate
                                className={cn("pl-4 text-neutral-200", active && "text-green-400")}
                            />
                            <RelativeTimeZoneDisplay
                                className={cn("pl-4 text-neutral-200", active && "text-green-400")}
                            />
                        </RelativeTimeZone>
                    ))}
                </RelativeTime>
            </GlassSurface>
        </article>
    );
};
