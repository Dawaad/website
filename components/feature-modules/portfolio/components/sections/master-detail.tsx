'use client';

import { useState } from 'react';
import type { ComponentType, ReactNode } from 'react';

import { Panel } from '@/components/feature-modules/portfolio/components/panel';
import { cn } from '@/lib/util/utils';

export interface RowProps<T> {
  item: T;
  active: boolean;
  onClick: () => void;
}

interface MasterDetailProps<T> {
  detailLabel: string;
  listLabel: string;
  listCmd: string;
  items: T[];
  selected: number;
  setSelected: (index: number) => void;
  RowComponent: ComponentType<RowProps<T>>;
  renderDetail: (item: T) => ReactNode;
}

/** Two-panel master/detail layout shared by experience, projects, and posts. */
export function MasterDetail<T>({
  detailLabel,
  listLabel,
  listCmd,
  items,
  selected,
  setSelected,
  RowComponent,
  renderDetail,
}: MasterDetailProps<T>) {
  const sel = items[selected] ?? items[0];
  // Mobile shows one pane at a time; the switch below flips between them.
  const [view, setView] = useState<'list' | 'detail'>('list');
  const count = (
    <>
      {(selected + 1).toString().padStart(2, '0')}/{items.length.toString().padStart(2, '0')}
    </>
  );

  return (
    <>
      {/* Pane switch — mobile only; sits above the active pane in the scroll. */}
      <div className="sticky top-0 z-10 flex flex-none border-b border-fg-4 bg-bg-0 text-[11px] uppercase tracking-[0.14em] md:hidden">
        <SwitchTab active={view === 'list'} onClick={() => setView('list')}>
          {listLabel}
        </SwitchTab>
        <SwitchTab active={view === 'detail'} onClick={() => setView('detail')}>
          detail <span className="text-[10px] text-fg-3">{count}</span>
        </SwitchTab>
      </div>

      <Panel
        label={detailLabel}
        accent={<span>&nbsp;{count}</span>}
        className={view === 'list' ? 'max-md:hidden' : undefined}
      >
        {sel ? (
          renderDetail(sel)
        ) : (
          <div className="py-6 text-center text-[12px] text-fg-3 before:text-fg-4 before:content-['~_']">
            no selection
          </div>
        )}
      </Panel>
      <Panel
        label={listLabel}
        meta={<span>{items.length} entries</span>}
        className={view === 'detail' ? 'max-md:hidden' : undefined}
      >
        <div className="mb-2 flex items-center gap-2.5 overflow-hidden whitespace-nowrap border-b border-fg-4 pb-2.5 text-[12px] text-fg-2">
          <span className="text-amber">&gt;</span>
          <span className="min-w-0 truncate text-fg-0">{listCmd}</span>
        </div>
        <div className="flex flex-col">
          {items.map((item, i) => (
            <RowComponent
              key={i}
              item={item}
              active={i === selected}
              onClick={() => {
                setSelected(i);
                setView('detail');
              }}
            />
          ))}
        </div>
      </Panel>
    </>
  );
}

function SwitchTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-1 cursor-pointer select-none items-center justify-center gap-2 border-r border-fg-4 px-3 py-2.5 text-fg-2 last:border-r-0',
        active && 'bg-bg-1 text-amber',
      )}
    >
      <span className="text-[10px] text-fg-3">[</span>
      {children}
      <span className="text-[10px] text-fg-3">]</span>
    </button>
  );
}
