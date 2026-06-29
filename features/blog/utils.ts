import { unified } from "unified";
import remarkParse from "remark-parse";

import type { BlogPost } from "./types";

export interface Heading {
  depth: number;
  text: string;
  id: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * Extract headings from MDX content for Table of Contents.
 */
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

/**
 * Get all unique blog categories.
 */
export function getAllCategories(
  posts: BlogPost[]
): string[] {
  return Array.from(
    new Set(posts.map((post) => post.frontmatter.category))
  ).sort();
}

/**
 * Get all unique blog tags.
 */
export function getAllTags(
  posts: BlogPost[]
): string[] {
  return Array.from(
    new Set(
      posts.flatMap((post) => post.frontmatter.tags)
    )
  ).sort();
}

/**
 * Get posts by category.
 */
export function getPostsByCategory(
  posts: BlogPost[],
  category: string
): BlogPost[] {
  return posts.filter(
    (post) =>
      post.frontmatter.category.toLowerCase() ===
      category.toLowerCase()
  );
}

/**
 * Get posts by tag.
 */
export function getPostsByTag(
  posts: BlogPost[],
  tag: string
): BlogPost[] {
  return posts.filter((post) =>
    post.frontmatter.tags.some(
      (t) => t.toLowerCase() === tag.toLowerCase()
    )
  );
}