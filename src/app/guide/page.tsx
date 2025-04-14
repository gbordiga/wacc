"use client";

import React from "react";
import "katex/dist/katex.min.css";
import katex from "katex";
import Link from "next/link";

interface KaTeXFormulaProps {
  formula: string;
  displayMode?: boolean;
}

// Custom KaTeX component since react-katex has compatibility issues with React 19
function KaTeXFormula({ formula, displayMode = false }: KaTeXFormulaProps) {
  const containerRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (containerRef.current && typeof window !== "undefined") {
      katex.render(formula, containerRef.current, {
        displayMode,
        throwOnError: false,
      });
    }
  }, [formula, displayMode]);

  return <span ref={containerRef} />;
}

export default function WACCExplained() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Understanding WACC
      </h1>

      <section className="mb-12 bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
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

      <section className="mb-12 bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          The WACC Formula
        </h2>
        <div className="bg-gray-50 p-5 rounded-xl text-lg text-center font-mono text-gray-800 border border-gray-200 mb-4">
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
        <p className="text-sm text-gray-600 italic">
          Note: The formula weights each component by its relative proportion in
          the capital structure.
        </p>
      </section>

      <section className="mb-12 bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Cost of Equity (k<sub>e</sub>)
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          The cost of equity represents the return expected by shareholders for
          their investment. It&apos;s typically calculated using the Capital
          Asset Pricing Model (CAPM), with additional risk premiums:
        </p>
        <div className="bg-gray-50 p-5 rounded-xl text-lg text-center font-mono text-gray-800 border border-gray-200 mb-4">
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
              <span>Size Premium (Duff &amp; Phelps methodology)</span>
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
        <div className="bg-gray-50 p-5 rounded-xl text-lg text-center font-mono text-gray-800 border border-gray-200">
          <KaTeXFormula
            formula="\beta_L = \beta_U \times [1 + (1 - T) \times (D / E)]"
            displayMode={true}
          />
        </div>
      </section>

      <section className="mb-12 bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Cost of Debt (k<sub>d</sub>)
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          The cost of debt represents the effective interest rate a company pays
          on its debt financing, typically calculated as:
        </p>
        <div className="bg-gray-50 p-5 rounded-xl text-lg text-center font-mono text-gray-800 border border-gray-200 mb-4">
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

      <section className="mb-12 bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Data Sources
        </h2>
        <p className="text-base mb-4">
          Our calculator uses industry-standard financial data from
          authoritative sources:
        </p>
        <ul className="space-y-3 text-sm">
          <li className="p-3 border rounded-md">
            <h4 className="font-medium mb-1">
              Risk-Free Rate & Market Risk Premium
            </h4>
            <p className="text-gray-600">
              Fernandez,{" "}
              <a
                href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4754347"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Survey: Market Risk Premium and Risk-Free Rate
              </a>
            </p>
          </li>
          <li className="p-3 border rounded-md">
            <h4 className="font-medium mb-1">Beta by Industry</h4>
            <p className="text-gray-600">
              Damodaran,{" "}
              <a
                href="https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datacurrent.html#discrate"
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
            <p className="text-gray-600">
              Damodaran,{" "}
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
            <p className="text-gray-600">
              Duff & Phelps research and methodology
            </p>
          </li>
          <li className="p-3 border rounded-md">
            <h4 className="font-medium mb-1">Debt Default Spread</h4>
            <p className="text-gray-600">
              Damodaran,{" "}
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

      <section className="mb-12 bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Practical Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2 text-lg">Capital Budgeting</h3>
            <p>
              Used as the discount rate in NPV calculations to evaluate
              potential investments and projects.
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2 text-lg">Business Valuation</h3>
            <p>
              Serves as the discount rate in DCF models to determine the present
              value of future cash flows.
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2 text-lg">Capital Structure</h3>
            <p>
              Helps identify the optimal debt-to-equity ratio that minimizes the
              company&apos;s overall cost of capital.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
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
              <p className="text-sm text-gray-600">
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
              <p className="text-sm text-gray-600">
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
              <p className="text-sm text-gray-600">
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
              <p className="text-sm text-gray-600">
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
              <p className="text-sm text-gray-600">
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
              <p className="text-sm text-gray-600">
                View a detailed breakdown of your WACC components
              </p>
            </div>
          </li>
        </ol>
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-6 bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Try the Calculator
          </Link>
        </div>
      </section>
    </div>
  );
}
