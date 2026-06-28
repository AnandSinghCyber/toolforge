"use client"

import { Input } from "@/components/ui/input"
import { useToolSearch } from "@/hooks/use-tool-search"
import { SearchResults } from "./search-results"

export function ToolSearch() {
  const { query, setQuery, results } = useToolSearch()

  return (
    <div className="w-full">
      <Input
        placeholder="Search tools..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <SearchResults results={results} />
    </div>
  )
}