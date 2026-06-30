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
  params: Promise<{ slug: string }>
}

/* ============================= */
/* Static Params */
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
    description: `${tool.description} Fast, secure and completely free.`,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${tool.name} – Free Online Tool`,
      description: tool.description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
  }
}

/* ============================= */
/* Tool Explanation Map */
/* ============================= */

function getToolContent(slug: string) {
  const contentMap: Record<string, any> = {
    "sha256-generator": {
      explanation:
        "SHA256 is a secure hashing algorithm used in blockchain, authentication systems, and digital signatures.",
      exampleInput: "hello",
      exampleOutput:
        "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
      codeSnippet: `crypto.subtle.digest("SHA-256", data)`
    },

    "url-encoder": {
      explanation:
        "URL encoding converts unsafe characters into percent-encoded format so they can be transmitted over the internet.",
      exampleInput: "hello world",
      exampleOutput: "hello%20world",
      codeSnippet: `encodeURIComponent("hello world")`
    },

    "md5-generator": {
      explanation:
        "MD5 generates a 128-bit hash value and is commonly used for checksum verification.",
      exampleInput: "hello",
      exampleOutput: "5d41402abc4b2a76b9719d911017c592",
      codeSnippet: `crypto.subtle.digest("MD5", data)`
    },
  }

  return contentMap[slug] || null
}

/* ============================= */
/* Page */
/* ============================= */

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) notFound()

  const dynamicContent = getToolContent(slug)

  return (
    <Container>
      <div className="py-16">
        <h1 className="mb-4 text-3xl font-bold">
          {tool.name}
        </h1>

        <p className="mb-10 text-muted-foreground">
          {tool.description}
        </p>

        {/* ================= Tool UI ================= */}

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

        {/* ================= SEO Content Block ================= */}

        {dynamicContent && (
          <section className="mt-16 max-w-3xl space-y-6">
            <h2 className="text-xl font-semibold">
              How {tool.name} Works
            </h2>

            <p className="text-muted-foreground">
              {dynamicContent.explanation}
            </p>

            <div>
              <h3 className="font-semibold">Example</h3>
              <p className="text-sm text-muted-foreground">
                Input:
              </p>
              <pre className="bg-muted p-4 rounded-md text-sm">
                {dynamicContent.exampleInput}
              </pre>

              <p className="text-sm text-muted-foreground mt-4">
                Output:
              </p>
              <pre className="bg-muted p-4 rounded-md text-sm">
                {dynamicContent.exampleOutput}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold">
                JavaScript Example
              </h3>
              <pre className="bg-muted p-4 rounded-md text-sm">
                {dynamicContent.codeSnippet}
              </pre>
            </div>
          </section>
        )}
      </div>
    </Container>
  )
}