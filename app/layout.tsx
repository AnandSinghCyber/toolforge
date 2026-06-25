import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://toolforge-ruddy.vercel.app"),
  title: {
    default: "ToolForge - Free Online Developer & Student Tools",
    template: "%s | ToolForge",
  },
  description:
    "ToolForge provides free online developer, student, productivity, and image tools.",
  keywords: [
    "json formatter",
    "developer tools",
    "student calculator",
    "online tools",
    "free tools",
  ],
  openGraph: {
    title: "ToolForge - Free Online Tools",
    description:
      "Free modern online tools for developers, students and professionals.",
    url: "https://toolforge-ruddy.vercel.app",
    siteName: "ToolForge",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}