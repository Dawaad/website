import type { ComponentType, ReactNode } from 'react';

import { Panel } from '@/components/feature-modules/portfolio/components/panel';

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

  return (
    <>
      <Panel
        label={detailLabel}
        accent={
          <span>
            &nbsp;{(selected + 1).toString().padStart(2, '0')}/
            {items.length.toString().padStart(2, '0')}
          </span>
        }
      >
        {sel ? (
          renderDetail(sel)
        ) : (
          <div className="py-6 text-center text-[12px] text-fg-3 before:text-fg-4 before:content-['~_']">
            no selection
          </div>
        )}
      </Panel>
      <Panel label={listLabel} meta={<span>{items.length} entries</span>}>
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
              onClick={() => setSelected(i)}
            />
          ))}
        </div>
      </Panel>
    </>
  );
}
