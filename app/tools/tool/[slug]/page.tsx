import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonValidator } from "@/features/tools/json-validator/component"
import { UuidGenerator } from "@/features/tools/uuid-generator/component"
import { Base64Encoder } from "@/features/tools/base64-encoder/component"
import { Base64Decoder } from "@/features/tools/base64-decoder/component"
import { JwtDecoder } from "@/features/tools/jwt-decoder/component"
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { JsonFormatter } from "@/features/tools/json-formatter/component";
import { siteConfig } from "@/lib/site";
import { getToolBySlug, tools } from "@/lib/tools";

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

  const url = `${siteConfig.url}/tools/${tool.slug}`;

  return {
    title: tool.name,
    description: tool.description,
    keywords: tool.keywords,
    authors: [{ name: siteConfig.creator }],
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

      <p className="mb-8 text-muted-foreground">
        {tool.description}
      </p>

      {tool.slug === "json-formatter" && <JsonFormatter />}

      {tool.slug === "json-validator" && <JsonValidator />}

      {tool.slug === "uuid-generator" && <UuidGenerator />}

      {tool.slug === "base64-encoder" && <Base64Encoder />}

      {tool.slug === "base64-decoder" && <Base64Decoder />}

      {tool.slug === "jwt-decoder" && <JwtDecoder />}
    </div>
  </Container>
);
}