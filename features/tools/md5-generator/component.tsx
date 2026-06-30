"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Md5Generator() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  async function generateHash() {
    const encoder = new TextEncoder()
    const data = encoder.encode(input)

    const hashBuffer = await crypto.subtle.digest("MD5", data).catch(() => null)

    if (!hashBuffer) {
      setOutput("MD5 not supported in this browser")
      return
    }

    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")

    setOutput(hashHex)
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full min-h-[150px] p-4 border rounded-md text-sm"
        placeholder="Enter text..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button onClick={generateHash}>
        Generate MD5
      </Button>

      {output && (
        <div className="p-4 border rounded-md break-all text-sm">
          {output}
        </div>
      )}
    </div>
  )
}