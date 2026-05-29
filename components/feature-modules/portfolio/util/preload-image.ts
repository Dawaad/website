import {
  ORIGINAL_SIZES,
  WALLPAPER_SIZES,
  WALLPAPERS,
  type ResponsiveImage,
} from '@/components/feature-modules/portfolio/config/wallpapers';
import type { SchemeName } from '@/lib/types/portfolio';
import { buildSrcSet, getCdnUrl } from '@/lib/cdn-image-loader';

/**
 * Best-effort warm of a responsive image's webp ladder into the browser cache,
 * so a subsequent theme switch crossfades instantly. Driven by hover/focus on
 * scheme controls (intent-preload) — keeps loading lazy while hiding latency.
 *
 * No-op for a flat scheme (null) or non-DOM environments. Warms webp only; any
 * avif ladder (if added later) is left to resolve on actual render.
 */
export const preloadResponsiveImage = (
  image: ResponsiveImage | null,
  sizes: string,
): void => {
  if (!image || image.webp.length === 0 || typeof Image === 'undefined') return;

  const el = new Image();
  el.sizes = sizes;
  el.srcset = buildSrcSet(image.webp);
  el.src = getCdnUrl(image.webp[0].src);
  // Decode off the main thread; ignore failures (aborted preloads are fine).
  void el.decode?.().catch(() => {});
};

/**
 * Warm both of a scheme's assets (wallpaper + viewer preview) ahead of a switch.
 * Wired to hover/focus on the desktop scheme switcher so the crossfade is
 * instant; flat schemes (null slots) warm nothing.
 */
export const preloadScheme = (scheme: SchemeName): void => {
  const image = WALLPAPERS[scheme];
  // One set, two consumers: warm both the wallpaper (large) and viewer (small) tiers.
  preloadResponsiveImage(image, WALLPAPER_SIZES);
  preloadResponsiveImage(image, ORIGINAL_SIZES);
};
