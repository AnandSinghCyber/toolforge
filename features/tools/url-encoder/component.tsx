"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function UrlEncoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [error, setError] = useState("")

  function handleConvert() {
    try {
      setError("")
      if (mode === "encode") {
        setOutput(encodeURIComponent(input))
      } else {
        setOutput(decodeURIComponent(input))
      }
    } catch {
      setError("Invalid URL string")
      setOutput("")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button
          variant={mode === "encode" ? "default" : "outline"}
          onClick={() => setMode("encode")}
        >
          Encode
        </Button>

        <Button
          variant={mode === "decode" ? "default" : "outline"}
          onClick={() => setMode("decode")}
        >
          Decode
        </Button>
      </div>

      <textarea
        className="w-full min-h-[150px] p-4 border rounded-md text-sm"
        placeholder="Enter URL..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button onClick={handleConvert}>
        Convert
      </Button>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

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