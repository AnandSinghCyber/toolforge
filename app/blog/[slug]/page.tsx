import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

import { ReadingProgress } from "@/components/blog/reading-progress";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";

import { siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools";

import {
  getAllPosts,
  getPostBySlug,
} from "@/features/blog/lib";

import { extractHeadings } from "@/features/blog/utils";
import {
  getRelatedPosts,
  getRelatedTools,
} from "@/features/blog/related";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

/* ============================= */
/* Static Params */
/* ============================= */

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

/* ============================= */
/* Metadata */
/* ============================= */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  const url = `${siteConfig.url}/blog/${slug}`;
  const imageUrl = post.frontmatter.image
    ? `${siteConfig.url}${post.frontmatter.image}`
    : undefined;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,

    authors: [
      {
        name: post.frontmatter.author,
      },
    ],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url,
      type: "article",
      images: imageUrl
        ? [
            {
              url: imageUrl,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

/* ============================= */
/* Page Component */
/* ============================= */

export default async function BlogPostPage({
  params,
}: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);
  const allPosts = getAllPosts();

  const relatedPosts = getRelatedPosts(post, allPosts);
  const relatedTools = getRelatedTools(
    post.frontmatter.tags,
    tools
  );

  const url = `${siteConfig.url}/blog/${slug}`;
  const imageUrl = post.frontmatter.image
    ? `${siteConfig.url}${post.frontmatter.image}`
    : undefined;

  /* ============================= */
  /* Structured Data */
  /* ============================= */

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: imageUrl,
    datePublished: post.frontmatter.publishedAt,
    author: {
      "@type": "Person",
      name: post.frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: `${siteConfig.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.frontmatter.title,
        item: url,
      },
    ],
  };

  return (
    <Container>
      <ReadingProgress />

      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <div className="py-16">
        {/* ============================= */}
        {/* Title */}
        {/* ============================= */}

        <h1 className="mb-4 text-4xl font-bold">
          {post.frontmatter.title}
        </h1>

        {/* ============================= */}
        {/* Meta Info */}
        {/* ============================= */}

        <div className="mb-10 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{post.frontmatter.author}</span>
          <span>•</span>
          <span>{post.frontmatter.publishedAt}</span>
          {post.readingTime && (
            <>
              <span>•</span>
              <span>{post.readingTime}</span>
            </>
          )}
        </div>

        {/* ============================= */}
        {/* Table of Contents */}
        {/* ============================= */}

        {headings.length > 0 && (
          <div className="mb-10 rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">
              Table of Contents
            </h2>

            <ul className="space-y-2 text-sm">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className={
                    heading.depth === 1
                      ? ""
                      : heading.depth === 2
                      ? "ml-4"
                      : heading.depth === 3
                      ? "ml-8"
                      : "ml-12"
                  }
                >
                  <a
                    href={`#${heading.id}`}
                    className="text-primary hover:underline"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ============================= */}
        {/* Article Content */}
        {/* ============================= */}

        <article className="prose dark:prose-invert max-w-none">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: "github-dark",
                    },
                  ],
                ],
              },
            }}
          />
        </article>

        {/* ============================= */}
        {/* Related Articles */}
        {/* ============================= */}

        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-semibold">
              Related Articles
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                >
                  <div className="rounded-lg border p-4 transition hover:shadow">
                    <h3 className="font-semibold">
                      {related.frontmatter.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {related.frontmatter.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ============================= */}
        {/* Related Tools */}
        {/* ============================= */}

        {relatedTools.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-semibold">
              Related Tools
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/tool/${tool.slug}`}
                >
                  <div className="rounded-lg border p-4 transition hover:shadow">
                    <h3 className="font-semibold">
                      {tool.name}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </Container>
  );
}