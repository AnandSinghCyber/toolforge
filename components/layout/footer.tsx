import { Container } from "./container"

export function Footer() {
  return (
    <footer className="border-t py-8 mt-20">
      <Container>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ToolForge. Free online tools for developers and students.
        </p>
      </Container>
    </footer>
  )
}