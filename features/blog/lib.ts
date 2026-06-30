import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

import { BlogPost } from "./types";

const blogDirectory = path.join(process.cwd(), "content/blog");

function validateFrontmatter(data: any): boolean {
  return (
    typeof data.title === "string" &&
    typeof data.description === "string" &&
    typeof data.publishedAt === "string"
  );
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(blogDirectory);

  const posts = files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const fullPath = path.join(blogDirectory, file);

      const fileContent = fs.readFileSync(fullPath, "utf8");
      const stats = fs.statSync(fullPath);

      const { data, content } = matter(fileContent);

      if (!validateFrontmatter(data)) {
        console.warn(`Invalid frontmatter in ${file}`);
        return null;
      }

      return {
        slug,
        frontmatter: data as BlogPost["frontmatter"],
        content,
        readingTime: readingTime(content).text,
        updatedAt: stats.mtime.toISOString(),
      };
    })
    .filter(Boolean) as BlogPost[];

  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  );

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(blogDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(fullPath, "utf8");
  const stats = fs.statSync(fullPath);

  const { data, content } = matter(fileContent);

  if (!validateFrontmatter(data)) {
    console.warn(`Invalid frontmatter in ${slug}.mdx`);
    return null;
  }

  return {
    slug,
    frontmatter: data as BlogPost["frontmatter"],
    content,
    readingTime: readingTime(content).text,
    updatedAt: stats.mtime.toISOString(),
  };
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(blogDirectory)
    .map((file) => file.replace(".mdx", ""));
}