'use client';

import { useEffect, useRef, useState } from 'react';
import type { FC, ReactNode } from 'react';

import { AsciiSkeleton } from '@/components/feature-modules/portfolio/components/ascii-skeleton';
import { measureSkeleton, type SkeletonBone } from '@/components/feature-modules/portfolio/util/skeleton.util';
import { cn } from '@/lib/util/utils';

/** Glyph size for the background skeletons — tuned to the small panel fonts. */
const SKELETON_FONT = 9;
/** How long each panel scrambles before its content resolves. */
const SCRAMBLE_MS = 320;

interface ScramblePanelProps {
  children: ReactNode;
  delay: number;
}

/**
 * Boots a single panel: on mount it measures its own rendered content into
 * line-shaped "bones", scrambles them as ASCII glyphs, then (after `delay`)
 * cross-fades the real content in — the same shape-matched jump the main
 * terminal uses for route changes, applied once at load and staggered per pane.
 */
export const ScramblePanel: FC<ScramblePanelProps> = ({ children, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [bones, setBones] = useState<SkeletonBone[]>([]);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (ref.current) setBones(measureSkeleton(ref.current, SKELETON_FONT * 0.6));
    });
    const t = setTimeout(() => setRevealed(true), delay + SCRAMBLE_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [delay]);

  return (
    <div ref={ref} className="relative h-full">
      <div className={cn('h-full transition-opacity duration-300', revealed ? 'opacity-100' : 'opacity-0')}>
        {children}
      </div>
      <AsciiSkeleton bones={bones} visible={!revealed} fontSize={SKELETON_FONT} />
    </div>
  );
};
