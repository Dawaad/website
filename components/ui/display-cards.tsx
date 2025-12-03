"use client";

import { ClassNameProps, FCWC } from "@/lib/interfaces/interface";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface DisplayCardProps {
    className?: string;
    icon?: ReactNode;
    header?: ReactNode;
    content?: string;
}

export const DisplayCard: FCWC<DisplayCardProps> = ({ className, children }) => {
    return (
        <div
            className={cn(
                "relative flex h-44 w-[26rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-6 py-4 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2",
                "[grid-area:stack] hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
                "group-hover:opacity-20 hover:opacity-100",
                className
            )}
        >
            {children}
        </div>
    );
};

export const DisplayStack: FCWC<ClassNameProps> = ({ className, children }) => {
    return (
        <div
            className={cn(
                "grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 -ml-12",
                className
            )}
        >
            {children}
        </div>
    );
};
