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
