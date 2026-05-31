"use client";

import type { FC } from "react";

import { SCHEMES } from "@/src/features/portfolio/lib/config/schemes";
import { preloadScheme } from "@/src/features/portfolio/lib/preload-image";
import type { SchemeName } from "@/src/shared/types/portfolio";
import { cn } from "@/src/shared/lib/utils";

interface SchemeSwitcherProps {
  scheme: SchemeName;
  setScheme: (scheme: SchemeName) => void;
}

/** Corner control for swapping color schemes — desktop only. */
export const SchemeSwitcher: FC<SchemeSwitcherProps> = ({
  scheme,
  setScheme,
}) => {
  return (
    <div className="fixed right-4 bottom-4 z-[100] flex items-center gap-2 border border-fg-4 bg-bg-0 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-fg-2 max-md:hidden">
      <span className="text-fg-3">scheme:</span>
      {SCHEMES.map((s) => (
        <button
          key={s}
          onClick={() => setScheme(s)}
          onMouseEnter={() => preloadScheme(s)}
          onFocus={() => preloadScheme(s)}
          className={cn(
            "cursor-pointer border-none bg-transparent p-0 uppercase tracking-[inherit]",
            scheme === s ? "text-amber" : "text-fg-2",
          )}
        >
          {s}
        </button>
      ))}
    </div>
  );
};
