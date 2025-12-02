import { ClassNameProps } from "@/lib/interfaces/interface";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props extends ClassNameProps {
    dynamic?: boolean;
    size?: "sm" | "md" | "lg";
}

export const Grid: FC<Props> = ({ className, dynamic = true, size = "md" }) => {
    const sizeMap = {
        sm: "[background-size:30px_30px]",
        md: "[background-size:40px_40px]",
        lg: "[background-size:80px_80px]",
    };

    return (
        <>
            <div
                className={cn(
                    "absolute inset-0",
                    sizeMap[size],
                    "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                    dynamic &&
                        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                    className
                )}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>
        </>
    );
};
