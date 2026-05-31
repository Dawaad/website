// Skeleton measurement: derive one "bone" per visible text line of a rendered
// section, so the loading skeleton matches the real content's shape.

const CHARS = '01<>/\\|_-=+*#%&@.:;{}[]abcdef░▒▓█';
// Approx advance width of JetBrains Mono at 12px (0.6em).
const CHAR_W = 7.2;

export interface SkeletonBone {
  left: number;
  top: number;
  width: number;
  height: number;
  cols: number;
}

export function randomLine(cols: number): string {
  let s = '';
  for (let i = 0; i < cols; i++) s += CHARS[(Math.random() * CHARS.length) | 0];
  return s;
}

export type DecodeDir = 'ltr' | 'rtl';

/**
 * clip-path that hides the already-"decoded" side of a scramble layer, so the
 * jumble appears to resolve from one edge to the other. `progress` 0 keeps the
 * whole layer; 1 hides all of it. ltr decodes left→right, rtl right→left.
 */
export function decodeClip(progress: number, dir: DecodeDir = 'ltr'): string {
  const pct = Math.round(Math.min(1, Math.max(0, progress)) * 100);
  return dir === 'ltr' ? `inset(0 0 0 ${pct}%)` : `inset(0 ${pct}% 0 0)`;
}

function intersects(a: SkeletonBone, b: SkeletonBone): boolean {
  return (
    a.left < b.left + b.width &&
    b.left < a.left + a.width &&
    a.top < b.top + b.height &&
    b.top < a.top + a.height
  );
}

export interface SkeletonSplit {
  /** Bones unique to the outgoing page. */
  aOnly: SkeletonBone[];
  /** Overlapping region, drawn once (from A) so bones never conflict. */
  shared: SkeletonBone[];
  /** Bones unique to the incoming page. */
  bOnly: SkeletonBone[];
}

/**
 * Partitions two bone sets into non-overlapping groups so the union of both
 * skeletons can be shown without any two bones occupying the same pixels.
 * The shared region is represented by A's bones; B's overlapping bones are
 * dropped (already covered), leaving A-only, shared, and B-only as disjoint.
 */
export function splitBones(a: SkeletonBone[], b: SkeletonBone[]): SkeletonSplit {
  const aOnly: SkeletonBone[] = [];
  const shared: SkeletonBone[] = [];
  for (const bone of a) {
    (b.some((other) => intersects(bone, other)) ? shared : aOnly).push(bone);
  }
  const bOnly = b.filter((bone) => !a.some((other) => intersects(bone, other)));
  return { aOnly, shared, bOnly };
}

/**
 * Measures every text line inside `content` and returns one bone per line
 * (position + width), relative to `content`'s own top-left corner.
 */
export function measureSkeleton(
  content: HTMLElement,
  charW = CHAR_W,
  skipStatic = false,
): SkeletonBone[] {
  const base = content.getBoundingClientRect();
  const bones: SkeletonBone[] = [];
  const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      skipStatic && node.parentElement?.closest('[data-static]')
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT,
  });

  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (!node.textContent?.trim()) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    const rects = range.getClientRects();
    for (let i = 0; i < rects.length; i++) {
      const r = rects[i];
      if (r.width < 3 || r.height < 3) continue;
      bones.push({
        left: r.left - base.left,
        top: r.top - base.top,
        width: r.width,
        height: r.height,
        cols: Math.max(1, Math.round(r.width / charW)),
      });
    }
  }
  return bones;
}
