import Link from "next/link"
import { getAllPosts } from "@/features/blog/lib"
import { Container } from "@/components/layout/container"

export default function AdminPage() {
  const posts = getAllPosts()

  return (
    <Container>
      <div className="py-16">
        <h1 className="text-3xl font-bold mb-8">
          Admin Panel
        </h1>

        <Link
          href="/admin/new"
          className="underline mb-6 block"
        >
          + Create New Post
        </Link>

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.slug}>
              <Link
                href={`/admin/edit/${post.slug}`}
                className="underline"
              >
                {post.frontmatter.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}