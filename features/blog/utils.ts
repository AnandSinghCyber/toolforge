import { unified } from "unified";
import remarkParse from "remark-parse";

import type { BlogPost } from "./types";
import type { Tool } from "@/types/tool";

export interface Heading {
  depth: number;
  text: string;
  id: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function extractHeadings(content: string): Heading[] {
  const tree: any = unified().use(remarkParse).parse(content);

  const headings: Heading[] = [];

  tree.children.forEach((node: any) => {
    if (node.type !== "heading") return;

    const text = node.children
      .map((child: any) => child.value ?? "")
      .join("");

    headings.push({
      depth: node.depth,
      text,
      id: slugify(text),
    });
  });

  return headings;
}

/* -------------------------------------------------------------------------- */
/*                               Related Posts                                */
/* -------------------------------------------------------------------------- */

export function getRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  limit = 3
): BlogPost[] {
  return allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      let score = 0;

      if (
        post.frontmatter.category ===
        currentPost.frontmatter.category
      ) {
        score += 2;
      }

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

/* -------------------------------------------------------------------------- */
/*                               Related Tools                                */
/* -------------------------------------------------------------------------- */

export function getRelatedTools(
  tags: string[],
  tools: Tool[],
  limit = 3
): Tool[] {
  return tools
    .map((tool) => {
      const matches = tool.keywords.filter((keyword) =>
        tags.some((tag) =>
          keyword.toLowerCase().includes(tag.toLowerCase())
        )
      );

      return {
        tool,
        score: matches.length,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.tool);
}