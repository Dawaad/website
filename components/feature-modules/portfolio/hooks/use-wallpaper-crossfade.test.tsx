import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { ResponsiveImage } from '@/components/feature-modules/portfolio/config/wallpapers';

import { useWallpaperCrossfade } from './use-wallpaper-crossfade';

// Minimal responsive images whose identity is their first webp src.
const img = (scheme: string): ResponsiveImage => ({
  webp: [
    { src: `bg/${scheme}/original-1280.webp`, width: 1280 },
    { src: `bg/${scheme}/original-1920.webp`, width: 1920 },
  ],
});
const keyOf = (scheme: string) => `bg/${scheme}/original-1280.webp`;

const setup = (initial: ResponsiveImage | null) =>
  renderHook(({ image }) => useWallpaperCrossfade(image), {
    initialProps: { image: initial },
  });

describe('useWallpaperCrossfade', () => {
  it('stages a new image as the incoming layer, not yet loaded', () => {
    const { result } = setup(img('phosphor'));
    expect(result.current.current).toBeNull();
    expect(result.current.incoming?.key).toBe(keyOf('phosphor'));
    expect(result.current.incomingLoaded).toBe(false);
  });

  it('marks incoming loaded on handleLoad, then commit promotes it to current', () => {
    const { result } = setup(img('phosphor'));
    act(() => result.current.handleLoad(keyOf('phosphor')));
    expect(result.current.incomingLoaded).toBe(true);

    act(() => result.current.commit(keyOf('phosphor')));
    expect(result.current.current?.key).toBe(keyOf('phosphor'));
    expect(result.current.incoming).toBeNull();
    expect(result.current.incomingLoaded).toBe(false);
  });

  it('does not re-stage when the same image is passed again (no reload)', () => {
    const same = img('phosphor');
    const { result, rerender } = setup(same);
    act(() => result.current.handleLoad(keyOf('phosphor')));
    act(() => result.current.commit(keyOf('phosphor')));

    rerender({ image: same });
    expect(result.current.current?.key).toBe(keyOf('phosphor'));
    expect(result.current.incoming).toBeNull();
  });

  it('latest-wins: a stale load for a superseded image is ignored', () => {
    const { result, rerender } = setup(img('phosphor'));
    // phosphor committed first
    act(() => result.current.handleLoad(keyOf('phosphor')));
    act(() => result.current.commit(keyOf('phosphor')));

    // switch phosphor → amber → blueprint before amber resolves
    rerender({ image: img('amber') });
    rerender({ image: img('blueprint') });
    expect(result.current.incoming?.key).toBe(keyOf('blueprint'));

    // amber's late onLoad must NOT mark the (blueprint) incoming as loaded
    act(() => result.current.handleLoad(keyOf('amber')));
    expect(result.current.incomingLoaded).toBe(false);

    // blueprint's onLoad wins
    act(() => result.current.handleLoad(keyOf('blueprint')));
    expect(result.current.incomingLoaded).toBe(true);
    act(() => result.current.commit(keyOf('blueprint')));
    expect(result.current.current?.key).toBe(keyOf('blueprint'));
  });

  it('commit is a no-op until the incoming image has loaded', () => {
    const { result } = setup(img('phosphor'));
    act(() => result.current.commit(keyOf('phosphor')));
    expect(result.current.current).toBeNull();
    expect(result.current.incoming?.key).toBe(keyOf('phosphor'));
  });

  it('on error, drops the incoming layer and keeps the current one (graceful)', () => {
    const { result, rerender } = setup(img('phosphor'));
    act(() => result.current.handleLoad(keyOf('phosphor')));
    act(() => result.current.commit(keyOf('phosphor')));

    rerender({ image: img('amber') });
    act(() => result.current.handleError(keyOf('amber')));
    expect(result.current.incoming).toBeNull();
    expect(result.current.current?.key).toBe(keyOf('phosphor')); // unchanged, no stall
  });

  it('ignores a stale error for an already-superseded incoming', () => {
    const { result, rerender } = setup(img('amber'));
    rerender({ image: img('blueprint') });
    act(() => result.current.handleError(keyOf('amber')));
    expect(result.current.incoming?.key).toBe(keyOf('blueprint')); // untouched
  });

  it('clears both layers when the active image becomes null (vignette-only)', () => {
    const { result, rerender } = setup(img('phosphor'));
    act(() => result.current.handleLoad(keyOf('phosphor')));
    act(() => result.current.commit(keyOf('phosphor')));

    rerender({ image: null });
    expect(result.current.current).toBeNull();
    expect(result.current.incoming).toBeNull();
  });

  it('cancels a pending incoming when switched back to the current image', () => {
    const { result, rerender } = setup(img('phosphor'));
    act(() => result.current.handleLoad(keyOf('phosphor')));
    act(() => result.current.commit(keyOf('phosphor')));

    rerender({ image: img('amber') }); // amber staged, not loaded
    expect(result.current.incoming?.key).toBe(keyOf('amber'));
    rerender({ image: img('phosphor') }); // back to current before amber loads
    expect(result.current.incoming).toBeNull();
    expect(result.current.current?.key).toBe(keyOf('phosphor'));
  });
});
