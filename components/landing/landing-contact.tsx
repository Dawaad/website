"use client";

import { EnvironmentBackground } from "../ui/background/environment-background";
import { Grid } from "../ui/background/grids";

export const Contact = () => {
    return (
        <section className="w-full py-20 h-[80dvh] items-center  relative">
            <Grid className="z-30 opacity-20" />
            <EnvironmentBackground />
        </section>
    );
};
