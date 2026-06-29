import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Card, CardContent } from "@/components/ui/card";

import { siteConfig } from "@/lib/site";
import { getAllPosts } from "@/features/blog/lib";

export const metadata: Metadata = {
  title: "Blog",
  description: `Latest tutorials, guides, and developer resources from ${siteConfig.name}.`,
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: `Latest tutorials, guides, and developer resources from ${siteConfig.name}.`,
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${siteConfig.name}`,
    description: `Latest tutorials, guides, and developer resources from ${siteConfig.name}.`,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container>
      <div className="py-16">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>

        <p className="text-muted-foreground mb-10">
          Tutorials, guides, and resources to help developers, students, and
          creators.
        </p>

        {posts.length === 0 ? (
          <div className="rounded-lg border p-8 text-center">
            <h2 className="text-xl font-semibold">No blog posts yet</h2>

            <p className="mt-2 text-muted-foreground">
              New articles will be published soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="transition hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{post.frontmatter.category}</span>
                      <span>{post.frontmatter.publishedAt}</span>
                    </div>

                    <h2 className="mt-3 text-2xl font-bold">
                      {post.frontmatter.title}
                    </h2>

                    <p className="mt-3 text-muted-foreground">
                      {post.frontmatter.excerpt}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {post.frontmatter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-muted px-2 py-1 text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex flex-wrap gap-2">
                        <span>{post.frontmatter.author}</span>

                        <span>•</span>

                        <span>{post.frontmatter.publishedAt}</span>

                        <span>•</span>

                        <span>{post.readingTime ?? "0 min read"}</span>
                      </div>

                      {post.frontmatter.featured && (
                        <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                          Featured
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
