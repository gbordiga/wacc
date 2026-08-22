"use client"

import type { ReactNode } from "react"
import { CalculationResult } from "@/types"
import { formatPercentage } from "@/utils/format"
import { KaTeXFormula } from "@/components/KaTeXFormula"

interface BarSegment {
  label: string
  value: number
  className: string
}

function ContributionBar({
  segments,
  total,
}: {
  segments: BarSegment[]
  total: number
}) {
  const safeTotal = total === 0 ? 1 : total

  return (
    <div className="space-y-1.5 print:hidden">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
        {segments.map((segment) => {
          const width = Math.max(0, (segment.value / safeTotal) * 100)
          if (width < 0.5) return null
          return (
            <div
              key={segment.label}
              className={segment.className}
              style={{ width: `${width}%` }}
            />
          )
        })}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-1.5">
            <span
              className={`size-2 shrink-0 rounded-full ${segment.className}`}
            />
            <span>
              {segment.label} {formatPercentage(segment.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface WACCResultsProps {
  result: CalculationResult
}

function safeToFixed(
  value: number | string | undefined | null,
  decimals: number = 2
): string {
  if (value === undefined || value === null) return "0.00"

  if (typeof value === "number" && !isNaN(value))
    return value.toFixed(decimals)

  const parsedValue = parseFloat(String(value).replace(",", "."))
  return isNaN(parsedValue) ? "0.00" : parsedValue.toFixed(decimals)
}

export default function WACCResults({ result }: WACCResultsProps) {
  const { wacc, costOfEquity, costOfDebt, inputs } = result

  const safeInputs = {
    equityRatio: parseFloat(safeToFixed(inputs.equityRatio)),
    debtRatio: parseFloat(safeToFixed(inputs.debtRatio)),
    riskFreeRate: parseFloat(safeToFixed(inputs.riskFreeRate)),
    beta: parseFloat(safeToFixed(inputs.beta)),
    leveredBeta: parseFloat(safeToFixed(inputs.leveredBeta || inputs.beta)),
    marketRiskPremium: parseFloat(safeToFixed(inputs.marketRiskPremium)),
    sizePremium: parseFloat(safeToFixed(inputs.sizePremium, 2)),
    additionalRisk: parseFloat(safeToFixed(inputs.additionalRisk, 2)),
    costOfDebt: parseFloat(safeToFixed(inputs.costOfDebt)),
    debtRiskFreeRate: parseFloat(safeToFixed(inputs.debtRiskFreeRate)),
    spreadRate: parseFloat(safeToFixed(inputs.spreadRate)),
    taxRate: parseFloat(safeToFixed(inputs.taxRate)),
  }

  const safeWacc = parseFloat(safeToFixed(wacc))
  const safeCostOfEquity = parseFloat(safeToFixed(costOfEquity))
  const safeCostOfDebt = parseFloat(safeToFixed(costOfDebt))
  const equityRatioDecimal = safeInputs.equityRatio / 100
  const debtRatioDecimal = safeInputs.debtRatio / 100
  const equityContribution = equityRatioDecimal * safeCostOfEquity
  const debtContribution =
    debtRatioDecimal * safeCostOfDebt * (1 - safeInputs.taxRate / 100)
  const afterTaxDebtRate =
    safeCostOfDebt * (1 - safeInputs.taxRate / 100)

  return (
    <div id="wacc-results" className="scroll-mb-24 space-y-3">
      <h2 className="text-xl font-semibold print:hidden">Results</h2>
      <h2 className="mb-1 hidden text-base font-semibold print:block">
        Calculation
      </h2>

      <div className="print:hidden grid grid-cols-3 divide-x overflow-hidden rounded-lg border bg-card">
        <Metric
          label="WACC"
          value={formatPercentage(safeWacc / 100, 2)}
          emphasize
        />
        <Metric
          label={
            <>
              k<sub>e</sub>
            </>
          }
          value={formatPercentage(safeCostOfEquity / 100, 2)}
        />
        <Metric
          label={
            <>
              k<sub>d</sub>
            </>
          }
          value={formatPercentage(safeCostOfDebt / 100, 2)}
          note={`after tax ${formatPercentage(afterTaxDebtRate / 100, 2)}`}
        />
      </div>

      <div className="space-y-3 rounded-lg border bg-card p-4 print:space-y-2.5 print:border-0 print:bg-transparent print:p-0">
        <FormulaBlock
          title="WACC"
          formula="WACC = (E/V)\,k_e + (D/V)\,k_d(1-T)"
        >
          <ContributionBar
            total={safeWacc}
            segments={[
              {
                label: `Equity ${safeInputs.equityRatio.toFixed(0)}%`,
                value: equityContribution,
                className: "bg-chart-1",
              },
              {
                label: `Debt after tax ${safeInputs.debtRatio.toFixed(0)}%`,
                value: debtContribution,
                className: "bg-chart-2",
              },
            ]}
          />
          <p className="font-mono text-[13px] leading-snug">
            {safeToFixed(safeInputs.equityRatio)}% ×{" "}
            {safeToFixed(safeCostOfEquity)}% +{" "}
            {safeToFixed(safeInputs.debtRatio)}% ×{" "}
            {safeToFixed(safeCostOfDebt)}% × (1 −{" "}
            {safeToFixed(safeInputs.taxRate)}%) ={" "}
            {safeToFixed(equityContribution)}% +{" "}
            {safeToFixed(debtContribution)}% ={" "}
            <strong>{safeToFixed(safeWacc)}%</strong>
          </p>
        </FormulaBlock>

        <FormulaBlock
          title={
            <>
              Cost of equity (k<sub>e</sub>)
            </>
          }
          formula="k_e = r_f + \beta_L \times MRP + SP + AR"
        >
          <ContributionBar
            total={safeCostOfEquity}
            segments={[
              {
                label: "Risk-free",
                value: safeInputs.riskFreeRate,
                className: "bg-chart-3",
              },
              {
                label: "βL × MRP",
                value: safeInputs.leveredBeta * safeInputs.marketRiskPremium,
                className: "bg-chart-4",
              },
              {
                label: "Size",
                value: safeInputs.sizePremium,
                className: "bg-chart-5",
              },
              {
                label: "Additional",
                value: safeInputs.additionalRisk,
                className: "bg-chart-2",
              },
            ]}
          />
          <p className="font-mono text-[13px] leading-snug">
            β<sub>L</sub> = {safeToFixed(safeInputs.beta)} × [1 + (1 −{" "}
            {safeToFixed(safeInputs.taxRate)}%) × (
            {safeInputs.debtRatio.toFixed(0)} ÷{" "}
            {safeInputs.equityRatio.toFixed(0)})] ={" "}
            <strong>{safeToFixed(safeInputs.leveredBeta)}</strong>
            <span className="text-muted-foreground">
              {" "}
              · k<sub>e</sub> = {safeToFixed(safeInputs.riskFreeRate)}% +{" "}
              {safeToFixed(safeInputs.leveredBeta)} ×{" "}
              {safeToFixed(safeInputs.marketRiskPremium)}% +{" "}
              {safeToFixed(safeInputs.sizePremium)}% +{" "}
              {safeToFixed(safeInputs.additionalRisk)}% ={" "}
            </span>
            <strong>{safeToFixed(safeCostOfEquity)}%</strong>
          </p>
        </FormulaBlock>

        <FormulaBlock
          title={
            <>
              Cost of debt (k<sub>d</sub>)
            </>
          }
          formula="k_d = r_f + \mathrm{spread}"
        >
          <ContributionBar
            total={safeCostOfDebt}
            segments={[
              {
                label: "Risk-free",
                value: safeInputs.debtRiskFreeRate,
                className: "bg-chart-1",
              },
              {
                label: "Spread",
                value: safeInputs.spreadRate,
                className: "bg-chart-2",
              },
            ]}
          />
          <p className="font-mono text-[13px] leading-snug">
            {safeToFixed(safeInputs.debtRiskFreeRate)}% +{" "}
            {safeToFixed(safeInputs.spreadRate)}% ={" "}
            <strong>{safeToFixed(safeInputs.costOfDebt)}%</strong>
          </p>
        </FormulaBlock>
      </div>
    </div>
  )
}

function Metric({
  label,
  value,
  note,
  emphasize,
}: {
  label: ReactNode
  value: string
  note?: string
  emphasize?: boolean
}) {
  return (
    <div className={`px-4 py-3 ${emphasize ? "bg-primary/5" : ""}`}>
      <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p
        className={`text-xl font-semibold tabular-nums ${emphasize ? "text-primary" : ""}`}
      >
        {value}
      </p>
      {note && <p className="text-[11px] text-muted-foreground">{note}</p>}
    </div>
  )
}

function FormulaBlock({
  title,
  formula,
  children,
}: {
  title: ReactNode
  formula: string
  children: ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground">
          <KaTeXFormula formula={formula} />
        </span>
      </div>
      {children}
    </div>
  )
}
