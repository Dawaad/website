'use client';

import { useCallback, useEffect, useReducer } from 'react';

import type { ResponsiveImage } from '@/components/feature-modules/portfolio/config/wallpapers';

/** A mounted crossfade layer, identified by a stable key (its smallest webp src). */
export interface WallpaperLayer {
  key: string;
  image: ResponsiveImage;
}

export interface WallpaperCrossfade {
  /** The fully-visible base layer (null → nothing committed yet / flat scheme). */
  current: WallpaperLayer | null;
  /** The layer loading on top; fades in once `incomingLoaded`, then commits. */
  incoming: WallpaperLayer | null;
  /** Has `incoming` finished decoding (i.e. is it safe to fade in)? */
  incomingLoaded: boolean;
  /** Call from the incoming layer's `onLoad`. Ignored if the layer was superseded. */
  handleLoad: (key: string) => void;
  /** Call from the incoming layer's `onError`. Drops it, keeping `current`. */
  handleError: (key: string) => void;
  /** Call when the incoming fade completes (transitionend). Promotes it to `current`. */
  commit: (key: string) => void;
}

/** Stable identity for an image: its first (smallest) webp variant path. */
const keyOf = (image: ResponsiveImage | null): string | null => image?.webp[0]?.src ?? null;

interface State {
  current: WallpaperLayer | null;
  incoming: WallpaperLayer | null;
  incomingLoaded: boolean;
}

type Action =
  | { type: 'target'; image: ResponsiveImage | null }
  | { type: 'load'; key: string }
  | { type: 'error'; key: string }
  | { type: 'commit'; key: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'target': {
      const key = keyOf(action.image);
      // Flat scheme (null): wipe to vignette-only.
      if (key === null || action.image === null) {
        return { current: null, incoming: null, incomingLoaded: false };
      }
      // Switched back to what's already shown: cancel any pending incoming.
      if (state.current?.key === key) {
        return { ...state, incoming: null, incomingLoaded: false };
      }
      // Already targeting this incoming: leave its load state intact.
      if (state.incoming?.key === key) return state;
      // New target: stage it, supersedes any prior (unloaded) incoming.
      return { ...state, incoming: { key, image: action.image }, incomingLoaded: false };
    }
    // Latest-wins: only the current incoming's events count.
    case 'load':
      return state.incoming?.key === action.key ? { ...state, incomingLoaded: true } : state;
    case 'error':
      return state.incoming?.key === action.key
        ? { ...state, incoming: null, incomingLoaded: false }
        : state;
    case 'commit':
      return state.incoming?.key === action.key && state.incomingLoaded
        ? { current: state.incoming, incoming: null, incomingLoaded: false }
        : state;
  }
};

/**
 * Drives a two-layer crossfade between per-scheme images. Only the current and
 * (at most) one incoming layer are ever live, so memory stays bounded and the
 * non-active scheme assets are never fetched. Out-of-order loads from rapid
 * switching are discarded (latest-wins); load failures fall back to `current`.
 */
export const useWallpaperCrossfade = (image: ResponsiveImage | null): WallpaperCrossfade => {
  const [state, dispatch] = useReducer(reducer, {
    current: null,
    incoming: null,
    incomingLoaded: false,
  });

  // Re-target only when the image's identity changes, not on every render.
  const targetKey = keyOf(image);
  useEffect(() => {
    dispatch({ type: 'target', image });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetKey]);

  const handleLoad = useCallback((key: string) => dispatch({ type: 'load', key }), []);
  const handleError = useCallback((key: string) => dispatch({ type: 'error', key }), []);
  const commit = useCallback((key: string) => dispatch({ type: 'commit', key }), []);

  return { ...state, handleLoad, handleError, commit };
};
