/**
 * Financial calculations library for WACC and Cost of Equity
 */

export interface CostOfEquityParams {
  riskFreeRate: number; // rf - Risk-free rate (%)
  beta: number; // β - Beta coefficient
  marketRiskPremium: number; // MRP - Market risk premium (%)
  countryRiskPremium: number; // α - Country risk premium (%)
  additionalRisk: number; // ER - Additional risk (small size, etc.) (%)
  sizePremium: number; // SP - Size premium (%)
}

export interface WACCParams extends CostOfEquityParams {
  debtRatio: number; // D/(D+E) - Debt ratio (%)
  equityRatio: number; // E/(D+E) - Equity ratio (%)
  costOfDebt: number; // kd - Cost of debt (%)
  taxRate: number; // T - Corporate tax rate (%)
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
