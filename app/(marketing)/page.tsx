import Link from "next/link";

import { Container } from "@/components/layout/container";
import { ToolSearch } from "@/components/search/tool-search";

import { Card, CardContent } from "@/components/ui/card";

import { getFeaturedTools } from "@/lib/tools";

const categories = [
  {
    title: "Developer Tools",
    href: "/tools/developer",
    description: "JSON, Base64, UUID, JWT and more",
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

export default function HomePage() {
  const featuredTools = getFeaturedTools();

  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 text-center">
        <Container>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Free Online Tools for Developers & Students
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Fast, modern and SEO-optimized tools to simplify your daily workflow.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <ToolSearch />
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-16">
        <Container>
          <h2 className="mb-8 text-2xl font-semibold">
            Explore Categories
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
              >
                <Card className="h-full transition hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">
                      {category.title}
                    </h3>

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

      {/* Featured Tools */}
      <section className="bg-muted/40 py-16">
        <Container>
          <h2 className="mb-8 text-2xl font-semibold">
            Featured Tools
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/tool/${tool.slug}`}
              >
                <Card className="h-full transition hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="font-semibold">
                      {tool.name}
                    </h3>

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
    </main>
  );
}