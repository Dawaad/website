'use client';

import { useEffect, useState } from 'react';

/** Wallpapers show only at/above this width — mirrors the `max-md:hidden` desktop gate. */
export const DESKTOP_QUERY = '(min-width: 768px)';

interface SaveDataConnection {
  saveData?: boolean;
}

/**
 * Whether background imagery should be fetched at all. Gates on the desktop
 * breakpoint (the faux-terminal desktop is `max-md:hidden`, and `display:none`
 * does NOT stop `<img>` fetches) and on the user's Save-Data preference, so we
 * never ship multi-MB wallpapers to phones or data-saver clients. SSR-safe:
 * starts disabled, enables after mount, and tracks breakpoint changes.
 */
export const useWallpaperEnabled = (): boolean => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia(DESKTOP_QUERY);
    const saveData =
      (navigator as Navigator & { connection?: SaveDataConnection }).connection?.saveData === true;
    const update = () => setEnabled(mq.matches && !saveData);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return enabled;
};
