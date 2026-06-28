"use client"

import { useMemo, useState } from "react"
import { tools } from "@/lib/tools"
import { searchTools } from "@/features/search/search-utils"

export function useToolSearch() {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    return searchTools(tools, query)
  }, [query])

  return {
    query,
    setQuery,
    results
  }
}