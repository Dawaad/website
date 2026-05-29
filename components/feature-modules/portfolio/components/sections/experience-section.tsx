'use client';

import type { FC } from 'react';

import { ExperienceRow } from '@/components/feature-modules/portfolio/components/sections/experience-row';
import { MasterDetail } from '@/components/feature-modules/portfolio/components/sections/master-detail';
import { useListNavigation } from '@/components/feature-modules/portfolio/hooks/use-list-navigation';
import { portfolioContent } from '@/components/feature-modules/portfolio/service/portfolio-content';
import type { ExperienceEntry } from '@/lib/types/portfolio';

export const ExperienceSection: FC = () => {
  const { selected, open, opened, close } = useListNavigation(portfolioContent.experience);
  return (
    <MasterDetail<ExperienceEntry>
      detailLabel="experience.detail"
      listLabel="~/experience"
      listCmd="cat experience.log | sort -r"
      items={portfolioContent.experience}
      selected={selected}
      open={open}
      opened={opened}
      close={close}
      RowComponent={ExperienceRow}
      renderDetail={(sel) => (
        <div className="text-[13px] leading-[1.65] text-fg-1">
          <div className="mb-[14px] flex items-baseline justify-between gap-3 border-b border-dashed border-fg-4 pb-3">
            <span className="min-w-0 flex-1 break-words text-[16px] font-semibold text-fg-0">
              {sel.org}
            </span>
            <span className="flex-none whitespace-nowrap text-[11px] tracking-[0.06em] text-fg-3">
              {sel.date}
            </span>
          </div>
          <div className="mb-4 text-[12px] text-fg-2">
            {sel.role} · {sel.tag}
          </div>
          <div className="text-fg-1">
            <p className="mb-3 max-w-[56ch]">{sel.detail}</p>
          </div>
          <div className="mt-[22px] mb-[14px] whitespace-pre text-[11px] leading-[1.3] text-fg-3">
            {`────────────────────────────────────────
  ${sel.tag}   ${sel.date}
────────────────────────────────────────`}
          </div>
          <div className="mt-[18px] flex flex-wrap items-center gap-2.5 text-[11px] text-fg-3">
            <span className="text-amber">&gt;</span>
            <span>
              press <span className="text-amber">↑↓</span> to walk the list
            </span>
          </div>
        </div>
      )}
    />
  );
}
