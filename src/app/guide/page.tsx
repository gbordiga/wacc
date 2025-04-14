"use client";

import React from "react";
import "katex/dist/katex.min.css";
import katex from "katex";

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

      <section className="bg-white p-6 rounded-lg shadow-sm border">
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
    </div>
  );
}
