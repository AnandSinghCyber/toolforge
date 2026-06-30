import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { ToolSearch } from "@/components/search/tool-search";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";

import { siteConfig } from "@/lib/site";
import { getFeaturedTools } from "@/lib/tools";
import { getAllPosts } from "@/features/blog/lib";

/* ============================= */
/* SEO Metadata */
/* ============================= */

export const metadata: Metadata = {
  title: "Free Online Developer Tools | JSON Formatter, Hash Generators & More",

  description:
    "Free online developer tools including JSON Formatter, JSON Validator, SHA256 Generator, SHA1 Generator, MD5 Generator, UUID Generator, Base64 Encoder & Decoder, JWT Decoder, Unix Timestamp Converter, HTTP Header Parser and more.",

  alternates: {
    canonical: siteConfig.url,
  },
};

/* ============================= */
/* Categories */
/* ============================= */

const categories = [
  {
    title: "Developer Tools",
    href: "/tools/developer",
    description: "JSON, Hash Generators, UUID, JWT, Base64 and more",
  },
  {
    title: "Student Tools",
    href: "/tools/student",
    description: "CGPA, GPA, Percentage calculators",
  },
  {
    title: "Productivity Tools",
    href: "/tools/productivity",
    description: "QR Generator, Word Counter, Timers",
  },
  {
    title: "Image Tools",
    href: "/tools/image",
    description: "Compress, Resize, Convert images",
  },
];

/* ============================= */
/* Page */
/* ============================= */

export default function HomePage() {
  const featuredTools = getFeaturedTools();
  const latestPosts = getAllPosts().slice(0, 3);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/tools?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are all tools on ToolForge free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All tools on ToolForge are completely free to use with no signup required.",
        },
      },
      {
        "@type": "Question",
        name: "Is my data stored when using these tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All tools run entirely in your browser. We do not store or process your input data on any server.",
        },
      },
      {
        "@type": "Question",
        name: "Are ToolForge tools secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Most tools operate fully client-side using secure browser APIs such as Web Crypto.",
        },
      },
    ],
  };
  return (
    <main>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* ================= Hero ================= */}

      <section className="py-20 text-center">
        <Container>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Free Online Developer Tools, JSON Formatter, Hash Generators & More
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            Use free online developer tools including JSON Formatter, JSON
            Validator, SHA256 Generator, SHA1 Generator, MD5 Generator, UUID
            Generator, Base64 Encoder & Decoder, JWT Decoder, Unix Timestamp
            Converter, HTTP Header Parser and URL Encoder. Fast, secure and
            privacy-friendly — no signup required.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <ToolSearch />
          </div>
        </Container>
      </section>

      {/* ================= Categories ================= */}

      <section className="py-16">
        <Container>
          <h2 className="mb-8 text-2xl font-semibold">Explore Categories</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.title} href={category.href}>
                <Card className="h-full transition hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">{category.title}</h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= Featured Tools ================= */}

      <section className="bg-muted/40 py-16">
        <Container>
          <h2 className="mb-8 text-2xl font-semibold">
            Featured Developer Tools
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredTools.map((tool) => (
              <Link key={tool.slug} href={`/tools/tool/${tool.slug}`}>
                <Card className="h-full transition hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="font-semibold">{tool.name}</h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= Latest Blog Posts ================= */}

      <section className="py-16">
        <Container>
          <h2 className="mb-8 text-2xl font-semibold">Latest Articles</h2>

          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full transition hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="font-semibold">{post.frontmatter.title}</h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {post.frontmatter.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ================= FAQ Section ================= */}

      <section className="bg-muted/40 py-16">
        <Container>
          <h2 className="mb-8 text-2xl font-semibold">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 max-w-3xl">
            <div>
              <h3 className="font-semibold">Are all tools free?</h3>
              <p className="text-muted-foreground mt-2">
                Yes. All tools on ToolForge are completely free to use with no
                signup required.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Is my data stored?</h3>
              <p className="text-muted-foreground mt-2">
                No. All tools run entirely in your browser. We do not store your
                input data.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Are the tools secure?</h3>
              <p className="text-muted-foreground mt-2">
                Yes. All processing happens client-side using secure browser
                APIs.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
