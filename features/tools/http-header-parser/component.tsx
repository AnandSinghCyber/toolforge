"use client"

import { useState } from "react"

export function HttpHeaderParser() {
  const [input, setInput] = useState("")
  const [parsed, setParsed] = useState<Record<string, string>>({})

  function parseHeaders() {
    const lines = input.split("\n")
    const result: Record<string, string> = {}

    lines.forEach((line) => {
      const [key, ...value] = line.split(":")
      if (key && value.length) {
        result[key.trim()] = value.join(":").trim()
      }
    })

    setParsed(result)
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full min-h-[150px] p-4 border rounded-md text-sm"
        placeholder="Paste raw HTTP headers..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={parseHeaders}
        className="border px-4 py-2"
      >
        Parse
      </button>

      <pre className="p-4 border rounded-md text-sm overflow-auto">
        {JSON.stringify(parsed, null, 2)}
      </pre>
    </div>
  )
}