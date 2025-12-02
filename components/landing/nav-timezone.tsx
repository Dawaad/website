"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import {
    RelativeTime,
    RelativeTimeZone,
    RelativeTimeZoneDisplay,
    RelativeTimeZoneLabel,
} from "../kibo-ui/relative-time";
import { Grid } from "../ui/background/grids";

import GlassSurface from "../ui/glass-surface";

interface TimezoneProps {
    label: string;
    zone: string;
    active?: boolean;
}

export const Timezone = () => {
    const {
        label: AEST_LABEL,
        zone: AEST_ZONE,
        active,
    }: TimezoneProps = { label: "AEST", zone: "Australia/Sydney" };
    const { label: EST_LABEL, zone: EST_ZONE }: TimezoneProps = {
        label: "EST",
        zone: "America/New_York",
    };

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
                <Grid className="-z-10 opacity-10" dynamic={false} size="sm" />
                <RelativeTime className="p-3 flex">
                    <RelativeTimeZone key={EST_LABEL} zone={EST_ZONE}>
                        <div className="flex justify-end w-10">
                            <RelativeTimeZoneLabel>{EST_LABEL}</RelativeTimeZoneLabel>
                        </div>
                        <RelativeTimeZoneDisplay className={cn("pl-2 text-neutral-200")} />
                    </RelativeTimeZone>
                    <div className="mx-2">
                        <ArrowRight className="size-4 stroke-secondary" />
                    </div>
                    <RelativeTimeZone key={AEST_LABEL} zone={AEST_ZONE}>
                        <div className="flex justify-end w-10">
                            <RelativeTimeZoneLabel className={cn("bg-green-400")}>
                                {AEST_LABEL}
                            </RelativeTimeZoneLabel>
                        </div>

                        <RelativeTimeZoneDisplay className={cn("pl-2 text-neutral-200")} />
                    </RelativeTimeZone>
                </RelativeTime>
            </GlassSurface>
        </article>
    );
};
