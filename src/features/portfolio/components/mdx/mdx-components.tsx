import type { MDXComponents } from "mdx/types";
import Link from "next/link";

import { cn } from "@/src/shared/lib/utils";

const headingBase = "group relative scroll-mt-24 font-mono text-fg-0";

/**
 * Terminal-native MDX renderers. Inline `code` is left as plain monospace (the
 * whole reader is monospace already); `pre`/block code is highlighted by
 * rehype-pretty-code + shiki and framed to sit inside the terminal panel.
 */
export const mdxComponents: MDXComponents = {
  h2: ({ children, id }) => (
    <h2
      id={id}
      className={cn(
        headingBase,
        "mb-3 mt-9 text-[15px] font-semibold uppercase tracking-[0.08em] text-amber before:content-['>_']",
      )}
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3
      id={id}
      className={cn(
        headingBase,
        "mb-2 mt-7 text-[13.5px] font-semibold tracking-[0.04em] before:text-amber before:content-['>_']",
      )}
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-3 max-w-[64ch] text-fg-1">{children}</p>
  ),
  a: ({ href, children }) => (
    <Link
      href={href ?? "#"}
      className="text-amber underline decoration-fg-4 underline-offset-2 hover:decoration-amber"
    >
      {children}
    </Link>
  ),
  ul: ({ children }) => <ul className="m-0 mb-4 list-none p-0">{children}</ul>,
  ol: ({ children }) => (
    <ol className="mb-4 ml-5 list-decimal space-y-1 text-fg-1">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="relative py-0.5 pl-[18px] leading-relaxed text-fg-1 before:absolute before:left-0 before:text-fg-3 before:content-['─']">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-5 border-l-2 border-amber/60 pl-4 text-fg-2">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-7 border-0 border-t border-dashed border-fg-4" />,
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="my-5 overflow-x-auto rounded-xs border border-fg-4 bg-[#0d1117] p-4 text-[12.5px] leading-relaxed"
    >
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-5 overflow-x-auto rounded-xs border border-fg-4">
      <table className="w-full text-[12.5px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-fg-4 bg-bg-2/50">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2 text-left text-[11px] uppercase tracking-[0.08em] text-fg-3">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-t border-fg-4 px-3 py-2 text-fg-1">{children}</td>
  ),
};
