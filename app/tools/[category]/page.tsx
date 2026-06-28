import { notFound } from "next/navigation"
import { Container } from "@/components/layout/container"
import { getToolsByCategory } from "@/lib/tools"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/lib/site"
import type { Metadata } from "next"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

const validCategories = [
  "developer",
  "student",
  "productivity",
  "image"
]

export async function generateMetadata({
  params
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params

  return {
    title: `${category} tools`,
    description: `Free online ${category} tools by ${siteConfig.name}.`,
  }
}

export default async function CategoryPage({
  params
}: CategoryPageProps) {
  const { category } = await params

  if (!validCategories.includes(category)) {
    notFound()
  }

  const tools = getToolsByCategory(category)

  return (
    <Container>
      <div className="py-16">
        <h1 className="text-3xl font-bold mb-8 capitalize">
          {category} Tools
        </h1>

        <div className="grid gap-6 md:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/tool/${tool.slug}`}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  )
}
export async function generateStaticParams() {
  return validCategories.map((category) => ({
    category
  }))
}