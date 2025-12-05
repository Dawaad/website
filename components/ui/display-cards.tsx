"use client";

import { ClassNameProps, FCWC } from "@/lib/interfaces/interface";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface DisplayCardProps {
    className?: string;
    icon?: ReactNode;
    header?: ReactNode;
    content?: string;
    isActive?: boolean;
    hide?: boolean;
    hasActiveCard?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export const DisplayCard: FCWC<DisplayCardProps> = ({
    className,
    children,
    isActive,
    hasActiveCard,
    hide,
    onMouseEnter,
    onMouseLeave,
}) => {
    const getOpacityClass = () => {
        if (hide) return "opacity-20 blur-xs";
        if (hasActiveCard && !isActive) return "opacity-30";
        if (isActive) return "opacity-100";
        return "";
    };

    return (
        <div
            className={cn(
                "transition-all relative flex min-h-52 w-[32rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-primary/60 hover:border-primary  bg-primary/10 backdrop-blur-sm px-6 py-4 duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2",
                "[grid-area:stack] before:absolute before:w-[100%] before:rounded-xl  before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/20 grayscale-100 hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
                "hover:opacity-100",
                getOpacityClass(),
                className
            )}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
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
