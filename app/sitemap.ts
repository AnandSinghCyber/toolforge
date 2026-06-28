import { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Tool Categories
  const categories = [
    "developer",
    "student",
    "productivity",
    "image",
  ];

  // Homepage
  const homeUrl: MetadataRoute.Sitemap[number] = {
    url: siteConfig.url,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  };

  // Tools Listing Page
  const toolsPageUrl: MetadataRoute.Sitemap[number] = {
    url: `${siteConfig.url}/tools`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  };

  // Category Pages
  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteConfig.url}/tools/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Individual Tool Pages
  const toolUrls: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${siteConfig.url}/tools/tool/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    homeUrl,
    toolsPageUrl,
    ...categoryUrls,
    ...toolUrls,
  ];
}