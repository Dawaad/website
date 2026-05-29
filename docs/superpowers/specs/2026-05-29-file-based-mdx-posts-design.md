# File-based MDX posts + terminal reader — design

Date: 2026-05-29
Status: approved (pending spec review)

## Problem

The portfolio terminal renders blog posts from a static `posts` array in
`portfolio-content.ts` — metadata only (`slug`, `date`, `title`, `tag`,
`detail`), no body. The `[ post.preview ]` pane promises "press ⏎ to open in
reader" and "r raw .md", but there is no reader and no post content.

Goal: recreate the cranium blog structure (`apps/web`) for `posts` — author
posts as MDX files, render them with cranium's markdown pipeline, and surface
the full article inside the existing terminal UI.

## Decisions (locked with user)

1. **Reader surface** — a dedicated server route `/posts/[slug]` (RSC), so
   `fs` reads and `MDXRemote` run server-side cleanly.
2. **Stack** — full MDX, mirroring cranium 1:1 (`next-mdx-remote/rsc` + shiki
   pipeline).
3. **Reader styling** — terminal-native MDX components (site tokens), not
   cranium's web-prose styling.
4. **Seed content** — 2–3 sample `.mdx` posts to prove the pipeline; remaining
   posts authored later.
5. **Reader layout** — keep the existing two-pane `MasterDetail` structure: the
   `[ ~/posts ]` list stays on the right; the left pane upgrades from the short
   preview to the full rendered article. No separate TOC sidebar.
6. **Inline contents** — a compact terminal-style `contents:` block (H2/H3
   anchor links) at the top of the article body.
7. **Helpers** — port only `getAllPosts`, `getPostBySlug`, read-time, and
   heading extraction. Drop categories / related-posts / featured (YAGNI).

## Architecture

### Content + data layer

- `content/posts/*.mdx` — frontmatter parsed with `gray-matter`. Schema aligned
  to the existing list so the right pane keeps working unchanged:

  ```yaml
  ---
  title: 'The case against the "command palette"'
  date: '2026.04.02'        # existing display format, kept verbatim
  tag: '[ux]'               # existing display format, kept verbatim
  description: 'Command palettes are great until they replace the menu.'
  featured: false           # optional; reserved, not surfaced in UI yet
  ---
  ```

- `lib/posts/posts.ts` — port of cranium `lib/blog.ts`, trimmed to:
  - `calculateReadTime(content): number` (via `reading-time`)
  - `extractHeadings(content): Heading[]` (via `github-slugger`, H2/H3)
  - `getAllPosts(): Promise<Post[]>` — read dir, parse frontmatter, sort by
    date desc. `CONTENT_DIR = path.join(process.cwd(), 'content', 'posts')`.
  - `getPostBySlug(slug): Promise<PostDoc | null>` — slug guard
    (`/^[a-zA-Z0-9_-]+$/`), parse, attach `content` + `headings` + `readTime`.
  - No `getCategories` / `getRelatedPosts` / `getFeaturedPost`.

- `lib/types/portfolio/index.ts`:
  - `Post` keeps `slug`, `date`, `title`, `tag`; rename `detail` →
    `description`; add `readTime: number`.
  - add `interface PostDoc extends Post { content: string; headings: Heading[] }`
  - add `interface Heading { text: string; slug: string; level: 2 | 3 }`
  - **remove `posts` from `PortfolioContent`**.

- `service/portfolio-content.ts` — delete the `posts` array (and its entries).

### Dependencies (match cranium versions)

`next-mdx-remote`, `gray-matter`, `reading-time`, `github-slugger`,
`remark-gfm`, `remark-smartypants`, `rehype-slug`, `rehype-autolink-headings`,
`rehype-external-links`, `rehype-pretty-code`, `shiki`.

### Terminal-native MDX components

`components/feature-modules/portfolio/mdx/mdx-components.tsx` — port of
cranium's `mdx-components.tsx`, restyled to the terminal:

- Tokens: `fg-0..fg-4`, `bg-1`/`bg-2`, `amber` accent, `font-mono`, dashed/solid
  ASCII rules. No serif, no lucide icons.
- `h2`/`h3`: site heading idiom (`>_` / `>` marker, `tracking`), with anchor id
  + on-hover `#` link (plain `<a href="#id">`, no icon dep).
- `p`, `ul`/`ol`/`li`, `blockquote` (a `│` left rail), `hr` (dashed),
  `a` (amber underline; external links open new tab via `rehype-external-links`).
- `pre`/code: `rehype-pretty-code` + shiki. Theme chosen to read inside the
  terminal panel (single dark theme, e.g. `github-dark-default`; revisit if it
  clashes with the active scheme).
- GFM `table` in a bordered terminal box.
- Drop cranium's `ComparisonTable` custom component unless a sample post needs
  it (it does not).

### Routes

- `/posts/page.tsx` (server) — `const posts = await getAllPosts()`; render
  `<PostsSection posts={posts} />`.
- `/posts/[slug]/page.tsx` (server / RSC):
  - `generateStaticParams()` from `getAllPosts()`.
  - `getPostBySlug(slug)` → `notFound()` when null.
  - Renders the same two-pane layout: right = `[ ~/posts ]` list (active row =
    current slug), left = `[ post.reader ]` with the inline `contents:` block +
    `<MDXRemote source={post.content} components={mdxComponents} options={...}/>`.
  - `options.mdxOptions.remarkPlugins = [remarkGfm, remarkSmartypants]`;
    `rehypePlugins = [rehypeSlug, [rehypeAutolinkHeadings,{behavior:'wrap'}],
    [rehypePrettyCode,{theme}], [rehypeExternalLinks,{target:'_blank',
    rel:['noopener','noreferrer']}]]` — same chain as cranium.

### Components

- `MasterDetail` (`sections/master-detail.tsx`) — unchanged generic; reused by
  both `/posts` and `/posts/[slug]`. The reader supplies a `renderDetail` that
  returns the article body instead of the preview.
- `PostsSection` becomes `FC<{ posts: Post[] }>` (props instead of importing
  `portfolioContent.posts`). Preview `renderDetail` uses real `readTime`
  (`{tag} · {readTime} min read`) instead of the hardcoded "4 min read".
- New `sections/post-reader.tsx` (or a `mode` prop on `PostsSection`) — the
  reader's `renderDetail`: inline `contents:` block (from `post.headings`) +
  MDX body. Decide single-vs-shared component during planning; prefer reusing
  `PostsSection` with a `reader?: PostDoc` prop to avoid duplicating the list
  wiring.

### Navigation

- Opening a post (`⏎` / row click) navigates to `/posts/${slug}`. Prefer the
  shell's transition (`useRouteTabKeys` / `navigate`); fall back to
  `router.push` if the transition layer does not cover sub-routes (verify during
  planning — `usePageTransition` is keyed off tab routes).
- On the reader, clicking another row navigates to that slug; `Esc` / back link
  (`← cd ../posts`) returns to `/posts`. The existing mobile back control in
  `MasterDetail` is reused.

## Data flow

```
content/posts/*.mdx
   └─ gray-matter ─► Post (list metadata)  ─► getAllPosts() ─► /posts (server)
                                                              └► PostsSection (client) ─► list + preview
   └─ gray-matter + body ─► PostDoc ─► getPostBySlug() ─► /posts/[slug] (server, RSC)
                                                          └► MDXRemote + mdxComponents ─► left pane article
```

## Error handling

- Bad/unknown slug: `getPostBySlug` returns `null` → route calls `notFound()`
  (existing `app/not-found.tsx` / not-found section renders).
- Malformed frontmatter: `parseFrontmatter` logs and returns `null`; the file is
  skipped in `getAllPosts` (cranium behaviour, kept).
- Empty `content/posts`: `getAllPosts` returns `[]`; list shows "0 entries".

## Testing

- `lib/posts/posts.test.ts` (vitest, following cranium `__tests__/lib/blog.test.ts`):
  parse frontmatter into `Post`, `calculateReadTime` ≥ 1, `extractHeadings`
  pulls H2/H3 with slugs, `getPostBySlug` rejects invalid slugs and returns
  `null` for missing files.
- Existing config tests (`desktop-windows.test.ts`, `wallpapers.test.ts`,
  `master-detail.test.tsx`) remain green; update any that referenced
  `portfolioContent.posts` or the old `detail` field.

## Risks / open items

- **Next 16.2.6 + `next-mdx-remote/rsc`** — cranium runs Next 16.1.1. Verify
  compatibility against `node_modules/next/dist/docs/` before coding (per
  AGENTS.md); if `/rsc` import path differs, adapt.
- **Shiki theme vs color schemes** — the terminal has multiple schemes
  (beige/phosphor/amber/…). The reader uses one fixed shiki theme initially;
  per-scheme code theming is out of scope.
- **TOC scroll-spy** — out of scope; the inline `contents:` block is static
  anchor links only.

## Out of scope

Categories, related posts, featured post, RSS, OG image generation, reading
progress bar, scroll-spy TOC — all present in cranium, none ported.
