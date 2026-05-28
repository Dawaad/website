import { useEffect } from 'react';

import { TABS } from '@/components/feature-modules/portfolio/config/tabs';

/** `1`–`5` jump to each section's route via the transition. Ignores typing. */
export function useRouteTabKeys(navigate: (href: string) => void): void {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return;

      if (/^[1-5]$/.test(e.key)) {
        const tab = TABS[Number.parseInt(e.key, 10) - 1];
        if (tab) {
          navigate(tab.href);
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);
}
