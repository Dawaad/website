import type { FC, ReactNode } from "react";

import { TerminalScroll } from "@/src/shared/ui/terminal-scroll";
import { cn } from "@/src/shared/lib/utils";

interface PanelProps {
  label?: ReactNode;
  accent?: ReactNode;
  meta?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** A labeled sub-section (one side of a tab's two-panel workspace). */
export const Panel: FC<PanelProps> = ({
  label,
  accent,
  meta,
  className,
  children,
}) => {
  return (
    <div
      className={cn("flex min-h-0 min-w-0 flex-col max-md:shrink-0", className)}
    >
      {(label || meta) && (
        <div
          data-static
          className="flex flex-none items-center gap-2.5 border-b border-fg-4 bg-black/[0.18] px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-fg-3"
        >
          {label && (
            <span className="text-fg-2">
              <span className="text-amber">[</span> {label}{" "}
              <span className="text-amber">]</span>
            </span>
          )}
          {accent && <span className="text-amber">{accent}</span>}
          <span className="flex-1" />
          {meta && <span className="min-w-0 truncate text-fg-3">{meta}</span>}
        </div>
      )}
      <TerminalScroll
        className="flex-1"
        viewportClassName="px-6 py-[22px] max-md:overflow-visible max-md:px-4"
      >
        {children}
      </TerminalScroll>
    </div>
  );
};
