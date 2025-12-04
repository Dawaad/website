"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
    FaAngular,
    FaCode,
    FaCogs,
    FaDatabase,
    FaDocker,
    FaGitAlt,
    FaJava,
    FaJs,
    FaPython,
    FaReact,
    FaServer,
    FaTerminal,
} from "react-icons/fa";
import {
    SiApachekafka,
    SiGraphql,
    SiKotlin,
    SiKubernetes,
    SiMongodb,
    SiNextdotjs,
    SiPostgresql,
    SiSpringboot,
    SiTypescript,
} from "react-icons/si";
import { Grid } from "../ui/background/grids";
import { DisplayCard, DisplayStack } from "../ui/display-cards";
import { GlassContainer } from "../ui/glass-container";

const languageSkills = [
    { icon: SiKotlin, title: "Kotlin" },
    { icon: SiTypescript, title: "TypeScript" },
    { icon: FaJs, title: "JavaScript" },
    { icon: FaJava, title: "Java" },
    { icon: FaPython, title: "Python" },
    { icon: FaDatabase, title: "SQL" },
];

const infrastructureSkills = [
    { icon: FaDocker, title: "Docker" },
    { icon: SiKubernetes, title: "Kubernetes" },
    { icon: FaGitAlt, title: "Git" },
    { icon: FaTerminal, title: "Bash" },
    { icon: FaCogs, title: "Keycloak" },
];

const backendSkills = [
    { icon: SiSpringboot, title: "Spring Boot" },
    { icon: SiApachekafka, title: "Kafka" },
    { icon: FaServer, title: "REST APIs" },
    { icon: SiGraphql, title: "GraphQL" },
    { icon: SiMongodb, title: "MongoDB" },
    { icon: SiPostgresql, title: "PostgreSQL" },
    { icon: FaCogs, title: "Microservices" },
];

const frontendSkills = [
    { icon: FaReact, title: "React" },
    { icon: SiNextdotjs, title: "Next.js" },
    { icon: SiTypescript, title: "TypeScript" },
    { icon: FaAngular, title: "Angular" },
    { icon: FaCode, title: "SSR" },
];

export const Skills = () => {
    const [activeCard, setActiveCard] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const totalCards = 4;
    const intervalDuration = 3000; // 3 seconds per card

    useEffect(() => {
        if (isHovering) return;

        const interval = setInterval(() => {
            setActiveCard((prev) => (prev + 1) % totalCards);
        }, intervalDuration);

        return () => clearInterval(interval);
    }, [isHovering]);

    const handleCardMouseEnter = (cardIndex: number) => {
        setIsHovering(true);
        setActiveCard(cardIndex);
    };

    const handleCardMouseLeave = () => {
        setIsHovering(false);
    };

    const hasActiveCard = !isHovering;

    return (
        <section className="w-full relative overflow-x-hidden z-20 py-28 flex flex-col gap-y-12 2xl:flex-row h-full min-h-[60dvh] transition-all 2xl:min-h-[40dvh] overflow-hidden">
            <Grid className="opacity-40" />
            <div className="-translate-x-4 z-30 space-y-6 w-fit lg:w-full max-w-3xl mb-6 2xl:mb-12">
                <GlassContainer className="w-full gap-3 ml-4 p-8 py-12 flex flex-col items-start justify-start">
                    <h1 className="text-3xl sm:text-4xl  font-semibold leading-12 md:leading-[60px] text-neutral-100">
                        <div>
                            So what are my{" "}
                            <span className="bg-red-400 rounded-lg text-white px-3 py-1 inline-block cursor-target italic">
                                specialities?
                            </span>
                        </div>
                    </h1>
                    <div className="text-sm sm:text-base text-neutral-200 font-medium max-w-2xl leading-tight italic mt-2">
                        Besides
                        <span className="font-semibold"> doomscrolling </span>
                        and
                        <span className="font-semibold"> brainrotting </span>
                    </div>
                </GlassContainer>
            </div>
            {/* Mobile Layout - All cards visible vertically */}
            <article className="w-full flex flex-col gap-6 px-4 md:hidden">
                <DisplayCard className="skew-y-0 w-full">
                    <div className="flex border-b pb-2 mb-3">Lowkey into Languages</div>
                    <div className="flex flex-wrap gap-6 h-full w-full items-start">
                        {languageSkills.map((skill, index) => (
                            <div key={index} className="flex flex-col items-center gap-2">
                                <skill.icon className="text-4xl" />
                                <span className="text-xs font-medium">{skill.title}</span>
                            </div>
                        ))}
                    </div>
                </DisplayCard>
                <DisplayCard className="skew-y-0 w-full">
                    <div className="flex border-b pb-2 mb-3">Intimately into Infrastructure</div>
                    <div className="flex flex-wrap gap-6 h-full w-full items-start">
                        {infrastructureSkills.map((skill, index) => (
                            <div key={index} className="flex flex-col items-center gap-2">
                                <skill.icon className="text-4xl" />
                                <span className="text-xs font-medium">{skill.title}</span>
                            </div>
                        ))}
                    </div>
                </DisplayCard>
                <DisplayCard className="skew-y-0 w-full">
                    <div className="flex border-b pb-2 mb-3">Baller in the Backend</div>
                    <div className="flex flex-wrap gap-6 h-full w-full items-start">
                        {backendSkills.map((skill, index) => (
                            <div key={index} className="flex flex-col items-center gap-2">
                                <skill.icon className="text-4xl" />
                                <span className="text-xs font-medium">{skill.title}</span>
                            </div>
                        ))}
                    </div>
                </DisplayCard>
                <DisplayCard className="skew-y-0 w-full">
                    <div className="flex border-b pb-2 mb-3">Freaky in the Frontend</div>
                    <div className="flex flex-wrap gap-6 h-full w-full items-start">
                        {frontendSkills.map((skill, index) => (
                            <div key={index} className="flex flex-col items-center gap-2">
                                <skill.icon className="text-4xl" />
                                <span className="text-xs font-medium">{skill.title}</span>
                            </div>
                        ))}
                    </div>
                </DisplayCard>
            </article>

            {/* Desktop Layout - Stacked deck with hover interaction */}
            <article className="w-full items-start pr-36 2xl:pr-0 justify-end 2xl:pl-12 2xl:justify-center hidden md:flex">
                <DisplayStack className="group">
                    <DisplayCard
                        className={cn(activeCard === 0 ? "-translate-x-20" : "translate-x-4")}
                        isActive={activeCard === 0}
                        hasActiveCard={hasActiveCard}
                        onMouseEnter={() => handleCardMouseEnter(0)}
                        onMouseLeave={handleCardMouseLeave}
                    >
                        <div className="flex border-b pb-2 mb-3">Lowkey into Languages</div>
                        <div className="flex flex-wrap gap-6 h-full w-full items-start">
                            {languageSkills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-2 hover:translate-x-2 hover:scale-110 peer transition-all cursor-pointer has-[:hover]:peer-hover:-translate-x-1"
                                >
                                    <skill.icon className="text-4xl" />
                                    <span className="text-xs font-medium">{skill.title}</span>
                                </div>
                            ))}
                        </div>
                    </DisplayCard>
                    <DisplayCard
                        className={cn(
                            "translate-x-16 translate-y-12",
                            activeCard === 1 ? "-translate-x-4" : "translate-x-20"
                        )}
                        isActive={activeCard === 1}
                        hasActiveCard={hasActiveCard}
                        onMouseEnter={() => handleCardMouseEnter(1)}
                        hide={activeCard === 0}
                        onMouseLeave={handleCardMouseLeave}
                    >
                        <div className="flex border-b pb-2 mb-3">
                            Intimately into Infrastructure
                        </div>
                        <div className="flex flex-wrap gap-6 h-full w-full items-start">
                            {infrastructureSkills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-2 hover:translate-x-2 hover:scale-110 peer transition-all cursor-pointer has-[:hover]:peer-hover:-translate-x-1"
                                >
                                    <skill.icon className="text-4xl" />
                                    <span className="text-xs font-medium">{skill.title}</span>
                                </div>
                            ))}
                        </div>
                    </DisplayCard>
                    <DisplayCard
                        className={cn(
                            "translate-x-32 translate-y-24",
                            activeCard === 2 ? "translate-x-12" : "translate-x-36"
                        )}
                        isActive={activeCard === 2}
                        hide={activeCard <= 1}
                        hasActiveCard={hasActiveCard}
                        onMouseEnter={() => handleCardMouseEnter(2)}
                        onMouseLeave={handleCardMouseLeave}
                    >
                        <div className="flex border-b pb-2 mb-3">Baller in the Backend</div>
                        <div className="flex flex-wrap gap-6 h-full w-full items-start">
                            {backendSkills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-2 hover:translate-x-2 hover:scale-110 peer transition-all cursor-pointer has-[:hover]:peer-hover:-translate-x-1"
                                >
                                    <skill.icon className="text-4xl" />
                                    <span className="text-xs font-medium">{skill.title}</span>
                                </div>
                            ))}
                        </div>
                    </DisplayCard>
                    <DisplayCard
                        className={cn(
                            "translate-x-48 translate-y-36",
                            activeCard === 3 ? "translate-x-28" : "translate-x-52"
                        )}
                        isActive={activeCard === 3}
                        hasActiveCard={hasActiveCard}
                        hide={activeCard <= 2}
                        onMouseEnter={() => handleCardMouseEnter(3)}
                        onMouseLeave={handleCardMouseLeave}
                    >
                        <div className="flex border-b pb-2 mb-3">Freaky in the Frontend</div>
                        <div className="flex flex-wrap gap-6 h-full w-full items-start">
                            {frontendSkills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-2 hover:translate-x-2 hover:scale-110 peer transition-all cursor-pointer has-[:hover]:peer-hover:-translate-x-1"
                                >
                                    <skill.icon className="text-4xl" />
                                    <span className="text-xs font-medium">{skill.title}</span>
                                </div>
                            ))}
                        </div>
                    </DisplayCard>
                </DisplayStack>
            </article>
            <div className="absolute bottom-0 h-[10rem] w-full bg-gradient-to-b from-transparent via-background/30 to-background"></div>
        </section>
    );
};
