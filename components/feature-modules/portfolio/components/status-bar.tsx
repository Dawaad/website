'use client';

import { usePathname } from 'next/navigation';

import { TABS } from '@/components/feature-modules/portfolio/config/tabs';
import { useClock } from '@/components/feature-modules/portfolio/hooks/use-clock';
import { useSelectionValue } from '@/components/feature-modules/portfolio/context/selection-provider';

export function StatusBar() {
  const pathname = usePathname();
  const clock = useClock();
  const { sel, total } = useSelectionValue();
  const tab = TABS.find((t) => t.href === pathname) ?? TABS[0];

  return (
    <div className="relative z-[2] flex flex-none items-center justify-between gap-3 overflow-hidden whitespace-nowrap border-t border-fg-4 bg-bg-0 px-3.5 py-[7px] text-[10.5px] tracking-[0.03em] text-fg-2">
      <div className="flex flex-none items-center gap-3">
        <span>
          ~/portfolio/<span className="text-fg-0">{tab.key}</span>
        </span>
        <span className="text-fg-4">│</span>
        {total != null ? (
          <span>
            {(sel + 1).toString().padStart(2, '0')} / {total.toString().padStart(2, '0')}
          </span>
        ) : (
          <span>1 / 1</span>
        )}
      </div>
      <div className="flex flex-none items-center gap-3">
        <span className="text-fg-1">● online</span>
        <span className="text-fg-4">│</span>
        <span className="whitespace-nowrap">
          <span className="text-amber">↑↓</span>&nbsp;nav
        </span>
        <span className="whitespace-nowrap">
          <span className="text-amber">1-5</span>&nbsp;tabs
        </span>
        <span className="whitespace-nowrap">
          <span className="text-amber">⏎</span>&nbsp;open
        </span>
        <span className="text-fg-4">│</span>
        <span>{clock}</span>
      </div>
    </div>
  );
}
