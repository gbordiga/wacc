import type { Metadata } from "next"
import Link from "next/link"
import { FaqList } from "@/components/FaqList"
import { GuideBreadcrumb } from "@/components/guide/GuideBreadcrumb"
import { GuideCta } from "@/components/guide/GuideCta"
import { RelatedGuides } from "@/components/guide/RelatedGuides"
import { JsonLd } from "@/components/JsonLd"
import { relatedGuidesExcept } from "@/data/articles"
import { damodaranFaqItems } from "@/data/faq"
import { damodaranSeo } from "@/lib/site"
import { articleGraphJsonLd } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: {
    absolute: damodaranSeo.title,
  },
  description: damodaranSeo.description,
  alternates: {
    canonical: damodaranSeo.path,
  },
  openGraph: {
    title: damodaranSeo.title,
    description: damodaranSeo.description,
    url: damodaranSeo.path,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: damodaranSeo.title,
    description: damodaranSeo.description,
  },
}

const sections = [
  { href: "#what-it-uses", label: "What it uses" },
  { href: "#betas", label: "Sector betas" },
  { href: "#tax-spreads", label: "Tax and spreads" },
  { href: "#other-sources", label: "Fernandez and Kroll" },
  { href: "#how-to", label: "How to run it" },
  { href: "#limits", label: "Limits" },
  { href: "#faq-heading", label: "FAQ" },
]

const damodaranSources = [
  {
    title: "Global sector betas",
    href: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/BetasGlobal.html",
    body: "Unlevered betas by industry. The calculator levers them with your tax rate and D/E.",
  },
  {
    title: "Country tax rates",
    href: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/countrytaxrates.html",
    body: "Corporate marginal tax rates used in after-tax cost of debt and Hamada relevering.",
  },
  {
    title: "Ratings and default spreads",
    href: "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ratings.html",
    body: "Interest coverage maps to a synthetic rating and a debt spread over the risk-free rate.",
  },
]

export default function DamodaranWaccPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-10 text-foreground">
      <JsonLd
        data={articleGraphJsonLd({
          path: damodaranSeo.path,
          title: damodaranSeo.title,
          description: damodaranSeo.description,
          breadcrumbs: [
            { name: "WACC Calculator", path: "/" },
            { name: "WACC Guide", path: "/guide" },
            { name: "Damodaran WACC", path: damodaranSeo.path },
          ],
          faqItems: damodaranFaqItems,
        })}
      />
      <GuideBreadcrumb
        items={[
          { label: "WACC Calculator", href: "/" },
          { label: "WACC Guide", href: "/guide" },
          { label: "Damodaran WACC" },
        ]}
      />
      <h1 className="text-4xl font-bold mb-4 text-center">
        Damodaran WACC calculator
      </h1>
      <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
        An independent WACC tool that starts from Damodaran’s published sector
        betas, country tax rates, and default spreads. It is not NYU Stern or
        Damodaran’s own calculator.
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
          id="what-it-uses"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          What this calculator uses
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          A Damodaran-style{" "}
          <Link href="/guide" className="text-primary hover:underline">
            WACC
          </Link>{" "}
          still needs a risk-free rate, a market risk premium, a beta, a tax
          rate, and a cost of debt. This site fills the last three from
          Damodaran’s January 2026 tables, then lets you override any input.
        </p>
        <p className="text-lg leading-relaxed">
          Cost of equity is CAPM plus size and company-specific risk. Cost of
          debt is the risk-free rate plus a coverage-based spread.{" "}
          <Link href="/" className="text-primary hover:underline">
            Open the calculator
          </Link>{" "}
          to see both next to WACC.
        </p>
      </section>

      <section className="mb-12 bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="betas"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          Sector betas
        </h2>
        <p className="leading-relaxed mb-4">
          Pick an industry and the calculator loads the global unlevered beta
          for that sector. It then relevers the beta with your tax rate and
          market debt-to-equity ratio, so the cost of equity reflects both
          business risk and financial leverage.
        </p>
        <p className="text-sm text-muted-foreground">
          Sector beta is a peer starting point, not a firm-specific estimate.
          If you have a better bottom-up beta, switch the calculator to “set
          levered” or type your own unlevered beta.
        </p>
      </section>

      <section className="mb-12 bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="tax-spreads"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          Tax rates and default spreads
        </h2>
        <p className="leading-relaxed mb-4">
          The tax country sets the marginal corporate tax used in after-tax
          cost of debt and in the Hamada relevering formula. EBIT and interest
          expense produce an interest coverage ratio. That ratio maps to a
          synthetic rating and a Damodaran default spread.
        </p>
        <ul className="space-y-3">
          {damodaranSources.map((source) => (
            <li key={source.title} className="p-3 border rounded-md">
              <h3 className="font-medium mb-1">
                <a
                  href={source.href}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {source.title}
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{source.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12 bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="other-sources"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          What is not Damodaran
        </h2>
        <p className="leading-relaxed mb-4">
          The risk-free rate and market risk premium come from Fernandez
          country surveys (2025, with 2024 averages where a country is
          missing). The size premium is from the Kroll 2025 study. Those
          pieces sit on top of the Damodaran beta, tax, and spread inputs.
        </p>
        <p className="text-sm text-muted-foreground">
          Full citations are on the{" "}
          <Link href="/guide#data-sources" className="text-primary hover:underline">
            data sources
          </Link>{" "}
          section of the WACC guide.
        </p>
      </section>

      <section className="mb-12 bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="how-to"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          How to run a Damodaran-style WACC
        </h2>
        <ol className="space-y-3">
          <li>
            <p className="font-medium">Choose country and sector</p>
            <p className="text-sm text-muted-foreground">
              Loads Fernandez rf/MRP, Damodaran tax, and the sector unlevered
              beta.
            </p>
          </li>
          <li>
            <p className="font-medium">Set size and coverage</p>
            <p className="text-sm text-muted-foreground">
              Market cap selects the Kroll size premium. EBIT and interest
              select the default spread.
            </p>
          </li>
          <li>
            <p className="font-medium">Set the capital structure</p>
            <p className="text-sm text-muted-foreground">
              Equity and debt weights relever beta and weight ke versus after-tax
              kd.
            </p>
          </li>
          <li>
            <p className="font-medium">Override what you know better</p>
            <p className="text-sm text-muted-foreground">
              Company beta, a quoted credit spread, or a local tax rate should
              replace the table defaults when you have them.
            </p>
          </li>
        </ol>
        <GuideCta label="Calculate WACC with Damodaran data" />
      </section>

      <section className="mb-12 bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="limits"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          Limits
        </h2>
        <ul className="space-y-3 text-sm leading-relaxed">
          <li>
            Industry averages hide company quality, growth, and operating
            leverage. Treat the result as a first pass.
          </li>
          <li>
            Synthetic ratings from coverage are not a substitute for a traded
            bond yield or a bank quote.
          </li>
          <li>
            Damodaran tables are updated periodically. This calculator uses the
            January 2026 files linked above.
          </li>
          <li>
            If you need the difference between{" "}
            <Link
              href="/guide/wacc-vs-cost-of-equity"
              className="text-primary hover:underline"
            >
              WACC and cost of equity
            </Link>
            , use the matching rate for the cash flow — not a blended rate on
            equity cash flows.
          </li>
        </ul>
      </section>

      <div className="space-y-10">
        <FaqList items={damodaranFaqItems} heading="Damodaran WACC FAQ" />
        <RelatedGuides items={relatedGuidesExcept(damodaranSeo.path)} />
      </div>
    </article>
  )
}