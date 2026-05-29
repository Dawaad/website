'use client';

import type { FC } from 'react';

import { useDeskStamp } from '@/components/feature-modules/portfolio/hooks/use-desktop-clock';

interface DesktopTopBarProps {
  /** Handle echoed in the user chip, matching the window title bar. */
  handle: string;
}

const Divider: FC = () => <span className="text-fg-4">│</span>;

/**
 * Decorative GNOME/polybar-style desktop top bar — set dressing that frames the
 * rice. It is `pointer-events-none` so clicks fall through to the faux-terminal
 * controls that sit beneath its left corner. Desktop (lg+) only.
 */
export const DesktopTopBar: FC<DesktopTopBarProps> = ({ handle }) => {
  const stamp = useDeskStamp();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden h-7 items-center justify-between gap-3 border-b border-fg-4 bg-bg-0 px-3 text-[10.5px] tracking-[0.06em] whitespace-nowrap text-fg-2 lg:flex"
    >
      {/* ── left: launcher + workspaces ── */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-fg-1">
          <span className="text-amber">◆</span>
          <span className="uppercase tracking-[0.12em]">apps</span>
        </span>
        <Divider />
        <span className="flex items-center gap-1.5 text-[9px] text-fg-3">
          <span className="text-amber">●</span>
          <span>○</span>
          <span>○</span>
          <span>○</span>
          <span>○</span>
        </span>
      </div>

      {/* ── right: tray · battery · clock · user ── */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-2.5 text-fg-3 uppercase tracking-[0.1em]">
          <span>net</span>
          <span>bt</span>
          <span>vol</span>
        </span>
        <Divider />
        <span className="flex items-center gap-1.5">
          <span className="tracking-[-0.1em] text-fg-2">▰▰▰▱</span>
          <span className="text-fg-1">51%</span>
        </span>
        <Divider />
        <span className="text-fg-1">{stamp}</span>
        <Divider />
        <span className="flex items-center gap-1.5 bg-bg-2 px-1.5 py-[3px] text-fg-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
          <span className="uppercase tracking-[0.08em]">{handle}</span>
        </span>
      </div>
    </div>
  );
};
