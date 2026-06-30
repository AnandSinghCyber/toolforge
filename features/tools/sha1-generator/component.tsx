"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Sha1Generator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateHash() {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      setLoading(true);

      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      const hashBuffer = await crypto.subtle.digest("SHA-1", data);

      const hashArray = Array.from(new Uint8Array(hashBuffer));

      const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      setOutput(hashHex);
    } catch (error) {
      console.error(error);
      setOutput("Unable to generate SHA-1 hash.");
    } finally {
      setLoading(false);
    }
  }

  function copyHash() {
    if (!output) return;

    navigator.clipboard.writeText(output);
  }

  function clearAll() {
    setInput("");
    setOutput("");
  }

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="sha1-input"
          className="mb-2 block text-sm font-medium"
        >
          Text to Hash
        </label>

        <textarea
          id="sha1-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text..."
          className="min-h-[180px] w-full rounded-lg border p-4 text-sm outline-none focus:ring-2"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={generateHash} disabled={loading}>
          {loading ? "Generating..." : "Generate SHA-1"}
        </Button>

        <Button
          variant="secondary"
          onClick={copyHash}
          disabled={!output}
        >
          Copy
        </Button>

        <Button
          variant="outline"
          onClick={clearAll}
        >
          Clear
        </Button>
      </div>

      <div>
        <label
          htmlFor="sha1-output"
          className="mb-2 block text-sm font-medium"
        >
          SHA-1 Hash
        </label>

        <textarea
          id="sha1-output"
          readOnly
          value={output}
          className="min-h-[120px] w-full rounded-lg border bg-muted p-4 font-mono text-sm"
        />
      </div>
    </div>
  );
}