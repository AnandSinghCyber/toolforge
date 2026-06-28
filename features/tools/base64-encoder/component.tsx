"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Base64Encoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  function encode() {
    setOutput(btoa(input))
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full min-h-[150px] p-4 border rounded-md text-sm"
        placeholder="Enter text..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button onClick={encode}>Encode</Button>

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