"use client";

import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";

import {
  decodeClip,
  randomLine,
  type DecodeDir,
  type SkeletonBone,
} from "@/src/shared/lib/skeleton.util";
import { cn } from "@/src/shared/lib/utils";

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
export const AsciiSkeleton: FC<AsciiSkeletonProps> = ({
  bones,
  visible,
  fontSize = 12,
  decode = 0,
  decodeDir = "ltr",
}) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (bones.length === 0) return;
    const id = setInterval(() => setTick((t) => t + 1), 60);
    return () => clearInterval(id);
  }, [bones.length]);

  // Regenerate the scramble only on the 60ms tick (or when bones change), not
  // on every `decode` change. During the intro sweep `decode` updates ~60fps,
  // which would otherwise re-roll every glyph 4× too often and replace every
  // span's text each frame — fighting the clip-path animation for frames.
  const lines = useMemo(
    () => bones.map((b) => randomLine(b.cols)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bones, tick],
  );

  if (bones.length === 0) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-30 overflow-hidden font-mono text-fg-3 transition-opacity duration-150",
        visible ? "opacity-100" : "opacity-0",
      )}
      style={{
        fontSize,
        clipPath: decode > 0 ? decodeClip(decode, decodeDir) : undefined,
      }}
    >
      {bones.map((b, i) => (
        <span
          key={i}
          className="absolute select-none overflow-hidden whitespace-pre"
          style={{
            left: b.left,
            top: b.top,
            width: b.width,
            height: b.height,
            lineHeight: `${b.height}px`,
          }}
        >
          {lines[i]}
        </span>
      ))}
    </div>
  );
};
