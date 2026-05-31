import { notFound } from "next/navigation";

import { PostsSection } from "@/src/features/portfolio";
import { ReaderArticle } from "@/src/features/portfolio";
import { getAllPosts, getPostBySlug } from "@/src/shared/lib/posts/posts";

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

  return (
    <PostsSection
      posts={posts}
      activeSlug={slug}
      article={<ReaderArticle post={post} />}
    />
  );
}
