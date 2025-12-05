"use client";

import { LinkProps, NavbarProps } from "@/lib/interfaces/interface";
import { cn } from "@/lib/utils";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Dispatch, FC, useState } from "react";
import { Button } from "../button";

interface MobileNavbarExtendedProps extends NavbarProps {
    open?: boolean;
    setOpen?: Dispatch<React.SetStateAction<boolean>>;
    showTrigger?: boolean;
}

export const MobileNavbar: FC<MobileNavbarExtendedProps> = ({
    links,
    className,
    open: externalOpen,
    setOpen: externalSetOpen,
    showTrigger = true,
}) => {
    const [internalOpen, setInternalOpen] = useState<boolean>(false);

    // Use external state if provided, otherwise use internal state
    const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
    const setIsOpen = externalSetOpen !== undefined ? externalSetOpen : setInternalOpen;

    return (
        <>
            {showTrigger && (
                <div className={cn("px-4 w-full flex items-center", className)}>
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="size-12"
                    >
                        <Menu className="size-8" />
                    </Button>

                    <section className="flex w-auto flex-grow justify-end pr-6 pt-1">
                        <Link href={"/"} className="justify-end mb-2 lg:w-fit">
                            {/* <Logo className="cursor-pointer w-[10rem]" variant="minimal" /> */}
                            jtucker.io
                        </Link>
                    </section>
                </div>
            )}

            <AnimatePresence>
                {isOpen ? (
                    <LinkSection links={links} toggle={setIsOpen} className={className} />
                ) : null}
            </AnimatePresence>
        </>
    );
};

const mobileLinkVars = {
    initial: {
        translateX: "-100%",
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: [0.37, 0, 0.63, 1] as const,
        },
    },
    open: {
        opacity: 1,
        translateX: "0%",
        y: 0,
        transition: {
            ease: [0, 0.55, 0.45, 1] as const,
            duration: 0.35,
        },
    },
};

const menuVars = {
    initial: {
        opacity: 0,
        scaleY: 0.75,
    },
    animate: {
        opacity: 1,
        scaleY: 1,
        transition: {
            duration: 0.25,
            ease: [0.12, 0, 0.39, 0] as const,
        },
    },
    exit: {
        opacity: 0,
        scaleY: 0.75,
        transition: {
            delay: 0.5,
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};
const containerVars = {
    initial: {
        transition: {
            staggerChildren: 0.04,
            staggerDirection: -1,
        },
    },
    open: {
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.04,
            staggerDirection: 1,
        },
    },
};

interface NavbarMenuProps extends NavbarProps {
    toggle: Dispatch<React.SetStateAction<boolean>>;
}

const LinkSection: FC<NavbarMenuProps> = ({ links, toggle }) => {
    const pathName = usePathname();

    return (
        <motion.div
            onClick={() => {
                toggle(false);
            }}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
                transition: {
                    delay: 1,
                },
            }}
            className="inset-0 fixed h-screen w-screen  bg-neutral-950/90 z-[100]"
        >
            <motion.aside
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="absolute md:hidden origin-top top-0 left-0 w-full h-screen bg-background border-t-2 z-[99]"
                variants={menuVars}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <div className="w-full items-center flex h-[6rem] p-4">
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => toggle(false)}
                        className="size-12"
                    >
                        <X className="size-8" />
                    </Button>

                    <section className="flex w-auto flex-grow justify-end items-center">
                        <Link href={"/"} className="p-8 items-center lg:w-fit">
                            {/* <Logo className="cursor-pointer w-[8rem]" variant="minimal" /> */}
                            <span className="text-2xl font-semibold">jtucker.io</span>
                        </Link>
                    </section>
                </div>
                <motion.div
                    variants={containerVars}
                    initial="initial"
                    animate="open"
                    exit="initial"
                    className="flex flex-col px-12 my-36 text-center gap-4 group"
                >
                    {links.map((link, index) => {
                        return (
                            <MobileNavLink
                                toggle={toggle}
                                key={`mobile-link-${index}`}
                                label={link.label}
                                href={link.href}
                                // active={getActiveLink(pathName, link)}
                                // todo: Scroll position calculation
                                active={false}
                            />
                        );
                    })}
                </motion.div>
            </motion.aside>
        </motion.div>
    );
};

interface NavbarItemProps extends LinkProps {
    toggle: Dispatch<React.SetStateAction<boolean>>;
    active: boolean;
}

const MobileNavLink: FC<NavbarItemProps> = ({ label, href, toggle }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Check if it's an internal link (starts with #)
        if (href.startsWith("#")) {
            e.preventDefault();
            const sectionId = href.substring(1);
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            toggle(false);
        } else {
            // For external links, just close the menu
            toggle(false);
        }
    };

    return (
        <motion.div
            variants={mobileLinkVars}
            className="pointer-events-auto text-3xl font-semibold uppercase text-secondary-header group-hover:text-foreground/40 hover:group-hover:text-secondary-foreground"
        >
            <Link
                href={href}
                onClick={handleClick}
                target={href.startsWith("http") ? "_blank" : undefined}
            >
                <div className="flex space-x-3 w-fit py-1 items-center transition-colors">
                    {label}
                </div>
            </Link>
        </motion.div>
    );
};
