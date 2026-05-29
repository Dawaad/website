import { useEffect, useState } from 'react';
import type { CSSProperties, FC, ReactNode } from 'react';

import { cn } from '@/lib/util/utils';

/** Open/close transition length; the unmount is deferred this long so the exit plays. */
export const FAUX_EXIT_MS = 300;

interface FauxTerminalProps {
  title: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /**
   * Whether the window is open. Toggling drives a fade + scale enter/exit; on a
   * full close the window unmounts (so reopening replays its scramble intro).
   */
  open?: boolean;
  /** When provided, the red light closes the window. */
  onClose?: () => void;
  /** When provided, the amber light minimises the window. */
  onMinimize?: () => void;
}

interface ControlDotProps {
  /** Idle dot colour class (e.g. `bg-red-dim`). */
  color: string;
  /** Glyph revealed on hover, macOS-style. */
  glyph: string;
  label: string;
  onClick: () => void;
}

/** A clickable traffic-light dot; shows its action glyph on hover/focus. */
const ControlDot: FC<ControlDotProps> = ({ color, glyph, label, onClick }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onClick={onClick}
    className={cn(
      'group/dot pointer-events-auto flex h-2 w-2 items-center justify-center rounded-full text-[6px] leading-none text-bg-0 transition-colors',
      color,
    )}
  >
    <span className="opacity-0 transition-opacity group-hover/dot:opacity-100 group-focus-visible/dot:opacity-100">
      {glyph}
    </span>
  </button>
);

/**
 * A single faux terminal used as backdrop dressing. Decorative by default; pass
 * `onClose`/`onMinimize` to turn the traffic-light dots into live window
 * controls wired to the desktop's window manager.
 */
export const FauxTerminal: FC<FauxTerminalProps> = ({
  title,
  children,
  className,
  style,
  open = true,
  onClose,
  onMinimize,
}) => {
  const interactive = Boolean(onClose || onMinimize);

  // `closing` keeps the window mounted through its exit animation; `shown` is the
  // animation target (off → faded/scaled-down, on → settled). `mounted` is derived
  // as `open || closing`, so an OPEN window is always mounted — a late/stale exit
  // callback can only clear `closing`, never strand an open window unmounted (the
  // prior "reopen does nothing after it disappears" bug).
  const [closing, setClosing] = useState(false);
  const [shown, setShown] = useState(open);
  const [prevOpen, setPrevOpen] = useState(open);

  // React to open/close at render time (not an effect): a close starts the exit;
  // a (re)open cancels any pending close so it can never unmount mid-reopen.
  if (open !== prevOpen) {
    setPrevOpen(open);
    setClosing(!open);
  }

  const mounted = open || closing;

  // Flip the animation target a frame after mount/close so the CSS transition runs.
  // A timeout backstops the unmount for when transitionend can't fire (e.g. the
  // desktop is display:none on mobile). All state writes here are async — never
  // synchronous in the effect body.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(open));
    if (open) return () => cancelAnimationFrame(raf);
    const timer = setTimeout(() => setClosing(false), FAUX_EXIT_MS + 80);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      onTransitionEnd={(e) => {
        // End the close (drop the window, and its children, so a reopen replays
        // the intro) once *its own* exit transition finishes. Ignore transitions
        // bubbling up from children, and never act while reopened (open === true).
        if (e.target === e.currentTarget && !open) setClosing(false);
      }}
      className={cn(
        'terminal-glass absolute flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xs border border-fg-3 bg-bg-2 shadow-sm',
        'transition duration-300 ease-out',
        shown ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
        className,
      )}
      style={style}
    >
      <div className="panel-chrome flex flex-none items-center gap-2.5 border-b border-fg-3 px-2.5 py-1.5">
        <div className={cn('group flex gap-1', interactive && 'pointer-events-auto')}>
          {interactive ? (
            <>
              <ControlDot
                color="bg-red-dim hover:bg-red"
                glyph="×"
                label={`close ${title}`}
                onClick={() => (onClose ?? onMinimize)?.()}
              />
              <ControlDot
                color="bg-amber-dim hover:bg-amber"
                glyph="–"
                label={`minimise ${title}`}
                onClick={() => (onMinimize ?? onClose)?.()}
              />
              <span className="h-2 w-2 rounded-full bg-fg-4" />
            </>
          ) : (
            <>
              <span className="h-2 w-2 rounded-full bg-fg-4" />
              <span className="h-2 w-2 rounded-full bg-fg-4" />
              <span className="h-2 w-2 rounded-full bg-fg-4" />
            </>
          )}
        </div>
        <span className="truncate text-[9px] uppercase tracking-[0.14em] text-fg-3">{title}</span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden p-2.5">{children}</div>
    </div>
  );
};
