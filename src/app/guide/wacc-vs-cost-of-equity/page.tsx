import type { Metadata } from "next"
import Link from "next/link"
import { FaqList } from "@/components/FaqList"
import { GuideBreadcrumb } from "@/components/guide/GuideBreadcrumb"
import { GuideCta } from "@/components/guide/GuideCta"
import { RelatedGuides } from "@/components/guide/RelatedGuides"
import { JsonLd } from "@/components/JsonLd"
import { KaTeXFormula } from "@/components/KaTeXFormula"
import { relatedGuidesExcept, waccVsEquityRows } from "@/data/articles"
import { waccVsEquityFaqItems } from "@/data/faq"
import { waccVsEquitySeo } from "@/lib/site"
import { articleGraphJsonLd } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: {
    absolute: waccVsEquitySeo.title,
  },
  description: waccVsEquitySeo.description,
  alternates: {
    canonical: waccVsEquitySeo.path,
  },
  openGraph: {
    title: waccVsEquitySeo.title,
    description: waccVsEquitySeo.description,
    url: waccVsEquitySeo.path,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: waccVsEquitySeo.title,
    description: waccVsEquitySeo.description,
  },
}

const sections = [
  { href: "#what-they-mean", label: "What they mean" },
  { href: "#the-rule", label: "The rule" },
  { href: "#comparison", label: "Comparison" },
  { href: "#when-to-use", label: "When to use each" },
  { href: "#example", label: "Example" },
  { href: "#mistakes", label: "Mistakes" },
  { href: "#faq-heading", label: "FAQ" },
]

export default function WaccVsCostOfEquityPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-10 text-foreground">
      <JsonLd
        data={articleGraphJsonLd({
          path: waccVsEquitySeo.path,
          title: waccVsEquitySeo.title,
          description: waccVsEquitySeo.description,
          breadcrumbs: [
            { name: "WACC Calculator", path: "/" },
            { name: "WACC Guide", path: "/guide" },
            { name: "WACC vs Cost of Equity", path: waccVsEquitySeo.path },
          ],
          faqItems: waccVsEquityFaqItems,
        })}
      />
      <GuideBreadcrumb
        items={[
          { label: "WACC Calculator", href: "/" },
          { label: "WACC Guide", href: "/guide" },
          { label: "WACC vs Cost of Equity" },
        ]}
      />
      <h1 className="text-4xl font-bold mb-4 text-center">
        WACC vs cost of equity
      </h1>
      <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
        Two rates, two questions. Cost of equity is what the owners expect to
        earn. WACC is what the company must earn, on average, to satisfy both
        owners and lenders.
      </p>
      <nav
        aria-label="Article sections"
        className="mb-10 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm"
      >
        {sections.map((section) => (
          <a
            key={section.href}
            href={section.href}
            className="text-primary hover:underline"
          >
            {section.label}
          </a>
        ))}
      </nav>

      <section className="mb-12 bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="what-they-mean"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          What the two rates mean
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Most companies are funded by two groups. Owners put in equity.
          Lenders put in debt. Each group wants a return for the risk it takes.
        </p>
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div className="rounded-lg border bg-muted p-4">
            <h3 className="font-semibold mb-2">Cost of equity</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The return owners expect on their shares. They are paid last, so
              they usually ask for more than lenders. In formulas this is often
              written as k<sub>e</sub>.
            </p>
          </div>
          <div className="rounded-lg border bg-muted p-4">
            <h3 className="font-semibold mb-2">WACC</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The weighted average cost of capital: one blended rate for the
              whole pool of money. It mixes the owners’ return with the cost of
              debt, after the tax saving on interest. If there is no debt, WACC
              equals the cost of equity.
            </p>
          </div>
        </div>
        <p className="leading-relaxed text-muted-foreground">
          Both rates answer the same practical question: what return is high
          enough to justify tying up money? The difference is whose money you
          are counting. See the{" "}
          <Link href="/guide" className="text-primary hover:underline">
            WACC guide
          </Link>{" "}
          for the formulas behind each piece.
        </p>
      </section>

      <section className="mb-12 bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="the-rule"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          The rule
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Match the rate to the cash you are valuing.
        </p>
        <ul className="space-y-3 leading-relaxed">
          <li>
            Use <strong>WACC</strong> for cash the business generates before
            paying lenders — the usual starting point when you value a company
            or a project as a whole.
          </li>
          <li>
            Use the <strong>cost of equity</strong> for cash that belongs only
            to owners, such as dividends or profit left after interest.
          </li>
        </ul>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Using the wrong pair is the common mistake: a company-level cash
          forecast with the owners’ rate, or an owners-only cash forecast with
          WACC. The first makes the business look less valuable than it is. The
          second makes the equity look more valuable than it is.
        </p>
      </section>

      <section className="mb-12 bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="comparison"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          Side-by-side
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Comparison of cost of equity and WACC
            </caption>
            <thead>
              <tr className="border-b text-left">
                <th className="py-3 pr-4 font-semibold">Topic</th>
                <th className="py-3 pr-4 font-semibold">Cost of equity</th>
                <th className="py-3 font-semibold">WACC</th>
              </tr>
            </thead>
            <tbody>
              {waccVsEquityRows.map((row) => (
                <tr key={row.topic} className="border-b last:border-0 align-top">
                  <th className="py-3 pr-4 text-left font-medium">{row.topic}</th>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {row.equity}
                  </td>
                  <td className="py-3 text-muted-foreground">{row.wacc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12 bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="when-to-use"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          When to use each
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-muted p-4">
            <h3 className="font-semibold mb-2">Use cost of equity when</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>You are valuing the shares, not the whole company</li>
              <li>You are looking at dividends or profit after interest</li>
              <li>The investment is funded only with equity</li>
              <li>
                You want to know whether the return on equity covers what
                owners expect
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-muted p-4">
            <h3 className="font-semibold mb-2">Use WACC when</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>You are valuing the company as a whole</li>
              <li>You are deciding whether a project creates value</li>
              <li>The project will be funded with a mix of equity and debt</li>
              <li>
                You want to know whether the business earns more than the cost
                of all its capital
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          The{" "}
          <Link href="/" className="text-primary hover:underline">
            WACC calculator
          </Link>{" "}
          reports both rates, so you can choose the one that matches the cash
          you have in front of you.
        </p>
      </section>

      <section className="mb-12 bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="example"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          A worked example
        </h2>
        <p className="leading-relaxed mb-4">
          A company is worth 100. Owners provide 70, lenders provide 30.
          Owners expect 12%. Lenders charge 6% before tax. The tax rate is
          25%, so the after-tax cost of debt is 4.5% — interest reduces taxable
          profit, which is why WACC uses the lower figure.
        </p>
        <div className="bg-muted p-5 rounded-xl text-center font-mono border mb-4">
          <KaTeXFormula
            formula="WACC = 0.70 \times 12\% + 0.30 \times 6\% \times (1 - 0.25) = 9.75\%"
            displayMode={true}
          />
        </div>
        <p className="leading-relaxed mb-4">
          In words: 70% of the capital costs 12%, and 30% costs 4.5% after tax.
          The blended required return is 9.75%.
        </p>
        <p className="leading-relaxed">
          If the business is expected to produce 100 next year, before paying
          lenders, that cash is worth about 91 today at 9.75%. Using 12% on the
          same cash would understate the company, because part of the funding
          is cheaper debt. Using 9.75% on cash that already belongs only to
          owners would overstate the shares.
        </p>
      </section>

      <section className="mb-12 bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="mistakes"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          Common mistakes
        </h2>
        <ul className="space-y-3 leading-relaxed">
          <li>
            <strong>Using accounting weights.</strong> WACC should reflect what
            equity and debt are worth in the market today, not the mix shown
            on the balance sheet.
          </li>
          <li>
            <strong>Ignoring tax on interest.</strong> In most countries
            interest is deductible, so the relevant cost of debt in WACC is
            after tax.
          </li>
          <li>
            <strong>Keeping the owners’ rate fixed when debt rises.</strong>{" "}
            More borrowing makes the shares riskier, so the cost of equity
            should rise. The{" "}
            <Link
              href="/guide#cost-of-equity"
              className="text-primary hover:underline"
            >
              cost of equity section
            </Link>{" "}
            shows how leverage enters beta.
          </li>
          <li>
            <strong>Using a rate from another country.</strong> The risk-free
            rate, market premium, and tax should match the currency and country
            of the cash flows you are valuing.
          </li>
        </ul>
        <GuideCta />
      </section>

      <div className="space-y-10">
        <FaqList
          items={waccVsEquityFaqItems}
          heading="WACC vs cost of equity FAQ"
        />
        <RelatedGuides items={relatedGuidesExcept(waccVsEquitySeo.path)} />
      </div>
    </article>
  )
}
