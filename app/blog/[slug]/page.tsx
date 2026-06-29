import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";

import { siteConfig } from "@/lib/site";
import { extractHeadings } from "@/features/blog/utils";
import { getAllPosts, getPostBySlug } from "@/features/blog/lib";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) return {};

  const url = `${siteConfig.url}/blog/${slug}`;

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

      images: [
        {
          url: `${siteConfig.url}${post.frontmatter.image}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,

      images: [`${siteConfig.url}${post.frontmatter.image}`],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: post.frontmatter.title,
    description: post.frontmatter.description,

    image: `${siteConfig.url}${post.frontmatter.image}`,

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
      "@id": `${siteConfig.url}/blog/${slug}`,
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
        item: `${siteConfig.url}/blog/${slug}`,
      },
    ],
  };

  return (
    <Container>
      <ReadingProgress />

      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <div className="py-16">
        {/* Title */}
        <h1 className="mb-4 text-4xl font-bold">{post.frontmatter.title}</h1>

        {/* Meta */}
        <div className="mb-10 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{post.frontmatter.author}</span>

          <span>•</span>

          <span>{post.frontmatter.publishedAt}</span>

          <span>•</span>

          <span>{post.readingTime}</span>
        </div>

        {/* Table of Contents */}
        {headings.length > 0 && (
          <div className="mb-10 rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Table of Contents</h2>

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
                    className="hover:underline text-primary"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Blog Content */}
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
      </div>
    </Container>
  );
}
