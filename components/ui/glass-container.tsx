import { ClassNameProps, FCWC } from "@/lib/interfaces/interface";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Grid } from "./background/grids";
import GlassSurface from "./glass-surface";

interface Props extends ClassNameProps, HTMLAttributes<HTMLDivElement> {}

export const GlassContainer: FCWC<Props> = ({ className, children, ...props }) => {
    return (
        <GlassSurface
            width={"100%"}
            height={"auto"}
            displace={15}
            distortionScale={-150}
            redOffset={5}
            greenOffset={15}
            blueOffset={25}
            brightness={40}
            backgroundOpacity={0.0}
            mixBlendMode="screen"
        >
            <Grid className="-z-10 opacity-10" dynamic={false} size="sm" />
            <div className={cn("w-auto flex flex-col", className)} {...props}>
                {children}
            </div>
        </GlassSurface>
    );
};
