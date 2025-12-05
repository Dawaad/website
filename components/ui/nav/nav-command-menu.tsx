"use client";

import {
    Activity as ActivityIcon,
    ArrowUpRight,
    Briefcase,
    FileText,
    Home,
    Lightbulb,
    Mail,
} from "lucide-react";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "../command";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const NavbarCommandMenu: FC<Props> = ({ open, setOpen }) => {
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            setOpen(false);
        }
    };

    const handleNavigation = (sectionId: string) => {
        return () => {
            scrollToSection(sectionId);
        };
    };

    return (
        <>
            <CommandDialog
                open={open}
                modal={true}
                onOpenChange={setOpen}
                className="backdrop-blur-xl bg-black/40 border border-white/10"
            >
                <div className="relative">
                    <CommandInput
                        placeholder="Search"
                        className="text-white placeholder:text-white/50 pr-16"
                    />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/20 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-white/70 opacity-100">
                        ESC
                    </kbd>
                </div>
                <CommandList className="max-h-[400px]">
                    <CommandEmpty className="text-white/70">No results found.</CommandEmpty>

                    {/* Navigation Section */}
                    <CommandGroup
                        heading="Navigation"
                        className="[&_[cmdk-group-heading]]:text-white/50 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
                    >
                        <CommandItem
                            onSelect={handleNavigation("home")}
                            className="text-white/90 hover:bg-white/10 data-[selected=true]:bg-white/10 cursor-pointer"
                        >
                            <Home className="mr-3 size-4" />
                            <span>Home</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={handleNavigation("experience")}
                            className="text-white/90 hover:bg-white/10 data-[selected=true]:bg-white/10 cursor-pointer"
                        >
                            <Briefcase className="mr-3 size-4" />
                            <span>Experience</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={handleNavigation("activity")}
                            className="text-white/90 hover:bg-white/10 data-[selected=true]:bg-white/10 cursor-pointer"
                        >
                            <ActivityIcon className="mr-3 size-4" />
                            <span>Activity</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={handleNavigation("skills")}
                            className="text-white/90 hover:bg-white/10 data-[selected=true]:bg-white/10 cursor-pointer"
                        >
                            <Lightbulb className="mr-3 size-4" />
                            <span>Skills</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={handleNavigation("contact")}
                            className="text-white/90 hover:bg-white/10 data-[selected=true]:bg-white/10 cursor-pointer"
                        >
                            <Mail className="mr-3 size-4" />
                            <span>Contact</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator className="bg-white/10" />

                    {/* Resources Section */}
                    <CommandGroup
                        heading="Resources"
                        className="[&_[cmdk-group-heading]]:text-white/50 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
                    >
                        <Link
                            href="https://github.com/Dawaad/Resume/blob/main/Resume.pdf"
                            target="_blank"
                            onClick={() => setOpen(false)}
                        >
                            <CommandItem className="text-white/90 hover:bg-white/10 data-[selected=true]:bg-white/10 cursor-pointer">
                                <FileText className="mr-3 size-4" />
                                <span>Resume</span>
                                <span className="ml-auto text-xs text-white/50">
                                    View my resume
                                </span>
                                <ArrowUpRight className="ml-2 size-3 text-white/50" />
                            </CommandItem>
                        </Link>
                    </CommandGroup>

                    <CommandSeparator className="bg-white/10" />

                    {/* Social Section */}
                    <CommandGroup
                        heading="Social"
                        className="[&_[cmdk-group-heading]]:text-white/50 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
                    >
                        <Link
                            href="https://github.com/Dawaad"
                            target="_blank"
                            onClick={() => setOpen(false)}
                        >
                            <CommandItem className="text-white/90 hover:bg-white/10 data-[selected=true]:bg-white/10 cursor-pointer">
                                <FaGithub className="mr-3 size-4" />
                                <span>GitHub</span>
                                <span className="ml-auto text-xs text-white/50">
                                    View my GitHub profile
                                </span>
                                <ArrowUpRight className="ml-2 size-3 text-white/50" />
                            </CommandItem>
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/jared-tucker-00ba74250/"
                            target="_blank"
                            onClick={() => setOpen(false)}
                        >
                            <CommandItem className="text-white/90 hover:bg-white/10 data-[selected=true]:bg-white/10 cursor-pointer">
                                <FaLinkedin className="mr-3 size-4" />
                                <span>LinkedIn</span>
                                <span className="ml-auto text-xs text-white/50">
                                    View my LinkedIn profile
                                </span>
                                <ArrowUpRight className="ml-2 size-3 text-white/50" />
                            </CommandItem>
                        </Link>
                    </CommandGroup>
                </CommandList>
                <div className="border-t border-white/10 px-4 py-2 text-[10px] text-white/50 flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <kbd className="px-1 py-0.5 bg-white/5 border border-white/20 rounded">
                            ↑
                        </kbd>
                        <kbd className="px-1 py-0.5 bg-white/5 border border-white/20 rounded">
                            ↓
                        </kbd>
                        <span>navigate</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <kbd className="px-1 py-0.5 bg-white/5 border border-white/20 rounded">
                            →
                        </kbd>
                        <span>select</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <kbd className="px-1 py-0.5 bg-white/5 border border-white/20 rounded">
                            esc
                        </kbd>
                        <span>close</span>
                    </div>
                </div>
            </CommandDialog>
        </>
    );
};
