"use client";

import type { FC } from "react";
import { useEffect, useRef, useState } from "react";

import { SCHEMES } from "@/src/features/portfolio/lib/config/schemes";
import type { SchemeName } from "@/src/shared/types/portfolio";
import { cn } from "@/src/shared/lib/utils";

interface SchemeMenuProps {
  scheme: SchemeName;
  setScheme: (scheme: SchemeName) => void;
}

/**
 * Status-bar scheme control for narrow screens: a `scheme ▲` trigger that opens
 * an upward, terminal-styled menu of palettes. Closes on outside click.
 */
export const SchemeMenu: FC<SchemeMenuProps> = ({ scheme, setScheme }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 uppercase tracking-[0.06em] text-fg-2"
      >
        <span className="text-fg-3">scheme</span>
        <span className="text-amber">{scheme}</span>
        <span className="text-[8px] text-fg-3">{open ? "▼" : "▲"}</span>
      </button>
      {open && (
        <div className="absolute right-0 bottom-full z-[60] mb-2 flex min-w-[128px] flex-col border border-fg-4 bg-bg-0 py-1 shadow-sm">
          {SCHEMES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setScheme(s);
                setOpen(false);
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-left uppercase tracking-[0.06em] text-fg-2 hover:bg-bg-2",
                s === scheme && "text-amber",
              )}
            >
              <span className="w-2 text-amber">{s === scheme ? ">" : " "}</span>
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
