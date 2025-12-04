"use client";

import { CURSOR_HANDLER, useCursor } from "@/lib/contexts/cursor-context";
import { Calendar, Github, Pin } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { BackgroundBeams } from "../ui/background/beams";
import { Grid } from "../ui/background/grids";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { GlassContainer } from "../ui/glass-container";
import TargetCursor from "../ui/target-cursor";
import { TracingBeam } from "../ui/tracing-beam";

interface ScrollItem {
    static: React.ReactNode;
    reveal: React.ReactNode;
}

export function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCard, setActiveCard] = useState(0);
    const { setLiquidCursorVisible } = useCursor();
    const CURSOR_ATTRIBUTES = CURSOR_HANDLER(setLiquidCursorVisible);
    const ref = useRef<HTMLDivElement>(null);

    const content: ScrollItem[] = [
        {
            static: (
                <div className="flex flex-col space-y-1">
                    <h1 className="text-3xl font-bold text-primary flex items-center space-x-4">
                        Riven
                        <Link
                            {...CURSOR_ATTRIBUTES}
                            href={"https://github.com/rmr-studio/riven"}
                            target="_blank"
                        >
                            <Button
                                variant={"ghost"}
                                size={"icon"}
                                className="ml-1 mt-1 cursor-pointer"
                            >
                                <Github className=" text-primary/70 size-5" />
                            </Button>
                        </Link>
                    </h1>
                    {/* //todo Develop the landing page and host it lol */}
                    {/* <Link
                        href={"https://getriven.io"}
                        target="_blank"
                        className="italic text-primary/70 text-xs hover:underline hover:text-primary transition-colors"
                        {...CURSOR_ATTRIBUTES}
                    >
                        https://getriven.io
                    </Link> */}

                    <div className="text-primary/80 text-sm italic flex flex-col space-y-3 items-center mt-6">
                        <div>
                            Building a feature-complete CRM platform with fully customizable,
                            drag-and-drop layouts supporting diverse business workflows, currently
                            in final MVP phase approaching market launch
                        </div>
                        <div>
                            Engineered dynamic layout system extending the
                            <Link
                                href={"https://gridstackjs.com/"}
                                target="_blank"
                                className="font-semibold hover:underline"
                            >
                                {" "}
                                Gridstack.js{" "}
                            </Link>
                            library with custom React components, enabling real-time collaborative
                            editing and persistent configuration management and real time dimension
                            awareness capabilities with automatic resizing based on dynamic content.
                        </div>
                        <div>
                            Currently integrating a self-hosted N8N workflow automation engine,
                            architecting REST API bridge that allows users to build custom business
                            process pipelines and event-driven automations without code
                        </div>
                    </div>
                    <div className="flex flex-row mt-4 space-x-1 flex-wrap">
                        {[
                            "React",
                            "TypeScript",
                            "Kotlin",
                            "Springboot",
                            "PostgreSQL",
                            "Gridstack.js",
                            "N8N",
                            "TailwindCSS/ShadCN UI",
                        ].map((skill, index) => (
                            <Badge
                                key={`riven-skill-badge-${index}`}
                                variant={"secondary"}
                                className="rounded-sm border-primary/40 px-2 py-1 mb-2"
                            >
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>
            ),
            reveal: (
                <div className="flex flex-col space-y-1">
                    <div className="text-primary/60 text-sm italic flex items-center">
                        <Calendar className="size-3 mr-2" />
                        May 2025 - Present
                    </div>
                    <h1 className="text-2xl font-bold text-primary">Startup Founder</h1>
                    <div className="text-primary/60 text-sm italic flex items-center">
                        <Pin className="size-3 mr-2" /> Remote
                    </div>
                </div>
            ),
        },
        {
            static: (
                <div className="flex flex-col space-y-1">
                    <h1 className="text-3xl font-bold text-primary flex items-center space-x-4">
                        Leidos
                    </h1>

                    <div className="text-primary/80 text-sm italic flex flex-col space-y-3 items-center mt-6">
                        <div>
                            Contributed core technical design and implementation for migration of
                            monolithic application to microservice architecture, architecting
                            communication patterns using Kafka event streaming and designing service
                            boundaries that improved system resilience and reduced deployment risk
                            across a 12-engineer team.
                        </div>
                        <div>
                            Architected and developed 5+ production microservices in Kotlin/Spring
                            Boot with MongoDB, implementing asynchronous event processing and
                            further optimized schema designs that reduced database load by 40% and
                            improved API response times from ~350ms to ~200ms for key endpoints.
                        </div>
                        <div>
                            Designed and implemented real-time notification, communication and
                            unread indicator systems embedded across the entire application suite,
                            leveraging Kafka event streams and WebSocket connections to deliver
                            sub-second updates across siloed user environments and international
                            deployments with 99.9% message delivery reliability.
                        </div>
                        <div>
                            Established authentication and authorization infrastructure using
                            Keycloak, architecting integration patterns for multiple integrated
                            microservices, utilising the combination of Kafka and Keycloak event
                            management that enabled isolated microservices real time user,
                            organisation and team data query capabilities while maintaining
                            centralized identity management and role-based access control.
                        </div>
                        <div>
                            Led technical redesign and restructure for an intelligent message
                            routing service supporting international deployments, implementing a
                            Kafka-based pipeline that would run complex data objects through a
                            series of rule-based engines to determine its correct routing recipients
                            based on dynamic guidelines and acceptance criteria. Improving routing
                            speeds by 30% and improved overall correctness of routing capabilities
                        </div>
                    </div>
                    <div className="flex flex-row mt-4 space-x-1 flex-wrap">
                        {[
                            "Kotlin",
                            "Springboot",
                            "Kafka",
                            "Kubernetes",
                            "Ember",
                            "TypeScript",
                            "MongoDB",
                            "Skaffold/Helm",
                            "Jaeger",
                            "Redis",
                            "Agile",
                            "TailwindCSS/DaisyUI",
                        ].map((skill, index) => (
                            <Badge
                                key={`riven-skill-badge-${index}`}
                                variant={"secondary"}
                                className="rounded-sm border-primary/40 px-2 py-1 mb-2"
                            >
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>
            ),
            reveal: (
                <div className="flex flex-col space-y-1">
                    <div className="text-primary/60 text-sm italic flex items-center">
                        <Calendar className="size-3 mr-2" />
                        Jan 2024 - Present
                    </div>
                    <h1 className="text-2xl font-bold text-primary">Software Engineer</h1>
                    <div className="text-primary/60 text-sm italic flex items-center">
                        <Pin className="size-3 mr-2" /> Melbourne, Austraia
                    </div>
                </div>
            ),
        },
        {
            static: (
                <div className="flex flex-col space-y-1">
                    <h1 className="text-3xl font-bold text-primary flex items-center space-x-4">
                        Monash University
                    </h1>
                    <h2 className="font-semibold text-primary/80">
                        Bachelors of Software Engineering
                    </h2>

                    <div className="text-primary/80 text-sm italic flex flex-col space-y-3  ">
                        Certified Academic Weapon{" "}
                    </div>
                </div>
            ),
            reveal: (
                <div className="flex flex-col space-y-1">
                    <div className="text-primary/60 text-sm italic flex items-center">
                        <Calendar className="size-3 mr-2" />
                        Jan 2021 - Nov 2023
                    </div>
                    <h1 className="text-2xl font-bold text-primary">Prior Education</h1>
                    <div className="text-primary/60 text-sm italic flex items-center">
                        <Pin className="size-3 mr-2" /> Clayton, Melbourne
                    </div>
                </div>
            ),
        },
    ];
    const { scrollYProgress } = useScroll({
        // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
        target: ref,
        // container: ref,
        offset: ["start start", "end start"],
    });

    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
            const distance = Math.abs(latest - breakpoint);
            if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                return index;
            }
            return acc;
        }, 0);
        setActiveCard(closestBreakpointIndex);
    });

    return (
        <motion.section id="about">
            <Grid className="z-0 opacity-40" />
            <BackgroundBeams className="z-0" />
            <TargetCursor
                spinDuration={2}
                hideDefaultCursor={true}
                parallaxOn={true}
                containerRef={containerRef}
            />
            <div
                className="-translate-x-4 z-30 space-y-6  max-w-2xl md:max-w-4xl mt-40 mb-12"
                ref={containerRef}
                data-has-target-cursor="true"
            >
                <GlassContainer className="w-full gap-3 ml-4 p-8 py-12 flex flex-col items-start justify-start">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-12 md:leading-[60px] text-neutral-100">
                        <div>
                            Have a{" "}
                            <span className="bg-red-400 rounded-lg rounded-b-none text-white px-3 py-1 inline-block cursor-target italic">
                                GANDER
                            </span>
                        </div>
                        <div></div>
                        <div>
                            at my{" "}
                            <span className="bg-purple-300 rounded-lg  text-white px-3 py-1 inline-block cursor-target">
                                past experiences.
                            </span>
                        </div>
                    </h1>
                    <div className="text-sm sm:text-base text-neutral-200 font-medium max-w-2xl leading-tight italic mt-2">
                        Why don't we add <span className="font-semibold">your</span> company here
                        next?
                    </div>
                </GlassContainer>
            </div>
            <section className="relative flex justify-center" ref={ref}>
                <motion.div className="hidden lg:sticky pl-8 md:pl-4 overflow-hidden rounded-md h-40 w-2/5 xl:w-1/5 lg:top-30 mt-12 lg:flex justify-center items-center">
                    {content[activeCard]?.reveal ?? null}
                </motion.div>
                <TracingBeam className="relative flex mt-12 w-full">
                    <div className="w-auto break-word lg:max-w-3xl ml-24 mr-12">
                        {content.map((item, index) => (
                            <motion.div
                                key={`scroll-item-${index}`}
                                className="mb-32 mt-12"
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                            >
                                <div className="lg:hidden mb-12 ">{item.reveal}</div>
                                {item.static}
                            </motion.div>
                        ))}
                    </div>
                </TracingBeam>
            </section>
        </motion.section>
    );
}
