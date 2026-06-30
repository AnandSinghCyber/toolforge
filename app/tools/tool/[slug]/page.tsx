import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";

import { siteConfig } from "@/lib/site";
import { getToolBySlug, tools } from "@/lib/tools";

import { getAllPosts } from "@/features/blog/lib";
import {
  getRelatedPosts,
  getRelatedTools,
} from "@/features/blog/related";

import { RelatedPosts } from "@/components/blog/related-posts";
import { RelatedTools } from "@/components/blog/related-tools";

import { JsonFormatter } from "@/features/tools/json-formatter/component";
import { JsonValidator } from "@/features/tools/json-validator/component";
import { UuidGenerator } from "@/features/tools/uuid-generator/component";
import { Base64Encoder } from "@/features/tools/base64-encoder/component";
import { Base64Decoder } from "@/features/tools/base64-decoder/component";
import { JwtDecoder } from "@/features/tools/jwt-decoder/component";
import { UrlEncoder } from "@/features/tools/url-encoder/component";
import { Sha256Generator } from "@/features/tools/sha256-generator/component";

import { Md5Generator } from "@/features/tools/md5-generator/component";
import { Sha1Generator } from "@/features/tools/sha1-generator/component";
import { TimestampConverter } from "@/features/tools/timestamp-converter/component";
import { HttpHeaderParser } from "@/features/tools/http-header-parser/component";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const tool = getToolBySlug(slug);

  if (!tool) return {};

  const url = `${siteConfig.url}/tools/tool/${tool.slug}`;

  return {
    title: tool.name,
    description: tool.description,
    keywords: tool.keywords,

    authors: [
      {
        name: siteConfig.creator,
      },
    ],

    creator: siteConfig.creator,
    publisher: siteConfig.name,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: tool.name,
      description: tool.description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: tool.name,
      description: tool.description,
    },
  };
}

export default async function ToolPage({
  params,
}: Props) {
  const { slug } = await params;

  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const allPosts = getAllPosts();

  const relatedPosts = getRelatedPosts(
    {
      slug: tool.slug,
      frontmatter: {
        title: tool.name,
        description: tool.description,
        excerpt: tool.description,
        category: tool.category,
        publishedAt: "",
        author: "",
        image: "",
        tags: tool.keywords,
        featured: false,
      },
      content: "",
      readingTime: "",
    },
    allPosts
  );

  const relatedTools = getRelatedTools(
    tool.keywords,
    tools
  ).filter((t) => t.slug !== tool.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",

    name: tool.name,
    description: tool.description,

    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",

    creator: {
      "@type": "Organization",
      name: siteConfig.name,
    },

    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <Container>
      <div className="py-16">
        <JsonLd data={jsonLd} />

        <h1 className="mb-4 text-3xl font-bold">
          {tool.name}
        </h1>

        <p className="mb-10 text-muted-foreground">
          {tool.description}
        </p>

        {/* Existing Tools */}
        {tool.slug === "json-formatter" && <JsonFormatter />}
        {tool.slug === "json-validator" && <JsonValidator />}
        {tool.slug === "uuid-generator" && <UuidGenerator />}
        {tool.slug === "base64-encoder" && <Base64Encoder />}
        {tool.slug === "base64-decoder" && <Base64Decoder />}
        {tool.slug === "jwt-decoder" && <JwtDecoder />}
        {tool.slug === "url-encoder" && <UrlEncoder />}
        {tool.slug === "sha256-generator" && <Sha256Generator />}

        {/* New Developer Tools */}
        {tool.slug === "md5-generator" && <Md5Generator />}
        {tool.slug === "sha1-generator" && <Sha1Generator />}
        {tool.slug === "timestamp-converter" && (
          <TimestampConverter />
        )}
        {tool.slug === "http-header-parser" && (
          <HttpHeaderParser />
        )}

        {/* Related Developer Tools */}
        {relatedTools.length > 0 && (
          <RelatedTools tools={relatedTools} />
        )}

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} />
        )}
      </div>
    </Container>
  );
}