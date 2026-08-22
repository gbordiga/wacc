/**
 * Financial calculations library for WACC and Cost of Equity
 */

export interface CostOfEquityParams {
  riskFreeRate: number; // rf - Risk-free rate (%)
  beta: number; // β - Beta coefficient (unlevered)
  marketRiskPremium: number; // MRP - Market risk premium (%)
  countryRiskPremium: number; // α - Country risk premium (%)
  additionalRisk: number; // ER - Additional risk (small size, etc.) (%)
  sizePremium: number; // SP - Size premium (%)
}

export interface WACCParams extends CostOfEquityParams {
  debtRatio: number; // D/(D+E) - Debt ratio (%)
  equityRatio: number; // E/(D+E) - Equity ratio (%)
  costOfDebt: number; // kd - Cost of debt (%)
  debtRiskFreeRate?: number; // rf_debt - Risk-free rate for debt (%)
  spreadRate?: number; // sp - Debt spread (%)
  taxRate: number; // T - Corporate tax rate (%)
}

/** D/E above this makes Hamada unstable (βD = 0 is a bad assumption). */
export const HAMADA_UNSTABLE_DE_RATIO = 5

export function debtToEquityRatio(
  debtRatio: number,
  equityRatio: number
): number {
  const debt = debtRatio / 100
  const equity = equityRatio / 100
  if (equity <= 0) return debt > 0 ? Infinity : 0
  return debt / equity
}

export function getHamadaWarning({
  equityRatio,
  debtRatio,
  icr,
}: {
  equityRatio: number
  debtRatio: number
  icr?: number
}): string | null {
  if (equityRatio <= 0 && debtRatio > 0)
    return "At 0% equity Hamada is undefined (D/E is infinite). WACC equals after-tax cost of debt; ke is not in the average. ICR and the debt spread already price default risk on kd."

  const debtToEquity = debtToEquityRatio(debtRatio, equityRatio)
  const isHighLeverage = debtToEquity > HAMADA_UNSTABLE_DE_RATIO
  const isDistressedCoverage =
    icr !== undefined && Number.isFinite(icr) && icr < 2

  if (!isHighLeverage && !isDistressedCoverage) return null

  if (isHighLeverage && isDistressedCoverage)
    return "Hamada assumes debt is risk-free (βD = 0). At this D/E, βL and ke jump sharply between nearby equity weights. ICR is already weak, so the spread on kd reflects default risk that Hamada does not put into beta. Treat ke as illustrative; a going-concern WACC should use a target capital structure."

  if (isHighLeverage)
    return "Hamada assumes debt is risk-free (βD = 0). At this D/E, βL and ke change a lot for a 1% move in equity. ICR and the interest spread already adjust kd; they do not cap levered beta. For a going-concern WACC, relever at a target D/E rather than this extreme mix."

  return "ICR is low, so the debt spread is already wide. Hamada still treats debt as risk-free when levering beta, so ke can look too high relative to kd."
}

/**
 * Calculate Levered Beta from Unlevered Beta
 * Formula: βL = βU × [1 + (1 – T) × (D ÷ E)]
 */
export function calculateLeveredBeta(
  unleveredBeta: number,
  debtRatio: number,
  equityRatio: number,
  taxRate: number
): number {
  if (equityRatio <= 0) return parseFloat(unleveredBeta.toFixed(2))

  const taxRateDecimal = taxRate / 100
  const debtToEquity = debtToEquityRatio(debtRatio, equityRatio)
  const leveredBeta =
    unleveredBeta * (1 + (1 - taxRateDecimal) * debtToEquity)

  return parseFloat(leveredBeta.toFixed(2))
}

/**
 * Invert Hamada: βU = βL ÷ [1 + (1 – T) × (D ÷ E)]
 */
export function calculateUnleveredBeta(
  leveredBeta: number,
  debtRatio: number,
  equityRatio: number,
  taxRate: number
): number {
  if (debtRatio === 0 || equityRatio <= 0)
    return parseFloat(leveredBeta.toFixed(2))

  const taxRateDecimal = taxRate / 100
  const debtToEquity = debtToEquityRatio(debtRatio, equityRatio)
  const unleveredBeta =
    leveredBeta / (1 + (1 - taxRateDecimal) * debtToEquity)

  return parseFloat(unleveredBeta.toFixed(2))
}

/**
 * Calculate Cost of Equity (ke) using CAPM + country risk + size premium
 * Formula: ke = rf + β × MRP + α + SP + ER
 */
export function calculateCostOfEquity(params: CostOfEquityParams): number {
  const {
    riskFreeRate,
    beta,
    marketRiskPremium,
    countryRiskPremium,
    sizePremium,
    additionalRisk,
  } = params;

  // Formula: ke = rf + β × MRP + α + SP + ER
  const ke =
    riskFreeRate +
    beta * marketRiskPremium +
    countryRiskPremium +
    sizePremium +
    additionalRisk;

  return parseFloat(ke.toFixed(2));
}

/**
 * Calculate Weighted Average Cost of Capital (WACC)
 * Formula: WACC = E/(E+D) × ke + D/(E+D) × kd × (1-T)
 */
export function calculateWACC(params: WACCParams): number {
  const { equityRatio, debtRatio, costOfDebt, taxRate, ...keParams } = params;

  // Calculate Cost of Equity first
  const ke = calculateCostOfEquity(keParams);

  // Convert percentage values (0-100) to ratios (0-1) for calculation
  const equityRatioDecimal = equityRatio / 100;
  const debtRatioDecimal = debtRatio / 100;

  // Ensure ratios sum to 1 (100%)
  if (Math.abs(equityRatioDecimal + debtRatioDecimal - 1) > 0.01) {
    throw new Error("Equity ratio and debt ratio must sum to 100%");
  }

  // Formula: WACC = E/(E+D) × ke + D/(E+D) × kd × (1-T)
  const wacc =
    equityRatioDecimal * ke +
    debtRatioDecimal * costOfDebt * (1 - taxRate / 100);

  return parseFloat(wacc.toFixed(2));
}

/**
 * Calculate Enterprise Value using WACC and FCF
 * Formula: EV = FCF / (WACC - g)
 * Where:
 * - FCF: Free Cash Flow
 * - g: Growth rate (%)
 */
export function calculateEnterpriseValue(
  fcf: number,
  wacc: number,
  growthRate: number
): number {
  if (wacc <= growthRate) {
    throw new Error(
      "WACC must be greater than growth rate for a valid calculation"
    );
  }

  const ev = fcf / (wacc / 100 - growthRate / 100);

  return parseFloat(ev.toFixed(2));
}
