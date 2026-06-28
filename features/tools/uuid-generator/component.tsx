"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function UuidGenerator() {
  const [uuid, setUuid] = useState("")

  function generateUuid() {
    setUuid(crypto.randomUUID())
  }

  return (
    <div className="space-y-4">
      <Button onClick={generateUuid}>Generate UUID</Button>

      {uuid && (
        <div className="p-4 border rounded-md break-all text-sm">
          {uuid}
        </div>
      )}
    </div>
  )
}