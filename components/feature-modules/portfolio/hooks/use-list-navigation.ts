import { useEffect, useState } from 'react';

import { useReportSelection } from '@/components/feature-modules/portfolio/context/selection-provider';

interface ListNavigation {
  selected: number;
  setSelected: (index: number) => void;
}

/**
 * Owns the selected-row index for a list section: `↑`/`↓` walk the list and the
 * current index/length is reported to the status bar via the selection context.
 */
export function useListNavigation(length: number): ListNavigation {
  const [selected, setSelected] = useState(0);

  useReportSelection(selected, length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [length]);

  return { selected, setSelected };
}
