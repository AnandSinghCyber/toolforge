import { Tool } from "@/types/tool";

export const tools: Tool[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description:
      "Format, beautify and validate JSON instantly with our free online JSON Formatter.",
    category: "developer",
    keywords: [
      "json formatter",
      "format json online",
      "beautify json",
    ],
    featured: true,
  },
  {
    slug: "json-validator",
    name: "JSON Validator",
    description:
      "Validate JSON instantly and detect syntax errors with our free JSON Validator tool.",
    category: "developer",
    keywords: [
      "json validator",
      "validate json online",
    ],
    featured: true,
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description:
      "Generate secure UUID v4 instantly with our free online UUID Generator.",
    category: "developer",
    keywords: [
      "uuid generator",
      "generate uuid online",
    ],
    featured: true,
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder",
    description:
      "Encode text to Base64 instantly with our free Base64 Encoder tool.",
    category: "developer",
    keywords: [
      "base64 encode",
      "encode base64 online",
    ],
    featured: false,
  },
  {
    slug: "base64-decoder",
    name: "Base64 Decoder",
    description:
      "Decode Base64 strings instantly using our free online Base64 Decoder.",
    category: "developer",
    keywords: [
      "base64 decode",
      "decode base64 online",
    ],
    featured: false,
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description:
      "Decode and inspect JWT tokens instantly with our free JWT Decoder tool.",
    category: "developer",
    keywords: [
      "jwt decoder",
      "decode jwt online",
    ],
    featured: false,
  },
];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string) {
  return tools.filter((tool) => tool.category === category);
}

export function getFeaturedTools() {
  return tools.filter((tool) => tool.featured);
}