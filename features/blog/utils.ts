import { unified } from "unified";
import remarkParse from "remark-parse";

export interface Heading {
  depth: number;
  text: string;
  id: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function extractHeadings(content: string): Heading[] {
  const tree: any = unified()
    .use(remarkParse)
    .parse(content);

  const headings: Heading[] = [];

  tree.children.forEach((node: any) => {
    if (node.type !== "heading") return;

    const text = node.children
      .map((child: any) => child.value ?? "")
      .join("");

    headings.push({
      depth: node.depth,
      text,
      id: slugify(text),
    });
  });

  return headings;
}