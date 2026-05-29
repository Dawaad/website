'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { FC, ReactNode } from 'react';

import { DESKTOP_WINDOWS, type DesktopWindowId } from '@/components/feature-modules/portfolio/config/desktop-windows';

interface WindowManagerContextType {
  isOpen: (id: DesktopWindowId) => boolean;
  /** Reveal a closed/minimised window. */
  show: (id: DesktopWindowId) => void;
  /** Close or minimise a window (both hide it; the dock marks it inactive). */
  hide: (id: DesktopWindowId) => void;
  /** Flip a window between open and hidden — the dock's primary action. */
  toggle: (id: DesktopWindowId) => void;
}

interface WindowManagerProviderProps {
  children: ReactNode;
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

const ALL_OPEN = new Set<DesktopWindowId>(DESKTOP_WINDOWS.map((w) => w.id));

/** Tracks which backdrop terminals are open, shared by the dock and the desktop. */
export const WindowManagerProvider: FC<WindowManagerProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<Set<DesktopWindowId>>(() => new Set(ALL_OPEN));

  const show = useCallback((id: DesktopWindowId) => {
    setOpen((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const hide = useCallback((id: DesktopWindowId) => {
    setOpen((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggle = useCallback((id: DesktopWindowId) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const value = useMemo<WindowManagerContextType>(
    () => ({ isOpen: (id) => open.has(id), show, hide, toggle }),
    [open, show, hide, toggle],
  );

  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>;
};

export function useWindowManager(): WindowManagerContextType {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return ctx;
}
