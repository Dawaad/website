"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { HTMLAttributes } from "react";
import {
    RelativeTime,
    RelativeTimeZone,
    RelativeTimeZoneDisplay,
    RelativeTimeZoneLabel,
} from "../kibo-ui/relative-time";

import { GlassContainer } from "../ui/glass-container";

interface TimezoneProps {
    label: string;
    zone: string;
}

export const Timezone = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
    const { label: AEST_LABEL, zone: AEST_ZONE }: TimezoneProps = {
        label: "AEST",
        zone: "Australia/Sydney",
    };
    const { label: EST_LABEL, zone: EST_ZONE }: TimezoneProps = {
        label: "EST",
        zone: "America/New_York",
    };

    return (
        <article className={cn("max-w-2xl translate-x-4", className)} {...props}>
            <GlassContainer>
                <RelativeTime className="p-3 flex">
                    <RelativeTimeZone key={EST_LABEL} zone={EST_ZONE}>
                        <div className="flex justify-end w-10">
                            <RelativeTimeZoneLabel>{EST_LABEL}</RelativeTimeZoneLabel>
                        </div>
                        <RelativeTimeZoneDisplay className={cn("pl-2 text-neutral-200")} />
                    </RelativeTimeZone>
                    <div className="mx-2">
                        <ArrowRight className="size-4 stroke-white/80" />
                    </div>
                    <RelativeTimeZone key={AEST_LABEL} zone={AEST_ZONE}>
                        <div className="flex justify-end w-10">
                            <RelativeTimeZoneLabel className={cn("bg-green-400 text-neutral-800")}>
                                {AEST_LABEL}
                            </RelativeTimeZoneLabel>
                        </div>

                        <RelativeTimeZoneDisplay className={cn("pl-2 text-neutral-200")} />
                    </RelativeTimeZone>
                </RelativeTime>
            </GlassContainer>
        </article>
    );
};
