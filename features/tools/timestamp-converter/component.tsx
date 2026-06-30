"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function TimestampConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  function convert() {
    const date = new Date(Number(input) * 1000)
    setOutput(date.toString())
  }

  return (
    <div className="space-y-4">
      <input
        type="number"
        className="w-full p-4 border rounded-md"
        placeholder="Enter Unix timestamp"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button onClick={convert}>
        Convert
      </Button>

      {output && (
        <div className="p-4 border rounded-md">
          {output}
        </div>
      )}
    </div>
  )
}
