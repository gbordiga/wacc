import Link from "next/link"
import { RelatedGuides } from "@/components/guide/RelatedGuides"
import { relatedGuidesExcept } from "@/data/articles"

const highlights = [
  {
    title: "Cost of equity (CAPM)",
    body: "Risk-free rate, levered beta, market risk premium, Kroll size premium, and company-specific risk.",
    href: "/guide#cost-of-equity",
  },
  {
    title: "Cost of debt",
    body: "Credit spread from interest coverage, then after-tax kd because interest is tax-deductible.",
    href: "/guide#cost-of-debt",
  },
  {
    title: "Country and sector data",
    body: "Fernandez country premiums, Damodaran sector betas and tax rates, updated for 2025–2026.",
    href: "/guide/damodaran-wacc",
  },
]

export function HomeSeoContent() {
  return (
    <div className="space-y-10">
    <section aria-labelledby="how-it-works-heading" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2
          id="how-it-works-heading"
          className="text-xl font-semibold tracking-tight"
        >
          How this WACC calculator works
        </h2>
        <Link
          href="/guide"
          className="text-sm font-medium text-primary hover:underline"
        >
          Read the WACC guide
        </Link>
      </div>
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Weighted average cost of capital blends the return equity investors
        require with the after-tax cost of debt. Use it as the discount rate in
        a DCF or as the hurdle rate for project NPV.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-xl border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <h3 className="font-medium">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </Link>
        ))}
      </div>
    </section>
    <RelatedGuides items={relatedGuidesExcept("/")} />
    </div>
  )
}
