"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function JsonValidator() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<string | null>(null)

  function validateJson() {
    try {
      JSON.parse(input)
      setResult("✅ Valid JSON")
    } catch {
      setResult("❌ Invalid JSON")
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full min-h-[200px] p-4 border rounded-md text-sm"
        placeholder="Paste JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button onClick={validateJson}>Validate JSON</Button>

      {result && <p className="text-sm">{result}</p>}
    </div>
  )
}