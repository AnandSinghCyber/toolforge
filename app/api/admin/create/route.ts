import { commitFile } from "@/lib/github"

export async function POST(req: Request) {
  const { slug, content } = await req.json()

  const path = `content/blog/${slug}.mdx`

  const result = await commitFile(
    path,
    content,
    `Create blog post: ${slug}`
  )

  return Response.json(result)
}