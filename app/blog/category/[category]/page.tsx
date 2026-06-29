import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { getAllPosts } from "@/features/blog/lib";
import {
  getAllCategories,
  getPostsByCategory,
} from "@/features/blog/utils";
import { siteConfig } from "@/lib/site";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const categories = getAllCategories(posts);

  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category } = await params;

  const formatted =
    category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `${formatted} Articles`,
    description: `Browse ${formatted} articles on ${siteConfig.name}.`,
    alternates: {
      canonical: `${siteConfig.url}/blog/category/${category}`,
    },

    openGraph: {
      title: `${formatted} Articles`,
      description: `Browse ${formatted} articles on ${siteConfig.name}.`,
      url: `${siteConfig.url}/blog/category/${category}`,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${formatted} Articles`,
      description: `Browse ${formatted} articles on ${siteConfig.name}.`,
    },
  };
}

export default async function CategoryPage({
  params,
}: Props) {
  const { category } = await params;

  const posts = getAllPosts();

  const filteredPosts = getPostsByCategory(posts, category);

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <Container>
      <div className="py-16">
        <h1 className="mb-3 text-4xl font-bold capitalize">
          {category} Articles
        </h1>

        <p className="mb-10 text-muted-foreground">
          {filteredPosts.length} article
          {filteredPosts.length !== 1 ? "s" : ""} found
        </p>

        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
            >
              <article className="rounded-xl border p-6 transition hover:shadow-md">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span>{post.frontmatter.author}</span>

                  <span>•</span>

                  <span>{post.frontmatter.publishedAt}</span>

                  <span>•</span>

                  <span>{post.readingTime}</span>
                </div>

                <h2 className="text-2xl font-semibold">
                  {post.frontmatter.title}
                </h2>

                <p className="mt-3 text-muted-foreground">
                  {post.frontmatter.excerpt}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-3 py-1 text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}