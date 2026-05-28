'use client';

import { MasterDetail } from '@/components/feature-modules/portfolio/components/sections/master-detail';
import { PostRow } from '@/components/feature-modules/portfolio/components/sections/post-row';
import { useListNavigation } from '@/components/feature-modules/portfolio/hooks/use-list-navigation';
import { portfolioContent } from '@/components/feature-modules/portfolio/service/portfolio-content';
import type { Post } from '@/lib/types/portfolio';

export function PostsSection() {
  const { selected, setSelected } = useListNavigation(portfolioContent.posts.length);
  return (
    <MasterDetail<Post>
      detailLabel="post.preview"
      listLabel="~/posts"
      listCmd="tail -f posts/"
      items={portfolioContent.posts}
      selected={selected}
      setSelected={setSelected}
      RowComponent={PostRow}
      renderDetail={(sel) => (
        <div className="text-[13px] leading-[1.65] text-fg-1">
          <div className="mb-[14px] flex items-baseline justify-between gap-3 border-b border-dashed border-fg-4 pb-3">
            <span className="min-w-0 flex-1 break-words text-[16px] font-semibold text-fg-0">
              {sel.title}
            </span>
            <span className="flex-none whitespace-nowrap text-[11px] tracking-[0.06em] text-fg-3">
              {sel.date}
            </span>
          </div>
          <div className="mb-4 text-[12px] text-fg-2">{sel.tag} · 4 min read</div>
          <div className="text-fg-1">
            <p className="mb-3 max-w-[56ch]">{sel.detail}</p>
            <p className="text-[11px] text-fg-3">
              {'// preview only · press ⏎ to open in reader'}
            </p>
          </div>
          <div className="mt-[18px] flex flex-wrap items-center gap-2.5 text-[11px] text-fg-3">
            <span className="text-amber">⏎</span>
            <span>read</span>
            <span className="text-fg-4">·</span>
            <span className="text-amber">r</span>
            <span>raw .md</span>
          </div>
        </div>
      )}
    />
  );
}
