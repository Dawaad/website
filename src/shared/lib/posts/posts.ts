import type { Heading, Post, PostDoc } from "@/src/shared/types/portfolio";
import fs from "fs";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

export { formatDate } from "@/src/shared/lib/posts/format";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "posts");

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
    const level = match[0].startsWith("###") ? 3 : 2;
    const text = match[1].trim();
    headings.push({ text, slug: slugger.slug(text), level: level as 2 | 3 });
  }

  return headings;
}

function parseFile(filePath: string): { meta: Post; content: string } | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const meta: Post = {
      slug: path.basename(filePath, ".mdx"),
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
    .filter((f) => f.endsWith(".mdx"))
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
