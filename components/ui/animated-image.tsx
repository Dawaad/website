import { customImageLoader } from "@/lib/image";
import { motion, useInView } from "motion/react";
import Image, { type ImageProps } from "next/image";
import { FC, useRef } from "react";

// Animated image component with proper loading strategy
export interface AnimatedImageProps extends ImageProps {
    priority?: boolean;
}

export const AnimatedImage: FC<AnimatedImageProps> = ({ priority = false, ...props }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-full w-full"
        >
            <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                {...props}
                loader={customImageLoader}
                priority={priority}
                loading={priority ? "eager" : "lazy"}
                alt={props.alt}
            />
        </motion.div>
    );
};
