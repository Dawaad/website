# File-based MDX Posts + Terminal Reader Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static `posts` config array with file-based MDX posts and render the full article inside the terminal's existing two-pane layout via a dedicated `/posts/[slug]` reader route.

**Architecture:** Posts become `content/posts/*.mdx` (gray-matter frontmatter), read server-side by `lib/posts/posts.ts` (ported from cranium `lib/blog.ts`, trimmed). `/posts` (server) loads metadata and passes it to the client `PostsSection`; `/posts/[slug]` (server/RSC) renders the body with `MDXRemote` + terminal-native MDX components and passes that server-rendered article as a prop into the same `PostsSection`, so the list stays on the right and the article fills the left pane.

**Tech Stack:** Next.js 16.2.6 (App Router, RSC), `next-mdx-remote/rsc`, `gray-matter`, `reading-time`, `github-slugger`, `remark-gfm`, `remark-smartypants`, `rehype-slug`, `rehype-autolink-headings`, `rehype-external-links`, `rehype-pretty-code`, `shiki`, Tailwind v4, vitest. Package manager: **npm**.

---

## File Structure

**Create:**
- `content/posts/on-small-models-and-small-teams.mdx` — sample post
- `content/posts/the-case-against-the-command-palette.mdx` — sample post
- `content/posts/designing-for-keyboards-first.mdx` — sample post
- `lib/posts/posts.ts` — data layer: `getAllPosts`, `getPostBySlug`, `calculateReadTime`, `extractHeadings`, `formatDate`
- `lib/posts/posts.test.ts` — unit tests for the data layer
- `components/feature-modules/portfolio/mdx/mdx-components.tsx` — terminal-native MDX renderers
- `components/feature-modules/portfolio/components/sections/reader-article.tsx` — server component: contents block + `MDXRemote`
- `app/posts/[slug]/page.tsx` — reader route (server/RSC)

**Modify:**
- `lib/types/portfolio/index.ts` — evolve `Post` (`detail`→`description`, `+readTime`), add `Heading` + `PostDoc`, remove `posts` from `PortfolioContent`
- `components/feature-modules/portfolio/service/portfolio-content.ts` — delete the `posts` array
- `components/feature-modules/portfolio/components/sections/posts-section.tsx` — props-driven, own keyboard nav, route navigation, reader vs preview
- `components/feature-modules/portfolio/components/sections/post-row.tsx` — format ISO date for display
- `app/posts/page.tsx` — server component loading `getAllPosts()`

**Untouched (verify still green):** `experience-section.tsx`, `projects-section.tsx`, `master-detail.tsx`, `use-list-navigation.ts` (experience/projects keep using it), `desktop-windows.test.ts`, `wallpapers.test.ts`, `master-detail.test.tsx`.

---

### Task 1: Install dependencies

**Files:** `package.json` (modified by npm)

- [ ] **Step 1: Install the markdown pipeline (cranium versions)**

Run:
```bash
npm install next-mdx-remote@^6.0.0 gray-matter@^4.0.3 reading-time@^1.5.0 \
  github-slugger@^2.0.0 remark-gfm@^4.0.1 remark-smartypants@^3.0.2 \
  rehype-slug@^6.0.0 rehype-autolink-headings@^7.1.0 rehype-external-links@^3.0.0 \
  rehype-pretty-code@^0.14.3 shiki@^4.0.2
```
Expected: install succeeds, `package.json` dependencies updated, no peer-dep errors that block install.

- [ ] **Step 2: Verify the project still builds before any code changes**

Run: `npm run build`
Expected: build completes successfully (baseline still green with new deps installed but unused).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build: add next-mdx-remote markdown pipeline deps"
```

---

### Task 2: Content, data layer, types, and list migration

This is one atomic commit: evolving the `Post` type cascades into the config, the list section, and the `/posts` page, so they move together to keep the build green. The data layer is built TDD-first.

**Files:**
- Create: `content/posts/on-small-models-and-small-teams.mdx`
- Create: `content/posts/the-case-against-the-command-palette.mdx`
- Create: `content/posts/designing-for-keyboards-first.mdx`
- Create: `lib/posts/posts.ts`
- Test: `lib/posts/posts.test.ts`
- Modify: `lib/types/portfolio/index.ts`
- Modify: `components/feature-modules/portfolio/service/portfolio-content.ts`
- Modify: `components/feature-modules/portfolio/components/sections/posts-section.tsx`
- Modify: `components/feature-modules/portfolio/components/sections/post-row.tsx`
- Modify: `app/posts/page.tsx`

- [ ] **Step 1: Create the three sample posts**

`content/posts/on-small-models-and-small-teams.mdx`:
````mdx
---
title: 'On small models and small teams'
date: '2026-05-12'
tag: '[design]'
description: 'A long argument that small teams should ship more, not less. Notes from working on signal/cli for a year.'
---

Small teams have a structural advantage that large teams spend enormous effort
trying to recover: everyone can hold the whole system in their head at once.
You lose that the moment the team outgrows a single shared context.

## Why smaller wins

The cost of coordination grows faster than the team does. Two people need one
conversation; five people need ten. The work that used to be implicit becomes a
meeting.

- Decisions stay cheap to reverse.
- The feedback loop between idea and ship stays short.
- Nobody has to ask permission to fix the thing in front of them.

> The best process is the one you don't notice you're following.

## What this looks like in practice

A year on `signal/cli` taught me the failure mode is almost never "too little
process" — it's losing the thread of why a thing exists.

```ts
// ship the smallest change that proves the idea
export const ship = (idea: Idea): Result =>
  idea.smallestTestableSlice().deploy();
```

Ship the slice. Learn. Repeat.
````

`content/posts/the-case-against-the-command-palette.mdx`:
````mdx
---
title: 'The case against the "command palette"'
date: '2026-04-02'
tag: '[ux]'
description: 'Command palettes are great until they replace the menu. A nuanced rant.'
---

Command palettes are great. They are also, increasingly, an excuse to stop
designing navigation. A palette is a search box over your features — and a
search box is only useful if you already know what you're looking for.

## Discoverability is the whole job

New users don't know your verbs yet. A palette asks them to guess. A menu shows
them the territory.

- Menus teach; palettes assume.
- Palettes reward memory; menus reward exploration.

## The both-and answer

Keep the palette for power users. Keep the menu for everyone else.

> A palette should be the fast path, never the only path.
````

`content/posts/designing-for-keyboards-first.mdx`:
````mdx
---
title: 'Designing for keyboards first'
date: '2025-11-04'
tag: '[ux]'
description: 'Six rules for designing keyboard-first interfaces that do not suck for mouse users.'
---

Keyboard-first does not mean mouse-hostile. It means the fastest path through
your interface is reachable without leaving the home row.

## The rules

1. Every action has a key.
2. Focus is always visible.
3. The current selection survives a reload.

### Focus is state

Treat focus as application state you own, not something the browser hands you by
accident.

```ts
const [selected, setSelected] = useState(0);
```

Mouse users get the same model — they just point at it instead of stepping to it.
````

- [ ] **Step 2: Write the failing data-layer test**

`lib/posts/posts.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import {
  calculateReadTime,
  extractHeadings,
  formatDate,
  getAllPosts,
  getPostBySlug,
} from './posts';

describe('calculateReadTime', () => {
  it('returns minutes at ~200 wpm', () => {
    expect(calculateReadTime(Array(1000).fill('word').join(' '))).toBe(5);
  });
  it('has a 1 minute minimum', () => {
    expect(calculateReadTime('short')).toBe(1);
  });
});

describe('formatDate', () => {
  it('renders ISO dates in dotted terminal style', () => {
    expect(formatDate('2026-05-12')).toBe('2026.05.12');
  });
});

describe('extractHeadings', () => {
  it('extracts h2 and h3 with slugs', () => {
    const headings = extractHeadings('## First Heading\n\ntext\n\n### Sub Heading');
    expect(headings).toEqual([
      { text: 'First Heading', slug: 'first-heading', level: 2 },
      { text: 'Sub Heading', slug: 'sub-heading', level: 3 },
    ]);
  });
  it('ignores h1 and h4+', () => {
    expect(extractHeadings('# Title\n#### Deep')).toEqual([]);
  });
});

describe('getAllPosts', () => {
  it('returns posts sorted by date descending', async () => {
    const posts = await getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    const times = posts.map((p) => new Date(p.date).getTime());
    expect(times).toEqual([...times].sort((a, b) => b - a));
  });
  it('computes a read time of at least 1 minute for every post', async () => {
    const posts = await getAllPosts();
    expect(posts.every((p) => p.readTime >= 1)).toBe(true);
  });
});

describe('getPostBySlug', () => {
  it('returns null for an invalid slug', async () => {
    expect(await getPostBySlug('../etc/passwd')).toBeNull();
  });
  it('returns null for a missing post', async () => {
    expect(await getPostBySlug('does-not-exist')).toBeNull();
  });
  it('returns content and headings for a real post', async () => {
    const posts = await getAllPosts();
    const doc = await getPostBySlug(posts[0].slug);
    expect(doc).not.toBeNull();
    expect(doc?.content.length).toBeGreaterThan(0);
    expect(Array.isArray(doc?.headings)).toBe(true);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npx vitest run lib/posts/posts.test.ts`
Expected: FAIL — cannot resolve `./posts` (module does not exist yet).

- [ ] **Step 4: Update the portfolio types**

In `lib/types/portfolio/index.ts`, replace the existing `Post` interface and the `posts` field of `PortfolioContent`:

Replace:
```ts
export interface Post extends Identifiable {
  date: string;
  title: string;
  tag: string;
  detail: string;
}
```
with:
```ts
export interface Post extends Identifiable {
  /** ISO `YYYY-MM-DD`; formatted to dotted style for display. */
  date: string;
  title: string;
  tag: string;
  description: string;
  readTime: number;
}

export interface Heading {
  text: string;
  slug: string;
  level: 2 | 3;
}

export interface PostDoc extends Post {
  content: string;
  headings: Heading[];
}
```

In the same file, remove the `posts: Post[];` line from the `PortfolioContent` interface:
```ts
export interface PortfolioContent {
  user: PortfolioUser;
  about: AboutContent;
  now: NowContent;
  stack: KeyValue[];
  contact: Contact;
  experience: ExperienceEntry[];
  projects: Project[];
}
```

- [ ] **Step 5: Implement the data layer**

`lib/posts/posts.ts`:
```ts
import fs from 'fs';
import path from 'path';
import GithubSlugger from 'github-slugger';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Heading, Post, PostDoc } from '@/lib/types/portfolio';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'posts');

/** ISO `YYYY-MM-DD` → dotted terminal style `YYYY.MM.DD`. */
export const formatDate = (iso: string): string => iso.replaceAll('-', '.');

export function calculateReadTime(content: string): number {
  const { minutes } = readingTime(content);
  return Math.max(1, Math.ceil(minutes));
}

export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^#{2,3}\s+(.+)$/gm;
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[0].startsWith('###') ? 3 : 2;
    const text = match[1].trim();
    headings.push({ text, slug: slugger.slug(text), level: level as 2 | 3 });
  }

  return headings;
}

function parseFile(filePath: string): { meta: Post; content: string } | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const meta: Post = {
      slug: path.basename(filePath, '.mdx'),
      title: data.title,
      description: data.description,
      date: data.date,
      tag: data.tag,
      readTime: calculateReadTime(content),
    };
    return { meta, content };
  } catch (error) {
    console.error(`Failed to parse post ${filePath}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => parseFile(path.join(CONTENT_DIR, f)))
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map((p) => p.meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<PostDoc | null> {
  if (!/^[a-zA-Z0-9_-]+$/.test(slug)) return null;
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const parsed = parseFile(filePath);
  if (!parsed) return null;

  return {
    ...parsed.meta,
    content: parsed.content,
    headings: extractHeadings(parsed.content),
  };
}
```

- [ ] **Step 6: Run the data-layer test to verify it passes**

Run: `npx vitest run lib/posts/posts.test.ts`
Expected: PASS (all cases).

- [ ] **Step 7: Remove the static posts array from the content config**

In `components/feature-modules/portfolio/service/portfolio-content.ts`, delete the entire `posts: [ ... ]` block (the trailing property of the object, lines covering `posts: [` through its closing `],`). The object now ends after `projects: [ ... ],`. Leave all other fields untouched.

- [ ] **Step 8: Refactor the posts list section to be props-driven**

Replace the entire contents of `components/feature-modules/portfolio/components/sections/posts-section.tsx`:
```tsx
'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';

import { MasterDetail } from '@/components/feature-modules/portfolio/components/sections/master-detail';
import { PostRow } from '@/components/feature-modules/portfolio/components/sections/post-row';
import { useReportSelection } from '@/components/feature-modules/portfolio/context/selection-provider';
import { formatDate } from '@/lib/posts/posts';
import type { Post } from '@/lib/types/portfolio';

interface Props {
  posts: Post[];
  /** Slug of the open post on the reader route; absent on the list route. */
  activeSlug?: string;
  /** Server-rendered article body, shown in the left pane on the reader route. */
  article?: ReactNode;
}

export const PostsSection: FC<Props> = ({ posts, activeSlug, article }) => {
  const router = useRouter();

  const activeIndex = activeSlug ? posts.findIndex((p) => p.slug === activeSlug) : -1;
  const [highlight, setHighlight] = useState(activeIndex >= 0 ? activeIndex : 0);

  // Snap the highlight to the URL-driven post when the reader route changes it
  // (render-time sync — the React-recommended alternative to an effect).
  const [lastActive, setLastActive] = useState(activeIndex);
  if (activeIndex >= 0 && activeIndex !== lastActive) {
    setLastActive(activeIndex);
    setHighlight(activeIndex);
  }

  const opened = activeIndex >= 0;
  const selected = opened ? activeIndex : highlight;

  useReportSelection(selected, posts.length);

  const open = useCallback(
    (index: number) => {
      const post = posts[index];
      if (post) router.push(`/posts/${post.slug}`);
    },
    [posts, router],
  );

  const close = useCallback(() => router.push('/posts'), [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlight((s) => Math.min(s + 1, posts.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlight((s) => Math.max(s - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        open(selected);
      } else if (e.key === 'Escape' && opened) {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [posts.length, open, close, opened, selected]);

  return (
    <MasterDetail<Post>
      detailLabel={opened ? 'post.reader' : 'post.preview'}
      listLabel="~/posts"
      listCmd="tail -f posts/"
      items={posts}
      selected={selected}
      open={open}
      opened={opened}
      close={close}
      RowComponent={PostRow}
      renderDetail={(sel) =>
        article ?? (
          <div className="text-[13px] leading-[1.65] text-fg-1">
            <div className="mb-[14px] flex items-baseline justify-between gap-3 border-b border-dashed border-fg-4 pb-3">
              <span className="min-w-0 flex-1 break-words text-[16px] font-semibold text-fg-0">
                {sel.title}
              </span>
              <span className="flex-none whitespace-nowrap text-[11px] tracking-[0.06em] text-fg-3">
                {formatDate(sel.date)}
              </span>
            </div>
            <div className="mb-4 text-[12px] text-fg-2">
              {sel.tag} · {sel.readTime} min read
            </div>
            <div className="text-fg-1">
              <p className="mb-3 max-w-[56ch]">{sel.description}</p>
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
        )
      }
    />
  );
};
```

- [ ] **Step 9: Format the ISO date in the list row**

In `components/feature-modules/portfolio/components/sections/post-row.tsx`, add the import and format the date.

Add after the existing `Post` import:
```tsx
import { formatDate } from '@/lib/posts/posts';
```
Change:
```tsx
      <span className="text-[11px] tracking-[0.06em] text-fg-2">{item.date}</span>
```
to:
```tsx
      <span className="text-[11px] tracking-[0.06em] text-fg-2">{formatDate(item.date)}</span>
```

- [ ] **Step 10: Load posts from disk on the list route**

Replace the entire contents of `app/posts/page.tsx`:
```tsx
import { PostsSection } from '@/components/feature-modules/portfolio/components/sections/posts-section';
import { getAllPosts } from '@/lib/posts/posts';

export default async function PostsPage() {
  const posts = await getAllPosts();
  return <PostsSection posts={posts} />;
}
```

- [ ] **Step 11: Typecheck, test, and build**

Run: `npx tsc --noEmit && npm test && npm run build`
Expected: no type errors; all vitest suites pass (including untouched config/master-detail tests); build succeeds and `/posts` is generated.

- [ ] **Step 12: Commit**

```bash
git add content/posts lib/posts lib/types/portfolio/index.ts \
  components/feature-modules/portfolio/service/portfolio-content.ts \
  components/feature-modules/portfolio/components/sections/posts-section.tsx \
  components/feature-modules/portfolio/components/sections/post-row.tsx \
  app/posts/page.tsx
git commit -m "feat: source portfolio posts from MDX files"
```

---

### Task 3: Terminal MDX renderer + reader route

**Files:**
- Create: `components/feature-modules/portfolio/mdx/mdx-components.tsx`
- Create: `components/feature-modules/portfolio/components/sections/reader-article.tsx`
- Create: `app/posts/[slug]/page.tsx`

- [ ] **Step 1: Create the terminal-native MDX components**

`components/feature-modules/portfolio/mdx/mdx-components.tsx`:
```tsx
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

import { cn } from '@/lib/util/utils';

const headingBase = 'group relative scroll-mt-24 font-mono text-fg-0';

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
  p: ({ children }) => <p className="mb-3 max-w-[64ch] text-fg-1">{children}</p>,
  a: ({ href, children }) => (
    <Link
      href={href ?? '#'}
      className="text-amber underline decoration-fg-4 underline-offset-2 hover:decoration-amber"
    >
      {children}
    </Link>
  ),
  ul: ({ children }) => <ul className="m-0 mb-4 list-none p-0">{children}</ul>,
  ol: ({ children }) => <ol className="mb-4 ml-5 list-decimal space-y-1 text-fg-1">{children}</ol>,
  li: ({ children }) => (
    <li className="relative py-0.5 pl-[18px] leading-relaxed text-fg-1 before:absolute before:left-0 before:text-fg-3 before:content-['─']">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-5 border-l-2 border-amber/60 pl-4 text-fg-2">{children}</blockquote>
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
  thead: ({ children }) => <thead className="border-b border-fg-4 bg-bg-2/50">{children}</thead>,
  th: ({ children }) => (
    <th className="px-3 py-2 text-left text-[11px] uppercase tracking-[0.08em] text-fg-3">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="border-t border-fg-4 px-3 py-2 text-fg-1">{children}</td>,
};
```

- [ ] **Step 2: Create the reader article (server component)**

`components/feature-modules/portfolio/components/sections/reader-article.tsx`:
```tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { FC } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';

import { mdxComponents } from '@/components/feature-modules/portfolio/mdx/mdx-components';
import { formatDate } from '@/lib/posts/posts';
import type { PostDoc } from '@/lib/types/portfolio';

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
        <div className="mb-1.5 text-[11px] uppercase tracking-[0.1em] text-fg-3">contents:</div>
        <ul className="m-0 list-none p-0">
          {post.headings.map((h) => (
            <li key={h.slug} className={h.level === 3 ? 'pl-4' : undefined}>
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
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              [rehypePrettyCode, { theme: 'github-dark-default' }],
              [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
            ],
          },
        }}
      />
    </article>
  </div>
);
```

- [ ] **Step 3: Create the reader route**

`app/posts/[slug]/page.tsx`:
```tsx
import { notFound } from 'next/navigation';

import { PostsSection } from '@/components/feature-modules/portfolio/components/sections/posts-section';
import { ReaderArticle } from '@/components/feature-modules/portfolio/components/sections/reader-article';
import { getAllPosts, getPostBySlug } from '@/lib/posts/posts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostReaderPage({ params }: Props) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPostBySlug(slug), getAllPosts()]);
  if (!post) notFound();

  return <PostsSection posts={posts} activeSlug={slug} article={<ReaderArticle post={post} />} />;
}
```

- [ ] **Step 4: Typecheck and build (proves SSG + RSC MDX render)**

Run: `npx tsc --noEmit && npm run build`
Expected: no type errors; build generates a static page for each post slug (`/posts/on-small-models-and-small-teams`, etc.) with no MDX/shiki render errors.

> If the build fails on the `next-mdx-remote/rsc` import path under Next 16.2.6, check `node_modules/next-mdx-remote/package.json` `exports` for the correct RSC entry and adjust the import; this is the one flagged compatibility risk.

- [ ] **Step 5: Commit**

```bash
git add components/feature-modules/portfolio/mdx/mdx-components.tsx \
  components/feature-modules/portfolio/components/sections/reader-article.tsx \
  "app/posts/[slug]/page.tsx"
git commit -m "feat: render MDX posts in a terminal reader route"
```

---

### Task 4: Full verification

**Files:** none (verification only)

- [ ] **Step 1: Run the whole test + lint + build gate**

Run: `npm test && npm run lint && npm run build`
Expected: all vitest suites pass, eslint clean, build succeeds.

- [ ] **Step 2: Manual smoke test the flow**

Run: `npm run dev`, then verify in a browser:
- `/posts` — list shows 3 posts on the right (`tail -f posts/`), preview on the left with real read-time (e.g. `[design] · N min read`), dates dotted (`2026.05.12`).
- Click a row (or `↑/↓` then `⏎`) → navigates to `/posts/<slug>`; left pane label flips to `[ post.reader ]` and shows the rendered article: heading markers, dash bullets, blockquote rail, a syntax-highlighted code block, and the inline `contents:` block.
- Click another row from the reader → switches post. `Esc` (or the mobile `← cd ../posts` back control) → returns to `/posts`.
- Visit `/posts/nope` → renders the existing not-found surface.

- [ ] **Step 3: Confirm completion**

State plainly which checks passed (with command output) and whether the manual flow behaved as described. Do not claim success for any step not actually observed.

---

## Self-Review

**Spec coverage:**
- File-based MDX content + gray-matter → Task 2 (content files, `parseFile`).
- `lib/posts/posts.ts` trimmed port (getAllPosts/getPostBySlug/read-time/headings, no categories/related/featured) → Task 2.
- Types: `Post` `detail`→`description` `+readTime`, `Heading`, `PostDoc`, remove `posts` from `PortfolioContent` → Task 2, Step 4.
- Remove `posts` from config → Task 2, Step 7.
- Deps (cranium versions) → Task 1.
- Dedicated `/posts/[slug]` RSC route reusing two-pane `MasterDetail` (list right, article left) → Task 3.
- Terminal-native MDX components (site tokens, shiki) → Task 3, Step 1.
- Inline `contents:` block → Task 3, Step 2.
- Navigation (⏎/click → route, Esc/back → list) → Task 2, Step 8.
- `notFound()` on bad/missing slug → Task 3, Step 3 + slug guard in Task 2.
- Real read-time replaces hardcoded "4 min read" → Task 2, Step 8.
- Tests → Task 2, Step 2; existing suites kept green → Task 2, Step 11 / Task 4.
- Flagged risk (next-mdx-remote/rsc on Next 16.2.6) → Task 3, Step 4 note.

**Placeholder scan:** No TBD/TODO; every code step shows complete code; every command lists expected output.

**Type consistency:** `Post { slug, date, title, tag, description, readTime }`, `Heading { text, slug, level }`, `PostDoc extends Post { content, headings }` used identically across `posts.ts`, the test, `posts-section.tsx`, `reader-article.tsx`, and the routes. `formatDate`, `getAllPosts`, `getPostBySlug` names match every call site.
