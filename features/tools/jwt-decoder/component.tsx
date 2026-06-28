"use client"

import { useState } from "react"

export function JwtDecoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  function decodeJwt(token: string) {
    try {
      const payload = token.split(".")[1]
      const decoded = JSON.parse(atob(payload))
      setOutput(JSON.stringify(decoded, null, 2))
    } catch {
      setOutput("Invalid JWT")
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full min-h-[150px] p-4 border rounded-md text-sm"
        placeholder="Paste JWT token..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          decodeJwt(e.target.value)
        }}
      />

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