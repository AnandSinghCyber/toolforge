export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <div className="inline-flex rounded-full border px-4 py-2 text-sm">
          🚀 Free Online Tools for Everyone
        </div>

        <h1 className="mt-6 text-5xl font-bold tracking-tight">
          ToolForge
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Free developer, student, productivity and image tools.
          Fast, modern and SEO optimized.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="/tools"
            className="rounded-lg bg-foreground px-6 py-3 text-background"
          >
            Explore Tools
          </a>

          <a
            href="/blog"
            className="rounded-lg border px-6 py-3"
          >
            Read Blog
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Categories
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">Developer Tools</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              JSON, UUID, JWT and encoding utilities.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">Student Tools</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              CGPA, GPA, percentage and attendance calculators.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">Productivity Tools</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              QR generator, word counter and Pomodoro timer.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">Image Tools</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Resize, compress and convert images.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}