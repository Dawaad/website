'use client';

import type { FC } from 'react';

import { Crossfade } from '@/components/feature-modules/portfolio/components/background/crossfade';
import { ORIGINAL_SIZES, WALLPAPERS } from '@/components/feature-modules/portfolio/config/wallpapers';
import type { SchemeName } from '@/lib/types/portfolio';

interface ImageViewerPanelProps {
  scheme: SchemeName;
  /** Gate from {@link useWallpaperEnabled}; when false no asset is fetched. */
  enabled: boolean;
}

/**
 * Faux `imv` image-viewer terminal: shows the active scheme's photo (the same
 * image as the full-bleed wallpaper). Null → empty viewer (flat schemes have no
 * photo). Crossfades per scheme via the shared pipeline.
 */
export const ImageViewerPanel: FC<ImageViewerPanelProps> = ({ scheme, enabled }) => {
  const image = enabled ? WALLPAPERS[scheme] : null;

  return (
    <div className="relative h-full w-full overflow-hidden bg-bg-0">
      <Crossfade image={image} sizes={ORIGINAL_SIZES} imgClassName="object-cover" />
    </div>
  );
};
