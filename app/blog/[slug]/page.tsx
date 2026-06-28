import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/features/blog/lib";
import { Container } from "@/components/layout/container";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container>
      <article className="prose dark:prose-invert max-w-4xl py-16">
        <h1>{post.frontmatter.title}</h1>
        <p className="mt-2 text-muted-foreground">
          {post.frontmatter.description}
        </p>

        <div className="mt-4 mb-8 text-sm text-muted-foreground">
          <span>{post.frontmatter.author}</span>
          {" • "}
          <span>{post.frontmatter.publishedAt}</span>
        </div>

        <p className="text-muted-foreground">{post.frontmatter.description}</p>

        <hr className="my-8" />

        <pre className="whitespace-pre-wrap">{post.content}</pre>
      </article>
    </Container>
  );
}
