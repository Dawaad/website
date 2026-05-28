import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

import {
  measureSkeleton,
  splitBones,
  type SkeletonBone,
} from '@/components/feature-modules/portfolio/util/skeleton.util';

export type TransitionPhase = 'idle' | 'out' | 'union' | 'collapse' | 'reveal';

// Kept in lockstep with the `duration-150` opacity transitions on the layers.
const FADE_MS = 150;
const UNION_MS = 130;
const COLLAPSE_MS = 130;
const REVEAL_MS = 150;

interface Bones {
  aOnly: SkeletonBone[];
  shared: SkeletonBone[];
  bOnly: SkeletonBone[];
}

const EMPTY: Bones = { aOnly: [], shared: [], bOnly: [] };

interface PageTransition {
  phase: TransitionPhase;
  aOnly: SkeletonBone[];
  shared: SkeletonBone[];
  bOnly: SkeletonBone[];
  navigate: (href: string) => void;
}

/**
 * Opacity-driven route transition with a union frame:
 *  1. `out`      — current content fades into a skeleton of its own shape.
 *  2. `union`    — the incoming page's exclusive bones fade in alongside it, so
 *                  both skeletons are visible at once. Overlapping regions are
 *                  drawn once (shared group) to avoid any visual conflict.
 *  3. `collapse` — the outgoing-only bones fade out, leaving the incoming shape.
 *  4. `reveal`   — the remaining skeleton + backdrop fade out to expose content.
 */
export function usePageTransition(contentRef: RefObject<HTMLElement | null>): PageTransition {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const [bones, setBones] = useState<Bones>(EMPTY);
  const targetRef = useRef<string | null>(null);
  const outgoingRef = useRef<SkeletonBone[]>([]);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || targetRef.current) return;
      targetRef.current = href;
      const a = contentRef.current ? measureSkeleton(contentRef.current) : [];
      outgoingRef.current = a;
      // Whole outgoing skeleton lives in `aOnly` until B is known.
      setBones({ aOnly: a, shared: [], bOnly: [] });
      // Mount layers at opacity-0 this frame, then fade in next frame.
      requestAnimationFrame(() => setPhase('out'));
    },
    [pathname, contentRef],
  );

  // `out` complete → swap the route (content now fully covered).
  useEffect(() => {
    if (phase !== 'out') return;
    const t = setTimeout(() => {
      if (targetRef.current) router.push(targetRef.current);
    }, FADE_MS);
    return () => clearTimeout(t);
  }, [phase, router]);

  // New route mounted → measure it, split bones, fade B-only in (union).
  useEffect(() => {
    if (phase !== 'out' || !targetRef.current || pathname !== targetRef.current) return;
    const raf = requestAnimationFrame(() => {
      const b = contentRef.current ? measureSkeleton(contentRef.current) : [];
      setBones(splitBones(outgoingRef.current, b));
      requestAnimationFrame(() => setPhase('union'));
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, phase, contentRef]);

  // union → collapse → reveal → idle.
  useEffect(() => {
    if (phase === 'union') {
      const t = setTimeout(() => setPhase('collapse'), UNION_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'collapse') {
      const t = setTimeout(() => setPhase('reveal'), COLLAPSE_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'reveal') {
      const t = setTimeout(() => {
        setPhase('idle');
        setBones(EMPTY);
        outgoingRef.current = [];
        targetRef.current = null;
      }, REVEAL_MS);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return { phase, aOnly: bones.aOnly, shared: bones.shared, bOnly: bones.bOnly, navigate };
}
