import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        That URL is not part of the WACC calculator.
      </p>
      <div className="mt-6 flex justify-center gap-4 text-sm font-medium">
        <Link href="/" className="text-primary hover:underline">
          Open the calculator
        </Link>
        <Link href="/guide" className="hover:underline">
          Read the WACC guide
        </Link>
      </div>
    </div>
  )
}
