"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import type { FC, MouseEvent } from "react";

import { TABS } from "@/src/features/portfolio/lib/config/tabs";
import { cn } from "@/src/shared/lib/utils";

interface TabBarProps {
  onNavigate: (href: string) => void;
}

const TabBarView: FC<TabBarProps> = ({ onNavigate }) => {
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    // Let modified clicks (open-in-new-tab etc.) behave normally.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <div className="relative z-[2] flex flex-none border-b border-fg-4 bg-bg-0 max-md:touch-pan-x max-md:overflow-x-auto max-md:overflow-y-hidden max-md:overscroll-x-contain max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
      {TABS.map((t, i) => {
        const isActive = t.href === pathname;
        return (
          <Link
            key={t.key}
            href={t.href}
            onClick={(e) => handleClick(e, t.href)}
            className={cn(
              "relative flex flex-none cursor-pointer select-none items-center gap-2 border-r border-fg-4 px-[18px] py-[11px] text-[11px] uppercase tracking-[0.14em] text-fg-2 no-underline transition-colors duration-100 hover:bg-bg-2 hover:text-fg-0 max-md:px-3.5 max-md:py-2.5",
              isActive &&
                "bg-bg-1 text-amber after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-bg-1 after:content-['']",
            )}
          >
            <span
              className={cn(
                "text-[10px] text-fg-3",
                isActive && "text-amber-dim",
              )}
            >
              [{i + 1}]
            </span>
            {t.label}
          </Link>
        );
      })}
      <div className="flex-1 border-r border-fg-4 max-md:hidden" />
      <div className="flex flex-none items-center gap-2.5 whitespace-nowrap px-3.5 text-[11px] tracking-[0.08em] text-fg-3 max-md:hidden">
        <span>
          <span className="text-amber">?</span> help
        </span>
      </div>
    </div>
  );
};

// Memoised: its props (onNavigate) and pathname are stable through the shell's
// high-frequency intro/route-transition re-renders, so it must not reconcile
// each of those frames.
export const TabBar = memo(TabBarView);
