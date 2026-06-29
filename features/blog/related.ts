import type { BlogPost } from "./types";
import type { Tool } from "@/types/tool";

/**
 * Find related blog posts based on category and shared tags.
 */
export function getRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  limit = 3
): BlogPost[] {
  return allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      let score = 0;

      // Same category gets higher weight
      if (post.frontmatter.category === currentPost.frontmatter.category) {
        score += 2;
      }

      // Shared tags increase score
      const sharedTags = post.frontmatter.tags.filter((tag) =>
        currentPost.frontmatter.tags.includes(tag)
      );

      score += sharedTags.length;

      return {
        post,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

/**
 * Find related tools based on blog tags.
 */
export function getRelatedTools(
  tags: string[],
  tools: Tool[],
  limit = 3
): Tool[] {
  return tools
    .map((tool) => {
      const score = tool.keywords.filter((keyword) =>
        tags.some((tag) =>
          keyword.toLowerCase().includes(tag.toLowerCase())
        )
      ).length;

      return {
        tool,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.tool);
}

/**
 * Find blog articles related to a tool.
 */
export function getRelatedArticlesForTool(
  tool: Tool,
  posts: BlogPost[],
  limit = 3
): BlogPost[] {
  return posts
    .map((post) => {
      const score = post.frontmatter.tags.filter((tag) =>
        tool.keywords.some((keyword) =>
          keyword.toLowerCase().includes(tag.toLowerCase())
        )
      ).length;

      return {
        post,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}