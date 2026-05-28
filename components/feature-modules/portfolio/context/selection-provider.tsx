'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface SelectionValue {
  sel: number;
  total: number | null;
}

interface SelectionContextType {
  value: SelectionValue;
  set: (value: SelectionValue) => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

/** Holds the active section's selected-row index + entry count for the status bar. */
export function SelectionProvider({ children }: { children: ReactNode }) {
  const [value, set] = useState<SelectionValue>({ sel: 0, total: null });
  return <SelectionContext.Provider value={{ value, set }}>{children}</SelectionContext.Provider>;
}

function useSelectionContext() {
  const ctx = useContext(SelectionContext);
  if (!ctx) {
    throw new Error('useSelectionContext must be used within a SelectionProvider');
  }
  return ctx;
}

export function useSelectionValue(): SelectionValue {
  return useSelectionContext().value;
}

/** Reports the mounted section's selection to the status bar. */
export function useReportSelection(sel: number, total: number | null): void {
  const { set } = useSelectionContext();
  useEffect(() => {
    set({ sel, total });
  }, [sel, total, set]);
}
