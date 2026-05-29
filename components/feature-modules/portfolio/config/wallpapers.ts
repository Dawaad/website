import type { ImageVariant } from "@/lib/cdn-image-loader";
import type { SchemeName } from "@/lib/types/portfolio";

/**
 * Per-scheme background imagery — the single source of truth for which assets
 * exist and where they live on the CDN. One photographic set per scheme drives
 * both uses: the full-bleed wallpaper behind the desktop and the `imv` viewer
 * window. `null` means the scheme renders flat with no fetched image (beige).
 *
 * Typed against `SchemeName`, so adding a scheme is a compile error until its
 * imagery decision (image set or explicit `null`) is recorded.
 *
 * To wire real assets: upload `bg/<scheme>/original-<width>.webp` to the CDN and
 * set `NEXT_PUBLIC_CDN_URL`. The full-bleed wallpaper picks the larger widths
 * (sizes 100vw); the small viewer picks the smaller ones (sizes ~30vw).
 */

/** Width ladder, laptop → 4K → 21:9 ultrawide; small end also serves the viewer panel. */
export const IMAGE_WIDTHS = [640, 960, 1280, 1920, 2560, 3440, 3840] as const;

/** `sizes` hint for the full-bleed wallpaper. */
export const WALLPAPER_SIZES = "100vw";

/** `sizes` hint for the viewer panel — roughly a third of the viewport on desktop, nil on mobile. */
export const ORIGINAL_SIZES = "(min-width: 768px) 30vw, 0px";

/** A responsive image with a required webp ladder and an optional avif ladder. */
export interface ResponsiveImage {
  webp: ImageVariant[];
  avif?: ImageVariant[];
}

const photo = (scheme: SchemeName): ResponsiveImage => ({
  webp: IMAGE_WIDTHS.map((width) => ({
    src: `bg/${scheme}/original-${width}.webp`,
    width,
  })),
});

export const WALLPAPERS: Record<SchemeName, ResponsiveImage | null> = {
  beige: null,
  phosphor: photo("phosphor"),
  amber: photo("amber"),
  blueprint: null,
  mono: photo("mono"),
  moonlit: photo("moonlit"),
};
