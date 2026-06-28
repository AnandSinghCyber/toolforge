import Link from "next/link";

import { Container } from "@/components/layout/container";
import { ToolSearch } from "@/components/search/tool-search";

import { Card, CardContent } from "@/components/ui/card";

import { tools } from "@/lib/tools";

export default function ToolsPage() {
  return (
    <Container>
      <div className="py-16">
        {/* Page Heading */}
        <h1 className="mb-4 text-3xl font-bold">
          All Tools
        </h1>

        <p className="mb-8 text-muted-foreground">
          Browse all free online developer, student, productivity, and image tools.
        </p>

        {/* Search */}
        <div className="mb-8">
          <ToolSearch />
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/tool/${tool.slug}`}
            >
              <Card className="h-full transition hover:shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold">
                    {tool.name}
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {tool.description}
                  </p>

                  <div className="mt-4">
                    <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs capitalize">
                      {tool.category}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}