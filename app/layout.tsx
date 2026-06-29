import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { siteConfig } from "@/lib/site"

import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} - Free Online Developer & Student Tools`,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: [
    "json formatter",
    "developer tools",
    "student calculator",
    "online tools",
    "free tools",
  ],

  openGraph: {
    title: `${siteConfig.name} - Free Online Tools`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Free Online Tools`,
    description: siteConfig.description,
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": `${siteConfig.url}/rss.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}