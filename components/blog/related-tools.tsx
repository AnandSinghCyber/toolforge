import Link from "next/link";
import { Tool } from "@/types/tool";

interface RelatedToolsProps {
  tools: Tool[];
}

export function RelatedTools({
  tools,
}: RelatedToolsProps) {
  if (!tools.length) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-semibold">
        Related Tools
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/tool/${tool.slug}`}
          >
            <div className="rounded-lg border p-4 transition hover:shadow">
              <h3 className="font-semibold">
                {tool.name}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {tool.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}