import { Tool } from "@/types/tool"

export function searchTools(tools: Tool[], query: string): Tool[] {
  if (!query.trim()) return []

  const lowerQuery = query.toLowerCase()

  return tools.filter((tool) => {
    return (
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.category.toLowerCase().includes(lowerQuery) ||
      tool.keywords.some((keyword) =>
        keyword.toLowerCase().includes(lowerQuery)
      )
    )
  })
}