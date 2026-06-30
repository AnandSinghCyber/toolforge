export interface Frontmatter {
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
  content: string;
 readingTime: string;
  updatedAt: string;
  frontmatter: Frontmatter;
}