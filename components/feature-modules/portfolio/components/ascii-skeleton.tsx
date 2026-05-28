'use client';

import { useEffect, useState } from 'react';

import {
  decodeClip,
  randomLine,
  type DecodeDir,
  type SkeletonBone,
} from '@/components/feature-modules/portfolio/util/skeleton.util';
import { cn } from '@/lib/util/utils';

interface AsciiSkeletonProps {
  bones: SkeletonBone[];
  visible: boolean;
  fontSize?: number;
  /** 0 = fully scrambled, 1 = fully resolved; sweeps the jumble away by edge. */
  decode?: number;
  decodeDir?: DecodeDir;
}

/**
 * An opaque, content-shaped ASCII skeleton layer. Each bone is a line of
 * scrambling glyphs; the whole layer cross-fades via `visible`. When `decode`
 * advances, the jumble is wiped away from one edge so the real content beneath
 * appears to undecode into place.
 */
export function AsciiSkeleton({ bones, visible, fontSize = 12, decode = 0, decodeDir = 'ltr' }: AsciiSkeletonProps) {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (bones.length === 0) return;
    const id = setInterval(() => setTick((t) => t + 1), 60);
    return () => clearInterval(id);
  }, [bones.length]);

  if (bones.length === 0) return null;

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 z-30 overflow-hidden font-mono text-fg-3 transition-opacity duration-150',
        visible ? 'opacity-100' : 'opacity-0',
      )}
      style={{ fontSize, clipPath: decode > 0 ? decodeClip(decode, decodeDir) : undefined }}
    >
      {bones.map((b, i) => (
        <span
          key={i}
          className="absolute select-none overflow-hidden whitespace-pre"
          style={{ left: b.left, top: b.top, width: b.width, height: b.height, lineHeight: `${b.height}px` }}
        >
          {randomLine(b.cols)}
        </span>
      ))}
    </div>
  );
}
