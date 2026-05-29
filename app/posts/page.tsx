import { PostsSection } from '@/components/feature-modules/portfolio/components/sections/posts-section';
import { getAllPosts } from '@/lib/posts/posts';

export default async function PostsPage() {
  const posts = await getAllPosts();
  return <PostsSection posts={posts} />;
}
