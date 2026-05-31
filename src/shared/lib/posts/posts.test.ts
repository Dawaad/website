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
