import type { Metadata } from "next"
import Link from "next/link"
import { GuideBreadcrumb } from "@/components/guide/GuideBreadcrumb"
import { GuideCta } from "@/components/guide/GuideCta"
import { RelatedGuides } from "@/components/guide/RelatedGuides"
import { JsonLd } from "@/components/JsonLd"
import { KaTeXFormula } from "@/components/KaTeXFormula"
import { relatedGuidesExcept } from "@/data/articles"
import { guideSeo } from "@/lib/site"
import { guideGraphJsonLd } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: {
    absolute: guideSeo.title,
  },
  description: guideSeo.description,
  alternates: {
    canonical: "/guide",
  },
  openGraph: {
    title: guideSeo.title,
    description: guideSeo.description,
    url: "/guide",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: guideSeo.title,
    description: guideSeo.description,
  },
}

const guideSections = [
  { href: "#definition", label: "Definition" },
  { href: "#formula", label: "Formula" },
  { href: "#cost-of-equity", label: "Cost of equity" },
  { href: "#cost-of-debt", label: "Cost of debt" },
  { href: "#data-sources", label: "Data sources" },
  { href: "#applications", label: "Applications" },
  { href: "#using-the-calculator", label: "Using the calculator" },
]

export default function WACCExplained() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-10 text-foreground">
      <JsonLd data={guideGraphJsonLd()} />
      <GuideBreadcrumb />
      <h1 className="text-4xl font-bold mb-4 text-center">
        What is WACC?
      </h1>
      <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
        Weighted average cost of capital is the blended return equity and debt
        investors require. Use it as the discount rate in a DCF or as the
        hurdle rate for capital budgeting.
      </p>
      <nav
        aria-label="Guide sections"
        className="mb-10 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm"
      >
        {guideSections.map((section) => (
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
          id="definition"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          Definition & Significance
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          <strong>WACC</strong> (Weighted Average Cost of Capital) represents
          the minimum required rate of return for a company to satisfy all its
          investors—both equity holders and debt providers. It serves as the
          threshold rate that determines whether a business investment generates
          or destroys value.
        </p>
        <p className="text-lg leading-relaxed">
          In practical terms: investments yielding returns{" "}
          <strong>above</strong> the WACC{" "}
          <span className="text-green-600">create shareholder value</span>,
          while those yielding <strong>below</strong> the WACC{" "}
          <span className="text-red-600">destroy value</span>. This makes WACC
          an essential metric for capital budgeting, valuation, and strategic
          decision-making.
        </p>
      </section>

      <section className="mb-12 bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="formula"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          The WACC Formula
        </h2>
        <div className="bg-muted p-5 rounded-xl text-lg text-center font-mono text-foreground border border mb-4">
          <KaTeXFormula
            formula="WACC = \left(\frac{E}{E + D}\right) \times k_e + \left(\frac{D}{E + D}\right) \times k_d \times (1 - T)"
            displayMode={true}
          />
        </div>
        <p className="text-lg mb-4">Where:</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <li className="flex items-start gap-2">
            <span className="font-semibold text-primary min-w-[30px]">E</span>
            <span>Market value of equity</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-primary min-w-[30px]">D</span>
            <span>Market value of debt</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-primary min-w-[30px]">
              k<sub>e</sub>
            </span>
            <span>Cost of equity capital</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-primary min-w-[30px]">
              k<sub>d</sub>
            </span>
            <span>Cost of debt capital</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold text-primary min-w-[30px]">T</span>
            <span>Corporate tax rate</span>
          </li>
        </ul>
        <p className="text-sm text-muted-foreground italic">
          Note: The formula weights each component by its relative proportion in
          the capital structure.
        </p>
      </section>

      <section className="mb-12 bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="cost-of-equity"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          Cost of Equity (k<sub>e</sub>)
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          The cost of equity represents the return expected by shareholders for
          their investment. It is not the same as WACC — see{" "}
          <Link
            href="/guide/wacc-vs-cost-of-equity"
            className="text-primary hover:underline"
          >
            WACC vs cost of equity
          </Link>
          . It&apos;s typically calculated using the Capital Asset Pricing
          Model (CAPM), with additional risk premiums:
        </p>
        <div className="bg-muted p-5 rounded-xl text-lg text-center font-mono text-foreground border border mb-4">
          <KaTeXFormula
            formula="k_e = r_f + \beta_L \times MRP + SP + AR"
            displayMode={true}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-primary min-w-[30px]">
                r<sub>f</sub>
              </span>
              <span>Risk-free rate (typically government bond yield)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-primary min-w-[30px]">
                β<sub>L</sub>
              </span>
              <span>Levered beta (measure of systematic risk)</span>
            </li>
          </ul>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-primary min-w-[30px]">
                MRP
              </span>
              <span>Market Risk Premium</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-primary min-w-[30px]">
                SP
              </span>
              <span>Size Premium (Kroll)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-primary min-w-[30px]">
                AR
              </span>
              <span>Additional Risk Premium (company-specific)</span>
            </li>
          </ul>
        </div>
        <h3 className="text-xl font-medium mt-6 mb-3 text-primary">
          Unlevered vs Levered Beta
        </h3>
        <p className="text-lg leading-relaxed mb-4">
          Levered beta (β<sub>L</sub>) reflects both business risk and financial
          risk from leverage. It&apos;s derived from the unlevered beta (β
          <sub>U</sub>), which measures only business risk:
        </p>
        <div className="bg-muted p-5 rounded-xl text-lg text-center font-mono text-foreground border border">
          <KaTeXFormula
            formula="\beta_L = \beta_U \times [1 + (1 - T) \times (D / E)]"
            displayMode={true}
          />
        </div>
      </section>

      <section className="mb-12 bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="cost-of-debt"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          Cost of Debt (k<sub>d</sub>)
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          The cost of debt represents the effective interest rate a company pays
          on its debt financing, typically calculated as:
        </p>
        <div className="bg-muted p-5 rounded-xl text-lg text-center font-mono text-foreground border border mb-4">
          <KaTeXFormula
            formula="k_d = r_f + \text{Credit Spread}"
            displayMode={true}
          />
          <KaTeXFormula
            formula="\text{After-Tax } k_d = k_d \times (1 - T)"
            displayMode={true}
          />
        </div>
        <p className="text-lg leading-relaxed">
          The credit spread is determined by the company&apos;s risk profile,
          primarily assessed through metrics like the interest coverage ratio
          (ICR) and resulting credit rating. The after-tax cost is used in the
          WACC formula because interest payments are tax-deductible in most
          jurisdictions.
        </p>
      </section>

      <section className="mb-12 bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="data-sources"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          Data Sources
        </h2>
        <p className="text-base mb-4">
          Our calculator uses industry-standard financial data from
          authoritative sources. For the Damodaran pieces specifically, see the{" "}
          <Link
            href="/guide/damodaran-wacc"
            className="text-primary hover:underline"
          >
            Damodaran WACC calculator
          </Link>{" "}
          page.
        </p>
        <ul className="space-y-3 text-sm">
          <li className="p-3 border rounded-md">
            <h4 className="font-medium mb-1">
              Risk-Free Rate & Market Risk Premium
            </h4>
            <p className="text-muted-foreground">
              Fernandez, 2025,{" "}
              <a
                href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5260463"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Survey: Market Risk Premium and Risk-Free Rate used for 54
                countries
              </a>
              . Countries not reported in 2025 use the 2024 survey averages.
            </p>
          </li>
          <li className="p-3 border rounded-md">
            <h4 className="font-medium mb-1">Beta by Industry</h4>
            <p className="text-muted-foreground">
              Damodaran, January 2026,{" "}
              <a
                href="https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/BetasGlobal.html"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Betas by Sector, Global
              </a>
            </p>
          </li>
          <li className="p-3 border rounded-md">
            <h4 className="font-medium mb-1">Corporate Marginal Tax Rates</h4>
            <p className="text-muted-foreground">
              Damodaran, January 2026,{" "}
              <a
                href="https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/countrytaxrates.html"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Corporate Marginal Tax Rates - By country
              </a>
            </p>
          </li>
          <li className="p-3 border rounded-md">
            <h4 className="font-medium mb-1">Size Risk Premium</h4>
            <p className="text-muted-foreground">
              Kroll size premium study, 2025
            </p>
          </li>
          <li className="p-3 border rounded-md">
            <h4 className="font-medium mb-1">Debt Default Spread</h4>
            <p className="text-muted-foreground">
              Damodaran, January 2026,{" "}
              <a
                href="https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ratings.html"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ratings, Interest Coverage Ratios and Default Spread
              </a>
            </p>
          </li>
        </ul>
      </section>

      <section className="mb-12 bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="applications"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          Practical Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg bg-muted">
            <h3 className="font-semibold mb-2 text-lg">Capital Budgeting</h3>
            <p>
              Used as the discount rate in NPV calculations to evaluate
              potential investments and projects.
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-muted">
            <h3 className="font-semibold mb-2 text-lg">Business Valuation</h3>
            <p>
              Serves as the discount rate in DCF models to determine the present
              value of future cash flows.
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-muted">
            <h3 className="font-semibold mb-2 text-lg">Capital Structure</h3>
            <p>
              Helps identify the optimal debt-to-equity ratio that minimizes the
              company&apos;s overall cost of capital.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-card p-6 rounded-lg shadow-sm border">
        <h2
          id="using-the-calculator"
          className="text-2xl font-semibold mb-4 text-primary scroll-mt-24"
        >
          Using Our Calculator
        </h2>
        <p className="mb-4">
          Follow these steps to calculate your company&apos;s WACC:
        </p>
        <ol className="space-y-3 mb-6">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              1
            </span>
            <div>
              <p className="font-medium">Select country and industry sector</p>
              <p className="text-sm text-muted-foreground">
                This provides location-specific tax rates and sector-specific
                unlevered betas
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              2
            </span>
            <div>
              <p className="font-medium">
                Enter company size (market capitalization)
              </p>
              <p className="text-sm text-muted-foreground">
                Used to calculate the appropriate size premium
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              3
            </span>
            <div>
              <p className="font-medium">Add financial metrics</p>
              <p className="text-sm text-muted-foreground">
                EBIT and interest expenses help determine the interest coverage
                ratio
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              4
            </span>
            <div>
              <p className="font-medium">Provide capital structure details</p>
              <p className="text-sm text-muted-foreground">
                The ratio of equity to debt in your company&apos;s financing
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              5
            </span>
            <div>
              <p className="font-medium">Review suggested parameters</p>
              <p className="text-sm text-muted-foreground">
                Adjust any values if needed based on your specific situation
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              6
            </span>
            <div>
              <p className="font-medium">Calculate and analyze the results</p>
              <p className="text-sm text-muted-foreground">
                View a detailed breakdown of your WACC components
              </p>
            </div>
          </li>
        </ol>
        <GuideCta label="Try the Calculator" />
      </section>

      <div className="mt-4">
        <RelatedGuides items={relatedGuidesExcept("/guide")} />
      </div>
    </article>
  )
}
