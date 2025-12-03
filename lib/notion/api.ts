import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getNotionClient, getNotionDatabaseId } from "./client";
import { BlogPost, BlogPostWithContent, NotionPage } from "./types";

/**
 * Parse Notion page properties into BlogPost interface
 */
function parsePageToBlogPost(page: NotionPage): BlogPost {
    const properties = page.properties;

    // Extract title
    const title = properties.Title.title[0]?.plain_text || "Untitled";

    // Extract slug
    const slug = properties.Slug.rich_text[0]?.plain_text || "";

    // Extract excerpt
    const excerpt = properties.Excerpt.rich_text[0]?.plain_text || "";

    // Extract cover image
    const coverImage =
        properties["Cover Image"].files[0]?.type === "external"
            ? properties["Cover Image"].files[0].external?.url || null
            : properties["Cover Image"].files[0]?.file?.url || null;

    // Extract dates
    const publishedDate = properties["Published Date"].date?.start || new Date().toISOString();
    const updatedDate = properties["Updated Date"].date?.start || publishedDate;

    // Extract tags
    const tags = properties.Tags.multi_select.map((tag) => tag.name);

    // Extract author
    const author = properties.Author.people[0]?.name || "Anonymous";

    // Extract featured flag
    const featured = properties.Featured.checkbox;

    // Extract reading time (will be calculated later if not set)
    const readingTime = properties["Reading Time"].number || 0;

    // Extract status
    const status = properties.Status.select?.name || "Draft";

    return {
        id: page.id,
        title,
        slug,
        excerpt,
        coverImage,
        publishedDate,
        updatedDate,
        tags,
        author,
        featured,
        readingTime,
        status,
    };
}

/**
 * Get all published blog posts from Notion database
 */
export async function getPublishedPosts(options?: {
    tags?: string[];
    featured?: boolean;
    limit?: number;
}): Promise<BlogPost[]> {
    const notion = getNotionClient();
    const databaseId = getNotionDatabaseId();

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                and: [
                    {
                        property: "Status",
                        select: {
                            equals: "Published",
                        },
                    },
                    ...(options?.tags && options.tags.length > 0
                        ? [
                              {
                                  or: options.tags.map((tag) => ({
                                      property: "Tags",
                                      multi_select: {
                                          contains: tag,
                                      },
                                  })),
                              },
                          ]
                        : []),
                    ...(options?.featured !== undefined
                        ? [
                              {
                                  property: "Featured",
                                  checkbox: {
                                      equals: options.featured,
                                  },
                              },
                          ]
                        : []),
                ],
            },
            sorts: [
                {
                    property: "Published Date",
                    direction: "descending",
                },
            ],
            page_size: options?.limit || 100,
        });

        return response.results.map((page) => parsePageToBlogPost(page as NotionPage));
    } catch (error) {
        console.error("Error fetching published posts:", error);
        throw new Error("Failed to fetch blog posts from Notion");
    }
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const notion = getNotionClient();
    const databaseId = getNotionDatabaseId();

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                and: [
                    {
                        property: "Slug",
                        rich_text: {
                            equals: slug,
                        },
                    },
                    {
                        property: "Status",
                        select: {
                            equals: "Published",
                        },
                    },
                ],
            },
        });

        if (response.results.length === 0) {
            return null;
        }

        return parsePageToBlogPost(response.results[0] as NotionPage);
    } catch (error) {
        console.error(`Error fetching post with slug "${slug}":`, error);
        return null;
    }
}

/**
 * Get page blocks (content) for a blog post
 */
export async function getPageBlocks(pageId: string): Promise<BlockObjectResponse[]> {
    const notion = getNotionClient();

    try {
        const blocks: BlockObjectResponse[] = [];
        let cursor: string | undefined = undefined;

        // Notion API paginates block responses, so we need to fetch all pages
        do {
            const response: any = await notion.blocks.children.list({
                block_id: pageId,
                start_cursor: cursor,
                page_size: 100,
            });

            blocks.push(...(response.results as BlockObjectResponse[]));
            cursor = response.next_cursor || undefined;
        } while (cursor);

        return blocks;
    } catch (error) {
        console.error(`Error fetching blocks for page "${pageId}":`, error);
        throw new Error("Failed to fetch page content from Notion");
    }
}

/**
 * Get blog post with full content (post + blocks)
 */
export async function getPostWithContent(slug: string): Promise<BlogPostWithContent | null> {
    const post = await getPostBySlug(slug);

    if (!post) {
        return null;
    }

    const blocks = await getPageBlocks(post.id);

    return {
        ...post,
        blocks,
    };
}

/**
 * Get all unique tags from all published posts
 */
export async function getAllTags(): Promise<string[]> {
    const posts = await getPublishedPosts();
    const tagsSet = new Set<string>();

    posts.forEach((post) => {
        post.tags.forEach((tag) => tagsSet.add(tag));
    });

    return Array.from(tagsSet).sort();
}

/**
 * Get related posts based on tag similarity
 */
export async function getRelatedPosts(
    currentPostId: string,
    tags: string[],
    limit: number = 3
): Promise<BlogPost[]> {
    const allPosts = await getPublishedPosts();

    // Filter out current post and calculate similarity scores
    const postsWithScores = allPosts
        .filter((post) => post.id !== currentPostId)
        .map((post) => {
            // Calculate similarity based on shared tags
            const sharedTags = post.tags.filter((tag) => tags.includes(tag));
            const score = sharedTags.length;

            return {
                post,
                score,
            };
        })
        .filter((item) => item.score > 0) // Only posts with at least one shared tag
        .sort((a, b) => b.score - a.score) // Sort by highest similarity
        .slice(0, limit);

    return postsWithScores.map((item) => item.post);
}
