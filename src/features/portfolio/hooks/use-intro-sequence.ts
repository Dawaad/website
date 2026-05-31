import type { RefObject } from "react";
import { useCallback, useEffect, useState } from "react";

import {
  decodeClip,
  measureSkeleton,
  type DecodeDir,
  type SkeletonBone,
} from "@/src/shared/lib/skeleton.util";

export type IntroPhase = "boot" | "scramble" | "done";

/** Pure-jumble window before the decode sweep begins. */
const SCRAMBLE_MS = 200;
/** Latter-end window over which the jumble undecodes into the real content. */
const DECODE_MS = 420;
/** Direction the intro jumble resolves; flip to 'rtl' to sweep right→left. */
const DECODE_DIR: DecodeDir = "ltr";

interface IntroSequence {
  /** Current intro phase; advances boot → scramble → done and never reverts. */
  intro: IntroPhase;
  /** Content-shaped bones the scramble layer draws while decoding. */
  introBones: SkeletonBone[];
  /** Decode progress 0→1 driving the undecode sweep. */
  introDecode: number;
  /** clip-path applied to the real content during the intro (undefined once done). */
  introClip: string | undefined;
  /** Direction the scramble layer should decode in. */
  decodeDir: DecodeDir;
  /** Advance out of the boot phase into the scramble; call from the boot overlay. */
  beginScramble: () => void;
}

/**
 * Drives the one-shot intro: the real content is clipped to the already-decoded
 * edge (the complement of the skeleton's wipe) rather than hidden under an
 * opaque cover, so the shell's own glass/blur stays visible the whole time and
 * the boot state matches the settled state. At boot (introDecode 0) it is fully
 * clipped away; the decode sweep reveals it edge-to-edge. A nested cover can't
 * be glassy (its backdrop-filter can't see past the shell's), hence the clip.
 */
export function useIntroSequence(
  contentRef: RefObject<HTMLElement | null>,
): IntroSequence {
  const [intro, setIntro] = useState<IntroPhase>("boot");
  const [introBones, setIntroBones] = useState<SkeletonBone[]>([]);
  const [introDecode, setIntroDecode] = useState(0);

  const introClip =
    intro === "done"
      ? undefined
      : decodeClip(1 - introDecode, DECODE_DIR === "ltr" ? "rtl" : "ltr");

  // Measure the real content's shape into the intro jumble during boot, so the
  // bones are ready the instant the scramble starts. The section mounts behind
  // Suspense, so this probes every frame until the bones exist — the decode is
  // gated on them, so the sweep never reveals raw, unjumbled content.
  useEffect(() => {
    if (intro === "done" || introBones.length > 0) return;
    let frame = 0;
    const probe = () => {
      const bones = contentRef.current
        ? measureSkeleton(contentRef.current)
        : [];
      if (bones.length > 0) {
        setIntroBones(bones);
        return;
      }
      frame = requestAnimationFrame(probe);
    };
    frame = requestAnimationFrame(probe);
    return () => cancelAnimationFrame(frame);
  }, [intro, introBones.length, contentRef]);

  // After the boot sequence, hold the pure-jumble window, then undecode the
  // jumble edge-to-edge into the real content before the final reveal. Gated on
  // the content-shaped bones existing, so the sweep never reveals raw content.
  useEffect(() => {
    if (intro !== "scramble" || introBones.length === 0) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      setIntroDecode(
        Math.min(1, Math.max(0, (elapsed - SCRAMBLE_MS) / DECODE_MS)),
      );
      if (elapsed >= SCRAMBLE_MS + DECODE_MS) {
        setIntro("done");
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [intro, introBones.length]);

  const beginScramble = useCallback(() => setIntro("scramble"), []);

  return {
    intro,
    introBones,
    introDecode,
    introClip,
    decodeDir: DECODE_DIR,
    beginScramble,
  };
}
