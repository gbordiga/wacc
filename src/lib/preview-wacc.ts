import {
  calculateCostOfEquity,
  calculateLeveredBeta,
  calculateWACC,
} from "@/lib/financial"
import { FormValues } from "@/components/Calculator"
import { CalculationResult } from "@/types"

function ensureNumber(value: unknown, defaultValue: number = 0): number {
  if (value === undefined || value === null) return defaultValue
  if (typeof value === "number" && !isNaN(value)) return value

  const parsedValue = parseFloat(String(value).replace(",", "."))
  return isNaN(parsedValue) ? defaultValue : parsedValue
}

export function buildWaccResult(values: FormValues): CalculationResult | null {
  const equityRatio = ensureNumber(values.equityRatio)
  const debtRatio = ensureNumber(values.debtRatio)
  const riskFreeRate = ensureNumber(values.riskFreeRate)
  const beta = ensureNumber(values.beta, 1)
  const marketRiskPremium = ensureNumber(values.marketRiskPremium)
  const additionalRisk = ensureNumber(values.additionalRisk)
  const sizePremium = ensureNumber(values.sizePremium)
  const marketCap = ensureNumber(values.marketCap)
  const taxRate = ensureNumber(values.taxRate)
  const debtRiskFreeRate = ensureNumber(values.debtRiskFreeRate)
  const spreadRate = ensureNumber(values.spreadRate)
  const storedCostOfDebt = ensureNumber(values.costOfDebt)
  const costOfDebt =
    storedCostOfDebt > 1 ? storedCostOfDebt : debtRiskFreeRate + spreadRate

  try {
    const leveredBeta = calculateLeveredBeta(
      beta,
      debtRatio,
      equityRatio,
      taxRate
    )
    const costOfEquity = calculateCostOfEquity({
      riskFreeRate,
      beta: leveredBeta,
      marketRiskPremium,
      countryRiskPremium: 0,
      sizePremium,
      additionalRisk,
    })
    const wacc = calculateWACC({
      riskFreeRate,
      beta: leveredBeta,
      marketRiskPremium,
      countryRiskPremium: 0,
      sizePremium,
      additionalRisk,
      equityRatio,
      debtRatio,
      costOfDebt,
      taxRate,
    })

    return {
      costOfEquity,
      costOfDebt,
      wacc,
      inputs: {
        equityRatio,
        debtRatio,
        riskFreeRate,
        beta,
        leveredBeta,
        marketRiskPremium,
        countryRiskPremium: 0,
        additionalRisk,
        sizePremium,
        marketCap,
        costOfDebt,
        debtRiskFreeRate,
        spreadRate,
        taxRate,
        country: values.country,
        sector: values.sector,
        taxCountry: values.taxCountry,
        isAutoCalculated: true,
      },
      timestamp: new Date(0),
    }
  } catch {
    return null
  }
}
