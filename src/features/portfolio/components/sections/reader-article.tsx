import { MDXRemote } from "next-mdx-remote/rsc";
import type { FC } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";

import { mdxComponents } from "@/src/features/portfolio/components/mdx/mdx-components";
import { formatDate } from "@/src/shared/lib/posts/format";
import type { PostDoc } from "@/src/shared/types/portfolio";

interface Props {
  post: PostDoc;
}

/** Left-pane article on the reader route: header, inline contents, MDX body. */
export const ReaderArticle: FC<Props> = ({ post }) => (
  <div className="text-[13px] leading-[1.65] text-fg-1">
    <div className="mb-[14px] flex items-baseline justify-between gap-3 border-b border-dashed border-fg-4 pb-3">
      <span className="min-w-0 flex-1 break-words text-[16px] font-semibold text-fg-0">
        {post.title}
      </span>
      <span className="flex-none whitespace-nowrap text-[11px] tracking-[0.06em] text-fg-3">
        {formatDate(post.date)}
      </span>
    </div>
    <div className="mb-5 text-[12px] text-fg-2">
      {post.tag} · {post.readTime} min read
    </div>

    {post.headings.length > 0 && (
      <nav className="mb-6 border-l border-dashed border-fg-4 pl-4 text-[12px]">
        <div className="mb-1.5 text-[11px] uppercase tracking-[0.1em] text-fg-3">
          contents:
        </div>
        <ul className="m-0 list-none p-0">
          {post.headings.map((h) => (
            <li key={h.slug} className={h.level === 3 ? "pl-4" : undefined}>
              <a href={`#${h.slug}`} className="text-fg-2 hover:text-amber">
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )}

    <article className="max-w-[64ch]">
      <MDXRemote
        source={post.content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkSmartypants],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
              [rehypePrettyCode, { theme: "github-dark-default" }],
              [
                rehypeExternalLinks,
                { target: "_blank", rel: ["noopener", "noreferrer"] },
              ],
            ],
          },
        }}
      />
    </article>
  </div>
);
