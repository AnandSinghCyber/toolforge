import Link from "next/link";
import { getAllPosts } from "@/features/blog/lib";
import { Container } from "@/components/layout/container";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container>
      <div className="py-16">
        <h1 className="text-4xl font-bold mb-10">
          Blog
        </h1>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
            >
              <Card className="hover:shadow-md transition">
                <CardContent className="p-6">
                  <p className="text-sm text-primary mb-2">
                    {post.frontmatter.category}
                  </p>

                  <h2 className="text-2xl font-semibold">
                    {post.frontmatter.title}
                  </h2>

                  <p className="mt-3 text-muted-foreground">
                    {post.frontmatter.excerpt}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-muted px-2 py-1 text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex justify-between text-sm text-muted-foreground">
                    <span>{post.frontmatter.author}</span>
                    <span>{post.frontmatter.publishedAt}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}