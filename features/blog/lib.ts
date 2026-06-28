import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "./types";

const blogDirectory = path.join(process.cwd(), "content/blog");

/**
 * Validate required frontmatter fields.
 * Prevents invalid blog posts from crashing the build.
 */
function validateFrontmatter(data: any): boolean {
  return (
    typeof data.title === "string" &&
    typeof data.description === "string" &&
    typeof data.excerpt === "string" &&
    typeof data.category === "string" &&
    typeof data.publishedAt === "string" &&
    typeof data.author === "string" &&
    typeof data.image === "string" &&
    Array.isArray(data.tags) &&
    typeof data.featured === "boolean"
  );
}

/**
 * Get all blog posts
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) return [];

  const files = fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".mdx"));

  const posts = files
    .map((file) => {
      const slug = file.replace(".mdx", "");

      const fullPath = path.join(blogDirectory, file);

      const fileContent = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContent);

      if (!validateFrontmatter(data)) {
        console.warn(
          `⚠ Invalid frontmatter found in ${file}. Skipping this post.`
        );
        return null;
      }

      return {
        slug,
        frontmatter: data as BlogPost["frontmatter"],
        content,
      };
    })
    .filter(Boolean) as BlogPost[];

  // Sort newest first
  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  );

  return posts;
}

/**
 * Get one post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(blogDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContent);

  if (!validateFrontmatter(data)) {
    console.warn(`⚠ Invalid frontmatter in ${slug}.mdx`);
    return null;
  }

  return {
    slug,
    frontmatter: data as BlogPost["frontmatter"],
    content,
  };
}

/**
 * Used by generateStaticParams()
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) return [];

  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
}