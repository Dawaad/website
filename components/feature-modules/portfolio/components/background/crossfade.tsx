'use client';

import type { FC } from 'react';

import { useWallpaperCrossfade, type WallpaperLayer } from '@/components/feature-modules/portfolio/hooks/use-wallpaper-crossfade';
import type { ResponsiveImage } from '@/components/feature-modules/portfolio/config/wallpapers';
import { buildSrcSet, getCdnUrl } from '@/lib/cdn-image-loader';
import { cn } from '@/lib/util/utils';

interface CrossfadeProps {
  /** The active scheme's image, or null for a flat scheme (renders nothing). */
  image: ResponsiveImage | null;
  /** `sizes` hint for responsive selection (e.g. "100vw" or a panel-width query). */
  sizes: string;
  /** Per-image classes (object-fit etc.). Layers are absolutely positioned. */
  imgClassName?: string;
}

/**
 * Two-layer crossfade renderer shared by the full-bleed wallpaper and the
 * terminal image viewer. Mounts at most the current + one incoming `<picture>`,
 * fades the incoming in once decoded, then commits it on transition end (which
 * unmounts the old layer — bounded memory). Latest-wins + error fallback are
 * owned by {@link useWallpaperCrossfade}. Render inside a `relative` parent.
 */
export const Crossfade: FC<CrossfadeProps> = ({ image, sizes, imgClassName }) => {
  const { current, incoming, incomingLoaded, handleLoad, handleError, commit } =
    useWallpaperCrossfade(image);

  const layer = (entry: WallpaperLayer, opacity: string, handlers = false) => (
    <picture key={entry.key} className="absolute inset-0 block">
      {entry.image.avif && (
        <source srcSet={buildSrcSet(entry.image.avif)} type="image/avif" sizes={sizes} />
      )}
      <source srcSet={buildSrcSet(entry.image.webp)} type="image/webp" sizes={sizes} />
      <img
        src={getCdnUrl(entry.image.webp[0].src)}
        alt=""
        aria-hidden
        decoding="async"
        fetchPriority="low"
        className={cn(
          'h-full w-full transition-opacity duration-700 ease-out',
          imgClassName,
          opacity,
        )}
        onLoad={handlers ? () => handleLoad(entry.key) : undefined}
        onError={handlers ? () => handleError(entry.key) : undefined}
        onTransitionEnd={handlers ? () => commit(entry.key) : undefined}
      />
    </picture>
  );

  return (
    <>
      {current && layer(current, 'opacity-100')}
      {incoming && layer(incoming, incomingLoaded ? 'opacity-100' : 'opacity-0', true)}
    </>
  );
};
