"use client";

import type { FC } from "react";

import { DESKTOP_WINDOWS } from "@/components/feature-modules/portfolio/config/desktop-windows";
import { useWindowManager } from "@/components/feature-modules/portfolio/context/window-manager-provider";
import { cn } from "@/lib/util/utils";

/**
 * Left-edge dock — one tile per backdrop terminal. A tile reads "running" while
 * its window is open (amber rail, lit mnemonic) and dims when the window is
 * closed or minimised; clicking toggles the window. Desktop (lg+) only, matching
 * the backdrop cluster it controls.
 */
export const DesktopDock: FC = () => {
  const { isOpen, toggle } = useWindowManager();

  return (
    <nav
      aria-label="windows"
      className="fixed top-1/2 left-3 z-40 hidden -translate-y-1/2 flex-col gap-2 rounded-2xl border border-fg-4/60 bg-bg-0/80 p-2 shadow-lg backdrop-blur-sm lg:flex"
    >
      {DESKTOP_WINDOWS.map((w) => {
        const open = isOpen(w.id);
        return (
          <button
            key={w.id}
            type="button"
            onClick={() => toggle(w.id)}
            aria-pressed={open}
            title={`${w.label} — ${open ? "hide" : "show"}`}
            style={{
              backgroundImage: open
                ? `linear-gradient(155deg, color-mix(in srgb, ${w.tint} 34%, var(--bg-2)), color-mix(in srgb, ${w.tint} 12%, var(--bg-1)))`
                : `linear-gradient(155deg, color-mix(in srgb, ${w.tint} 12%, var(--bg-1)), var(--bg-0))`,
              boxShadow: open
                ? `0 4px 10px -2px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 1px color-mix(in srgb, ${w.tint} 45%, transparent)`
                : "0 1px 3px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            className={cn(
              "group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-[11px]",
              "transition-[transform,box-shadow,background-image,opacity] duration-150",
              open ? "scale-[1.04] " : "hover:scale-[1.02]",
            )}
          >
            {/* Active rail — the "this window is running" tell. */}
            <span
              aria-hidden
              className={cn(
                "absolute top-1/2 -left-[5px] h-4 w-[2px] -translate-y-1/2 rounded-full transition-colors",
                open ? "bg-amber" : "bg-transparent group-hover:bg-fg-4",
              )}
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- static public SVG, no optimisation needed */}
            <img
              src={w.icon}
              alt=""
              aria-hidden
              width={24}
              height={24}
              className={cn(
                "h-6 w-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)] transition-[filter,opacity]",
                open
                  ? "opacity-100"
                  : "opacity-70 grayscale group-hover:opacity-95 group-hover:grayscale-0",
              )}
            />
            <span className="sr-only">{w.mnemonic}</span>
          </button>
        );
      })}
    </nav>
  );
};
