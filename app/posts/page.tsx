import { PostsSection } from "@/src/features/portfolio";
import { getAllPosts } from "@/src/shared/lib/posts/posts";

export default async function PostsPage() {
  const posts = await getAllPosts();
  return <PostsSection posts={posts} />;
}
