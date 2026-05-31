"use client";

import { memo } from "react";
import type { FC } from "react";

import { DESKTOP_WINDOWS } from "@/src/features/portfolio/lib/config/desktop-windows";
import { useWindowManager } from "@/src/features/portfolio/providers/window-manager-provider";
import { cn } from "@/src/shared/lib/utils";

interface Props {
  /**
   * Whether the desktop has settled past its boot/scramble intro. The dock eases
   * in once true and — since the intro never reverts — stays for the session.
   */
  visible: boolean;
}

/**
 * Left-edge dock — one tile per backdrop terminal. A tile reads "running" while
 * its window is open (amber rail, lit mnemonic) and dims when the window is
 * closed or minimised; clicking toggles the window. Desktop (lg+) only, matching
 * the backdrop cluster it controls.
 */
const DesktopDockView: FC<Props> = ({ visible }) => {
  const { isOpen, toggle } = useWindowManager();

  return (
    <nav
      aria-label="windows"
      className={cn(
        "fixed top-1/2 left-3 z-40 hidden -translate-y-1/2 flex-col gap-2 border border-fg-4/60 bg-bg-0/80 p-2 backdrop-blur-sm transition-opacity duration-700 ease-out lg:flex",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
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
            className={cn(
              "group relative flex h-10 w-10 cursor-pointer items-center justify-center ",
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
                "h-6 w-6  transition-[filter,opacity]",
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

// Memoised: `visible` is stable (false) through the boot/scramble intro and the
// window-manager context it reads doesn't change during the sweep, so it stays
// out of the shell's per-frame intro/transition re-renders.
export const DesktopDock = memo(DesktopDockView);
