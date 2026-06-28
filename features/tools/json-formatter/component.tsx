"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function JsonFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  function formatJson() {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError("")
    } catch (err) {
      setError("Invalid JSON")
      setOutput("")
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full min-h-[200px] p-4 border rounded-md text-sm"
        placeholder="Paste your JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button onClick={formatJson}>
        Format JSON
      </Button>

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

      {output && (
        <textarea
          className="w-full min-h-[200px] p-4 border rounded-md text-sm"
          value={output}
          readOnly
        />
      )}
    </div>
  )
}