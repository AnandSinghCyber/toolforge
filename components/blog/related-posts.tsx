import Link from "next/link";
import { BlogPost } from "@/features/blog/types";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-semibold">
        Related Articles
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
          >
            <div className="rounded-lg border p-4 transition hover:shadow">
              <h3 className="font-semibold">
                {post.frontmatter.title}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {post.frontmatter.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}