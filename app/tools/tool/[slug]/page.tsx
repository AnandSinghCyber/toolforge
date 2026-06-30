import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Container } from "@/components/layout/container"
import { JsonLd } from "@/components/seo/json-ld"

import { siteConfig } from "@/lib/site"
import { tools, getToolBySlug } from "@/lib/tools"

import { JsonFormatter } from "@/features/tools/json-formatter/component"
import { JsonValidator } from "@/features/tools/json-validator/component"
import { UuidGenerator } from "@/features/tools/uuid-generator/component"
import { Base64Encoder } from "@/features/tools/base64-encoder/component"
import { Base64Decoder } from "@/features/tools/base64-decoder/component"
import { JwtDecoder } from "@/features/tools/jwt-decoder/component"
import { UrlEncoder } from "@/features/tools/url-encoder/component"
import { Sha256Generator } from "@/features/tools/sha256-generator/component"
import { Md5Generator } from "@/features/tools/md5-generator/component"
import { Sha1Generator } from "@/features/tools/sha1-generator/component"
import { TimestampConverter } from "@/features/tools/timestamp-converter/component"
import { HttpHeaderParser } from "@/features/tools/http-header-parser/component"

interface Props {
  params: Promise<{
    slug: string
  }>
}

/* ============================= */
/* Static Generation */
/* ============================= */

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }))
}

/* ============================= */
/* Metadata */
/* ============================= */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) return {}

  const url = `${siteConfig.url}/tools/tool/${tool.slug}`

  return {
    title: `${tool.name} – Free Online Tool`,
    description: `${tool.description} Fast, secure and completely free to use.`,
    keywords: tool.keywords,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: `${tool.name} – Free Online Tool`,
      description: tool.description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${tool.name} – Free Online Tool`,
      description: tool.description,
    },
  }
}

/* ============================= */
/* Page Component */
/* ============================= */

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${tool.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: tool.description,
        },
      },
      {
        "@type": "Question",
        name: `Is ${tool.name} free to use?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All tools on ToolForge are completely free to use.",
        },
      },
    ],
  }

  return (
    <Container>
      <JsonLd data={toolJsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="py-16">
        <h1 className="mb-4 text-3xl font-bold">
          {tool.name}
        </h1>

        <p className="mb-8 text-muted-foreground">
          {tool.description}
        </p>

        {/* ================= Tool Render Switch ================= */}

        {tool.slug === "json-formatter" && <JsonFormatter />}
        {tool.slug === "json-validator" && <JsonValidator />}
        {tool.slug === "uuid-generator" && <UuidGenerator />}
        {tool.slug === "base64-encoder" && <Base64Encoder />}
        {tool.slug === "base64-decoder" && <Base64Decoder />}
        {tool.slug === "jwt-decoder" && <JwtDecoder />}
        {tool.slug === "url-encoder" && <UrlEncoder />}
        {tool.slug === "sha256-generator" && <Sha256Generator />}
        {tool.slug === "md5-generator" && <Md5Generator />}
        {tool.slug === "sha1-generator" && <Sha1Generator />}
        {tool.slug === "timestamp-converter" && <TimestampConverter />}
        {tool.slug === "http-header-parser" && <HttpHeaderParser />}

        {/* ================= Extra Content Section ================= */}

        <section className="mt-16 max-w-2xl">
          <h2 className="mb-4 text-xl font-semibold">
            About {tool.name}
          </h2>

          <p className="text-muted-foreground">
            {tool.name} helps developers and professionals perform quick
            operations directly in the browser without installing software.
            It is fast, secure and works entirely client-side.
          </p>
        </section>
      </div>
    </Container>
  )
}