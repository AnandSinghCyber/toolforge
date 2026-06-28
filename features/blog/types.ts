export interface BlogFrontmatter {
  title: string;
  description: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  author: string;
  image: string;
  tags: string[];
  featured: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}