"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Grid } from "./background/grids";

export function ModeToggle() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer text-white/80">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="bg-black/50 border-white/70 backdrop-blur-xl p-0 -mr-4 mt-2
            "
            >
                <Grid className="-z-10 opacity-10" dynamic={false} size="sm" />
                <DropdownMenuItem
                    className="text-white/80 rounded-none hover:bg-neutral-700/50"
                    onClick={() => setTheme("light")}
                >
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="text-white/80 rounded-none hover:bg-neutral-700/50"
                    onClick={() => setTheme("dark")}
                >
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="text-white/80 rounded-none hover:bg-neutral-700/50"
                    onClick={() => setTheme("system")}
                >
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
