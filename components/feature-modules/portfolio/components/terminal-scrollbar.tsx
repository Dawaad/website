'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { FC, PointerEvent as ReactPointerEvent, RefObject, WheelEvent } from 'react';

import { cn } from '@/lib/util/utils';

/** Shortest the thumb is allowed to shrink, so it stays grabbable on long pages. */
const MIN_THUMB = 24;

interface Metrics {
  thumbTop: number;
  thumbHeight: number;
  scrollable: boolean;
}

const HIDDEN: Metrics = { thumbTop: 0, thumbHeight: 0, scrollable: false };

interface TerminalScrollbarProps {
  targetRef: RefObject<HTMLElement | null>;
  className?: string;
}

/**
 * A scroll element only earns a bar when it both *can* scroll (overflow-y is
 * auto/scroll/overlay) and *has* overflow. The overflow test is what lets one
 * component serve every breakpoint without media queries: the surrounding
 * responsive CSS already decides who scrolls where.
 */
function isScrollableY(el: HTMLElement) {
  const overflow = getComputedStyle(el).overflowY;
  const scrolls = overflow === 'auto' || overflow === 'scroll' || overflow === 'overlay';
  return scrolls && el.scrollHeight - el.clientHeight > 1;
}

/**
 * A terminal-styled overlay scrollbar pinned to the right edge of `targetRef`.
 * Renders nothing until the target is genuinely scrollable, so it can be
 * mounted unconditionally against any scroll container (desktop panels, the
 * mobile content column) and simply stays out of the way otherwise.
 *
 * The host must be the target's offset parent (a `relative` box matching the
 * scroll viewport) so the bar lines up with the scrolled region.
 */
export const TerminalScrollbar: FC<TerminalScrollbarProps> = ({ targetRef, className }) => {
  const [metrics, setMetrics] = useState<Metrics>(HIDDEN);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ startY: number; startScroll: number } | null>(null);
  const frame = useRef<number | null>(null);

  const measure = useCallback(() => {
    const el = targetRef.current;
    if (!el) return;
    if (!isScrollableY(el)) {
      setMetrics((prev) => (prev.scrollable ? HIDDEN : prev));
      return;
    }
    const { clientHeight: track, scrollHeight, scrollTop } = el;
    const thumbHeight = Math.max(MIN_THUMB, (track / scrollHeight) * track);
    const maxScroll = scrollHeight - track;
    const maxThumb = track - thumbHeight;
    const thumbTop = maxScroll > 0 ? (scrollTop / maxScroll) * maxThumb : 0;
    setMetrics({ thumbTop, thumbHeight, scrollable: true });
  }, [targetRef]);

  // Coalesce bursts of scroll/resize/mutation events into a single measure per
  // frame. measure() reads layout (scrollHeight, getComputedStyle) and commits
  // React state; running it inline on every scroll event forces a synchronous
  // reflow + re-render per event, which janks badly when the frame is already
  // heavy (e.g. the mobile column repainting the masked ascii art).
  const scheduleMeasure = useCallback(() => {
    if (frame.current != null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      measure();
    });
  }, [measure]);

  // Keep the thumb synced with scroll position, viewport size, and content
  // changes (route swaps, the intro scramble mutating the DOM, etc.).
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    measure();
    el.addEventListener('scroll', scheduleMeasure, { passive: true });
    const ro = new ResizeObserver(scheduleMeasure);
    ro.observe(el);
    const mo = new MutationObserver(scheduleMeasure);
    mo.observe(el, { childList: true, subtree: true, characterData: true });
    window.addEventListener('resize', scheduleMeasure);
    return () => {
      el.removeEventListener('scroll', scheduleMeasure);
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener('resize', scheduleMeasure);
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, [targetRef, measure, scheduleMeasure]);

  const onThumbDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const el = targetRef.current;
      if (!el) return;
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      drag.current = { startY: e.clientY, startScroll: el.scrollTop };
      setDragging(true);
    },
    [targetRef],
  );

  const onThumbMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const el = targetRef.current;
      const start = drag.current;
      if (!el || !start) return;
      const { clientHeight: track, scrollHeight } = el;
      const thumbHeight = Math.max(MIN_THUMB, (track / scrollHeight) * track);
      const maxThumb = track - thumbHeight;
      const maxScroll = scrollHeight - track;
      const ratio = maxThumb > 0 ? maxScroll / maxThumb : 0;
      el.scrollTop = start.startScroll + (e.clientY - start.startY) * ratio;
    },
    [targetRef],
  );

  const endDrag = useCallback(() => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
  }, []);

  // The track is pointer-events-none so it never swallows a wheel gesture; the
  // thumb does, so forward wheel deltas back to the content while hovering it.
  const onWheel = useCallback(
    (e: WheelEvent<HTMLDivElement>) => {
      const el = targetRef.current;
      if (el) el.scrollTop += e.deltaY;
    },
    [targetRef],
  );

  if (!metrics.scrollable) return null;

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-y-0 right-0 z-[2] w-2.5 border-l border-fg-4/60 bg-bg-0/30',
        className,
      )}
    >
      <div
        onPointerDown={onThumbDown}
        onPointerMove={onThumbMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onWheel={onWheel}
        style={{ top: metrics.thumbTop, height: metrics.thumbHeight }}
        className={cn(
          'pointer-events-auto absolute inset-x-0 bg-fg-3 transition-colors',
          // Faint CRT-line texture so the thumb reads as a phosphor block.
          '[background-image:repeating-linear-gradient(0deg,transparent_0_2px,rgba(0,0,0,0.22)_2px_3px)]',
          dragging ? 'cursor-grabbing bg-amber' : 'cursor-grab hover:bg-fg-2',
        )}
      />
    </div>
  );
};
