"use client"

import type { ReactNode } from "react"
import { Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FormValues } from "../Calculator"
import { CalculationResult } from "@/types"
import { formatGroupedInteger } from "@/utils/format"
import {
  getCompanyTypeDisplayName,
  type CompanyType,
} from "@/services/company-types"

interface PrintReportProps {
  values: FormValues
  icr: number
  result: CalculationResult | null
}

export function PrintButton() {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="print:hidden"
      onClick={() => window.print()}
    >
      <Printer />
      Print
    </Button>
  )
}

export function PrintReport({ values, icr, result }: PrintReportProps) {
  const printedAt = new Date().toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
  })
  const leveredBeta = result?.inputs.leveredBeta ?? values.beta

  return (
    <div className="hidden print:block print-report">
      <div className="print-letterhead mb-6 border-b border-zinc-300 pb-4">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.16em] text-zinc-500 uppercase">
              wacc.less.style
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              {companyTitle(values.companyName)}
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              {letterheadSubtitle(values)}
            </p>
          </div>
          <div className="text-right text-xs text-zinc-500">
            {values.asOfDate && (
              <p>As of {formatAsOfDate(values.asOfDate)}</p>
            )}
            <p suppressHydrationWarning>Printed {printedAt}</p>
          </div>
        </div>
        {result && (
          <dl className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="text-xs tracking-wide text-zinc-500 uppercase">WACC</dt>
              <dd className="text-xl font-semibold tabular-nums text-blue-700">
                {pctPoints(result.wacc)}
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-zinc-500 uppercase">
                Cost of equity (k<sub>e</sub>)
              </dt>
              <dd className="text-xl font-semibold tabular-nums">
                {pctPoints(result.costOfEquity)}
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-zinc-500 uppercase">
                Cost of debt (k<sub>d</sub>)
              </dt>
              <dd className="text-xl font-semibold tabular-nums">
                {pctPoints(result.costOfDebt)}
              </dd>
            </div>
          </dl>
        )}
      </div>

      <section className="print-parameters mb-8">
        <h2 className="mb-3 text-base font-semibold">Input parameters</h2>
        <div className="grid grid-cols-2 gap-x-10 gap-y-5">
          <ParameterGroup title="Geography">
            <Row label="Country" value={values.country} />
            <Row label="Tax country" value={values.taxCountry || "—"} />
          </ParameterGroup>
          <ParameterGroup title="Industry and size">
            <Row label="Sector" value={values.sector} />
            <Row
              label="Market cap"
              value={`${formatGroupedInteger(values.marketCap)} mUSD`}
            />
          </ParameterGroup>
          <ParameterGroup title="Interest coverage">
            <Row
              label="EBIT"
              value={
                values.ebit != null
                  ? `$${formatGroupedInteger(values.ebit)}`
                  : "—"
              }
            />
            <Row
              label="Interest expense"
              value={
                values.interestExpense != null
                  ? `$${formatGroupedInteger(values.interestExpense)}`
                  : "—"
              }
            />
            <Row label="Company type" value={companyTypeLabel(values.companyType)} />
            <Row
              label="ICR"
              value={icr === Infinity ? "∞" : icr.toFixed(2)}
            />
          </ParameterGroup>
          <ParameterGroup title="Capital structure">
            <Row label="Equity" value={`${values.equityRatio}%`} />
            <Row label="Debt" value={`${values.debtRatio}%`} />
          </ParameterGroup>
          <ParameterGroup title="Cost of equity">
            <Row label="Risk-free rate" value={pctPoints(values.riskFreeRate)} />
            <Row label="Market risk premium" value={pctPoints(values.marketRiskPremium)} />
            <Row label="Unlevered beta" value={values.beta.toFixed(3)} />
            <Row label="Levered beta" value={Number(leveredBeta).toFixed(3)} />
            <Row label="Size premium" value={pctPoints(values.sizePremium)} />
            <Row label="Additional risk" value={pctPoints(values.additionalRisk)} />
          </ParameterGroup>
          <ParameterGroup title="Cost of debt">
            <Row label="Debt risk-free rate" value={pctPoints(values.debtRiskFreeRate)} />
            <Row label="Debt spread" value={pctPoints(values.spreadRate)} />
            <Row label="Marginal tax rate" value={pctPoints(values.taxRate)} />
            <Row
              label="Pre-tax cost of debt"
              value={costOfDebtLabel(result?.costOfDebt ?? values.costOfDebt)}
            />
          </ParameterGroup>
        </div>
      </section>
    </div>
  )
}

interface ParameterGroupProps {
  title: string
  children: ReactNode
}

function companyTypeLabel(companyType?: string) {
  if (!companyType) return "—"
  return getCompanyTypeDisplayName(companyType as CompanyType)
}

function companyTitle(name?: string) {
  const trimmed = name?.trim()
  return trimmed || "WACC calculation"
}

function letterheadSubtitle(values: FormValues) {
  const parts = [
    values.companyName?.trim() ? "WACC calculation" : "",
    values.country,
    values.sector,
    `Equity ${values.equityRatio}% / Debt ${values.debtRatio}%`,
  ].filter(Boolean)
  return parts.join(" · ")
}

function formatAsOfDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number)
  if (!year || !month || !day) return iso
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    dateStyle: "long",
  })
}

function ParameterGroup({ title, children }: ParameterGroupProps) {
  return (
    <div>
      <h3 className="mb-2 border-b border-zinc-200 pb-1 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
        {title}
      </h3>
      <dl className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-sm">
        {children}
      </dl>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-zinc-500">{label}</dt>
      <dd className="text-right font-medium tabular-nums">{value}</dd>
    </>
  )
}

function pctPoints(value: number) {
  return `${value.toFixed(2)}%`
}

function costOfDebtLabel(value: number) {
  if (value > 0 && value < 1) return `${(value * 100).toFixed(2)}%`
  return pctPoints(value)
}
