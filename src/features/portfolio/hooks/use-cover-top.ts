import { usePathname } from 'next/navigation';
import { useCallback, useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';

/**
 * Natural height of a pane-header strip. Seeds the cover so the header reads as
 * grounded on the first painted frame, before the suspended content commits and
 * the real strips can be measured (which then refines it).
 */
const INITIAL_COVER_TOP = 33;

/**
 * Bottom edge (px, relative to the content box) of the top-most row of static
 * pane-header strips, so every opaque cover (boot, intro scramble, route
 * transition) can sit below them and keep them visible.
 *
 * Re-measured per route since the strips belong to the content, and on any
 * subtree commit because the route content mounts behind a Suspense boundary
 * (sections call `useSearchParams`) and so its strips can commit a frame or two
 * after the effect first runs.
 */
export function useCoverTop(contentRef: RefObject<HTMLElement | null>): number {
  const [coverTop, setCoverTop] = useState(INITIAL_COVER_TOP);
  const pathname = usePathname();

  const measureCover = useCallback(() => {
    const content = contentRef.current;
    if (!content) return;
    const base = content.getBoundingClientRect();
    // Only the strips on the top-most row count: on mobile the panels stack, so
    // lower panels' strips sit far down the scroll and must not push the cover
    // off-screen (which would expose the real content during the intro).
    const strips = [...content.querySelectorAll('[data-static]')]
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { top: r.top - base.top, bottom: r.bottom - base.top, height: r.height };
      })
      .filter((s) => s.height > 0);
    // Keep the seeded/last-good height until the real strips commit, so the
    // header stays grounded instead of collapsing to 0 during the intro.
    if (strips.length === 0) return;
    const minTop = Math.min(...strips.map((s) => s.top));
    const top = strips
      .filter((s) => s.top <= minTop + s.height)
      .reduce((m, s) => Math.max(m, s.bottom), 0);
    setCoverTop(top);
  }, [contentRef]);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    measureCover();
    const observer = new MutationObserver(measureCover);
    observer.observe(content, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname, measureCover, contentRef]);

  return coverTop;
}
