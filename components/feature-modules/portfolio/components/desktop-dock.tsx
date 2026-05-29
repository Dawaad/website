'use client';

import type { FC } from 'react';

import { DESKTOP_WINDOWS } from '@/components/feature-modules/portfolio/config/desktop-windows';
import { useWindowManager } from '@/components/feature-modules/portfolio/context/window-manager-provider';
import { cn } from '@/lib/util/utils';

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
      className="fixed top-1/2 left-3 z-40 hidden -translate-y-1/2 flex-col gap-1.5 border border-fg-4 bg-bg-0 p-1.5 shadow-sm lg:flex"
    >
      {DESKTOP_WINDOWS.map((w) => {
        const open = isOpen(w.id);
        return (
          <button
            key={w.id}
            type="button"
            onClick={() => toggle(w.id)}
            aria-pressed={open}
            title={`${w.label} — ${open ? 'hide' : 'show'}`}
            className={cn(
              'group relative flex h-9 w-9 items-center justify-center border text-[11px] uppercase tracking-[0.08em] transition-colors',
              open
                ? 'border-fg-3 bg-bg-2 text-fg-0'
                : 'border-transparent text-fg-3 hover:border-fg-4 hover:bg-bg-1 hover:text-fg-1',
            )}
          >
            {/* Active rail — the "this window is running" tell. */}
            <span
              aria-hidden
              className={cn(
                'absolute top-1/2 -left-[3px] h-4 w-[2px] -translate-y-1/2 transition-colors',
                open ? 'bg-amber' : 'bg-transparent group-hover:bg-fg-4',
              )}
            />
            {w.mnemonic}
          </button>
        );
      })}
    </nav>
  );
};
