import type { BlogPost } from "./types";
import type { Tool } from "@/types/tool";

export function getRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  limit = 3
): BlogPost[] {
  return allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      let score = 0;

      if (post.frontmatter.category === currentPost.frontmatter.category) {
        score += 2;
      }

      const sharedTags = post.frontmatter.tags.filter((tag) =>
        currentPost.frontmatter.tags.includes(tag)
      );

      score += sharedTags.length;

      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

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

      return { tool, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.tool);
}