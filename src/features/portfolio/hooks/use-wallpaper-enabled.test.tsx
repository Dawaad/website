import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useWallpaperEnabled } from './use-wallpaper-enabled';

interface FakeMq {
  matches: boolean;
  listeners: Array<() => void>;
}
let mq: FakeMq;

const setSaveData = (v: boolean) => {
  Object.defineProperty(navigator, 'connection', {
    value: { saveData: v },
    configurable: true,
  });
};

beforeEach(() => {
  mq = { matches: true, listeners: [] };
  setSaveData(false);
  vi.stubGlobal('matchMedia', () => ({
    get matches() {
      return mq.matches;
    },
    addEventListener: (_: string, cb: () => void) => mq.listeners.push(cb),
    removeEventListener: () => {},
  }));
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useWallpaperEnabled', () => {
  it('is enabled on desktop without Save-Data', () => {
    const { result } = renderHook(() => useWallpaperEnabled());
    expect(result.current).toBe(true);
  });

  it('is disabled below the desktop breakpoint (no wasted mobile fetch)', () => {
    mq.matches = false;
    const { result } = renderHook(() => useWallpaperEnabled());
    expect(result.current).toBe(false);
  });

  it('is disabled when the user has Save-Data on', () => {
    setSaveData(true);
    const { result } = renderHook(() => useWallpaperEnabled());
    expect(result.current).toBe(false);
  });

  it('reacts to crossing the breakpoint', () => {
    const { result } = renderHook(() => useWallpaperEnabled());
    expect(result.current).toBe(true);
    act(() => {
      mq.matches = false;
      mq.listeners.forEach((cb) => cb());
    });
    expect(result.current).toBe(false);
  });
});
