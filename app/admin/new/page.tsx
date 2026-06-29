"use client"

import { useState } from "react"

export default function NewPostPage() {
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!slug || !content) {
      alert("Slug and content are required.")
      return
    }

    try {
      setLoading(true)

      const response = await fetch("/api/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET!,
        },
        body: JSON.stringify({ slug, content }),
      })

      if (!response.ok) {
        throw new Error("Failed to create post")
      }

      alert("Post created! Vercel will rebuild.")
      setSlug("")
      setContent("")
    } catch (error) {
      console.error(error)
      alert("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-16">
      <h1 className="text-2xl font-bold mb-4">
        Create New Post
      </h1>

      <input
        placeholder="slug (example: my-new-post)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="border p-2 block mb-4 w-full"
      />

      <textarea
        placeholder="MDX content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full h-96 mb-4"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="border px-4 py-2"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  )
}