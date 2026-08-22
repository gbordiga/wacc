import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/sonner"
import { homeSeo, site } from "@/lib/site"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeSeo.title,
    template: `%s | ${site.name}`,
  },
  description: homeSeo.description,
  applicationName: "WACC Calculator",
  authors: [{ name: site.creator, url: site.github }],
  creator: site.creator,
  keywords: [
    "WACC calculator",
    "weighted average cost of capital",
    "cost of equity",
    "cost of debt",
    "CAPM",
    "cost of capital",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.description,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeSeo.title,
    description: homeSeo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "finance",
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  themeColor: "#5135E8",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-pb-24" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen`}>
        <Providers>
          <div className="flex min-h-screen flex-col has-[[data-live-wacc-bar]]:[&_footer]:pb-[calc(7rem+env(safe-area-inset-bottom,0px))]">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  )
}
