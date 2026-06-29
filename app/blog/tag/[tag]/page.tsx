import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/site";
import { getAllPosts } from "@/features/blog/lib";
import {
  getAllTags,
  getPostsByTag,
} from "@/features/blog/utils";

interface Props {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = getAllTags(posts);

  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.toLowerCase()),
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { tag } = await params;

  const decodedTag = decodeURIComponent(tag);

  return {
    title: `${decodedTag} Articles`,
    description: `Explore articles about ${decodedTag} on ${siteConfig.name}.`,
    alternates: {
      canonical: `${siteConfig.url}/blog/tag/${tag}`,
    },
    openGraph: {
      title: `${decodedTag} Articles`,
      description: `Explore articles about ${decodedTag} on ${siteConfig.name}.`,
      url: `${siteConfig.url}/blog/tag/${tag}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${decodedTag} Articles`,
      description: `Explore articles about ${decodedTag} on ${siteConfig.name}.`,
    },
  };
}

export default async function TagPage({
  params,
}: Props) {
  const { tag } = await params;

  const decodedTag = decodeURIComponent(tag);

  const posts = getAllPosts();

  const filteredPosts = getPostsByTag(
    posts,
    decodedTag
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <Container>
      <div className="py-16">
        <h1 className="mb-10 text-4xl font-bold capitalize">
          Articles tagged "{decodedTag}"
        </h1>

        <p className="mb-10 text-muted-foreground">
          {filteredPosts.length} article
          {filteredPosts.length !== 1 ? "s" : ""} found
        </p>

        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
            >
              <div className="rounded-lg border p-6 transition hover:shadow-md">
                <h2 className="text-xl font-semibold">
                  {post.frontmatter.title}
                </h2>

                <p className="mt-2 text-muted-foreground">
                  {post.frontmatter.excerpt}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>{post.frontmatter.publishedAt}</span>

                  <span>{post.readingTime}</span>

                  <span>{post.frontmatter.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}