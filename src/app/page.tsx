import type { Metadata } from "next"
import Calculator from "@/components/Calculator"
import { HomeFaq } from "@/components/home/HomeFaq"
import { HomeSeoContent } from "@/components/home/HomeSeoContent"
import { JsonLd } from "@/components/JsonLd"
import { homeSeo } from "@/lib/site"
import { homeGraphJsonLd } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: {
    absolute: homeSeo.title,
  },
  description: homeSeo.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.description,
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeSeo.title,
    description: homeSeo.description,
  },
}

export default function CalculatorPage() {
  return (
    <div className="container mx-auto w-full max-w-5xl py-6 pb-24 print:max-w-none print:py-0">
      <JsonLd data={homeGraphJsonLd()} />
      <div className="mb-6 print:hidden">
        <h1 className="text-2xl font-semibold tracking-tight">
          <span className="text-primary">WACC</span> Calculator
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Free weighted average cost of capital calculator. Cost of equity
          (CAPM), after-tax cost of debt, and WACC from Damodaran, Fernandez,
          and Kroll data.
        </p>
      </div>
      <Calculator />
      <div className="mt-12 space-y-10 print:hidden">
        <HomeSeoContent />
        <HomeFaq />
      </div>
    </div>
  )
}
