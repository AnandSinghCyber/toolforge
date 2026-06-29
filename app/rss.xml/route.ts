import RSS from "rss"
import { getAllPosts } from "@/features/blog/lib"
import { siteConfig } from "@/lib/site"

export async function GET() {
  const posts = getAllPosts()

  const feed = new RSS({
    title: siteConfig.name,
    description: siteConfig.description,
    site_url: siteConfig.url,
    feed_url: `${siteConfig.url}/rss.xml`,
    language: "en",
  })

  posts.forEach((post) => {
    feed.item({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      date: post.frontmatter.publishedAt,
      author: post.frontmatter.author,
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}