"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Base64Decoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  function decode() {
    try {
      setOutput(atob(input))
      setError("")
    } catch {
      setError("Invalid Base64 string")
      setOutput("")
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full min-h-[150px] p-4 border rounded-md text-sm"
        placeholder="Enter Base64..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button onClick={decode}>Decode</Button>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {output && (
        <textarea
          className="w-full min-h-[150px] p-4 border rounded-md text-sm"
          value={output}
          readOnly
        />
      )}
    </div>
  )
}