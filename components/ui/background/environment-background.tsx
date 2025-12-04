import { customImageLoader, VisualProps } from "@/lib/image";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const IMAGE: VisualProps = {
    src: "landing-environment-sunset.webp",
    alt: "A beautiful sunset over a serene landscape with warm colors",
    placeholder:
        "data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAArAEADASIAAhEBAxEB/8QAGwAAAwADAQEAAAAAAAAAAAAAAwQFAQIGBwD/xAAnEAACAQMDAwQDAQAAAAAAAAABAgMABBEFITESE0EUIlFxBlJhQv/EABoBAAIDAQEAAAAAAAAAAAAAAAMEAQIFAAb/xAAiEQACAgICAgIDAAAAAAAAAAABAgADBBEhMRJBBRMUIlH/2gAMAwEAAhEDEQA/AMelHisemxTNw4t+gHl2wKFqTyW9r1xnBJrHTLdiAD3PYPRSqltdTQQLjcb1j09L6VLJLI/cYkmrKw55FdbltU5UmRVVVYgbURWNl/orbtgg5QU0vbeRo1bLLyKIIPNLtm88wwqr1JwgIPxROjbHSKeaPbcUlfXtvp8BlmOMcDyakZhf1I+utBvoRCHUV1GK3Z8B1bendWaOSwUo2fcBXDWF9JGMq2DVA6tLJjuNkL/mrnEZXBHQmRXnI1em7Mu2WIJHY7Cj2t3Opdy3XltgfioR1jK46BmjprcMS4CkkjerPSW2SNkxhcmrgBuBLAu0s7uWeRSerGwpmLW4ZpVRYWAJ3J8Vy0mtLKvvX6oS6wV4AB+aG2GGXZHMr+YgbhuJ6O8JW27wGVxkf2vLfya6uZrx+4rKM7KTxViT8qvHs/T932gVymo3kt3MS7V3x+JZXZ5OIpnZKtX4gzaCVWGOKaWNmG1S4yQ2xxTaSuBsxFbTAjqYqOPcdW2kajDTJ2j6wBj7pOOWT9zXzXMwOBKwH3QC1hOhqNK1IH7Awxs5K0Nuw8il2nl/c0FpHPLGigWH+QTPX6BhLhXwQrDFJNEx5NFZj80OiopHcXZtz//Z",
    offset: { x: 0, y: 0 },
};

export const EnvironmentBackground = () => {
    const [hasLoaded, setReady] = useState(false);
    return (
        <article className="absolute w-full h-[80dvh] h-auto overflow-hidden">
            <section className="relative mt-0.5 flex flex-col space-y-0.5 ">
                <div className="h-0.5 shadow w-full bg-primary/5" />
                <div className="h-1 shadow w-full bg-primary/5" />
                <div className="h-2 shadow w-full bg-primary/10" />
                <div className="h-2 shadow w-full bg-primary/20" />
                <div className="h-3 shadow w-full bg-primary/30" />
                <div className="h-3 shadow w-full bg-primary/40" />
            </section>
            <section className="relative w-full min-h-[80dvh] overflow-hidden z-0">
                <div className=""></div>
                <div
                    className="absolute inset-0"
                    style={{
                        transform: `${IMAGE.offset?.x || 0}px)) translateY(${
                            IMAGE.offset?.y || 0
                        }px)`,
                    }}
                >
                    <Image
                        src={IMAGE.src}
                        alt={IMAGE.alt}
                        loader={customImageLoader}
                        fill
                        priority={true}
                        // loading="lazy"
                        placeholder="blur"
                        blurDataURL={IMAGE.placeholder}
                        className={cn(
                            `absolute inset-0 transition-all duration-500 ${
                                !hasLoaded && "blur-xl"
                            }}`
                        )}
                        style={{ objectFit: "cover" }}
                        onLoad={() => setReady(true)}
                    />
                </div>
            </section>
        </article>
    );
};
