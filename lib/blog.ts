import fs from "fs"
import path from "path"
import matter from "gray-matter"

const POSTS_PATH = path.join(process.cwd(), "content/blog")

export interface BlogPost {
  slug: string
  title: string
  description: string
  category: string
  publishedAt: string
  content: string
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(POSTS_PATH)

  return files.map((file) => {
    const slug = file.replace(".mdx", "")

    const source = fs.readFileSync(
      path.join(POSTS_PATH, file),
      "utf8"
    )

    const { data, content } = matter(source)

    return {
      slug,
      title: data.title,
      description: data.description,
      category: data.category,
      publishedAt: data.publishedAt,
      content,
    }
  })
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(
    POSTS_PATH,
    `${slug}.mdx`
  )

  if (!fs.existsSync(filePath)) {
    return null
  }

  const source = fs.readFileSync(filePath, "utf8")

  const { data, content } = matter(source)

  return {
    slug,
    title: data.title,
    description: data.description,
    category: data.category,
    publishedAt: data.publishedAt,
    content,
  }
}