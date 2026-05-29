'use client';

import type { FC } from 'react';

import { Crossfade } from '@/components/feature-modules/portfolio/components/background/crossfade';
import { WALLPAPER_SIZES, WALLPAPERS } from '@/components/feature-modules/portfolio/config/wallpapers';
import type { SchemeName } from '@/lib/types/portfolio';

interface WallpaperLayerProps {
  scheme: SchemeName;
  /** Gate from {@link useWallpaperEnabled}; when false no asset is fetched. */
  enabled: boolean;
}

/**
 * Full-bleed wallpaper behind the faux-terminal desktop. Picks the active
 * scheme's image set from the manifest (null → flat scheme, vignette only) and
 * crossfades on switch. Lives at the back of the background stage.
 */
export const WallpaperLayer: FC<WallpaperLayerProps> = ({ scheme, enabled }) => {
  const image = enabled ? WALLPAPERS[scheme] : null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Crossfade image={image} sizes={WALLPAPER_SIZES} imgClassName="object-cover" />
    </div>
  );
};
