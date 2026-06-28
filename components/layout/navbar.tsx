import Link from "next/link"
import { Container } from "./container"

export function Navbar() {
  return (
    <header className="border-b">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            ToolForge
          </Link>

          <nav className="flex items-center gap-6 text-sm">
            <Link href="/tools">Tools</Link>
            <Link href="/blog">Blog</Link>
          </nav>
        </div>
      </Container>
    </header>
  )
}