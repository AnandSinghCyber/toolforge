import Link from "next/link"
import { Tool } from "@/types/tool"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
  results: Tool[]
}

export function SearchResults({ results }: Props) {
  if (!results.length) return null

  return (
    <div className="mt-6 grid gap-4">
      {results.map((tool) => (
        <Link
          key={tool.slug}
          href={`/tools/tool/${tool.slug}`}
        >
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold">
                {tool.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {tool.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}