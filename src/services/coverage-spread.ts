// Damodaran, January 2026
// https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ratings.html
// Source file: https://www.stern.nyu.edu/~adamodar/pc/datasets/ratings.xls

export type CompanyType =
  | "largeNonFinancial"
  | "financial"
  | "smallRiskyNonFinancial"
  | "utility"

export interface CoverageRating {
  min: number
  max: number
  rating: string
  spread: number
}

const JAN_2026_SPREADS = {
  "D2/D": 0.19,
  "C2/C": 0.16,
  "Ca2/CC": 0.1261,
  "Caa/CCC": 0.0885,
  "B3/B-": 0.0509,
  "B2/B": 0.0321,
  "B1/B+": 0.0275,
  "Ba2/BB": 0.0184,
  "Ba1/BB+": 0.0138,
  "Baa2/BBB": 0.0111,
  "A3/A-": 0.0089,
  "A2/A": 0.0078,
  "A1/A+": 0.007,
  "Aa2/AA": 0.0055,
  "Aaa/AAA": 0.004,
} as const

export const COVERAGE_SPREAD_TABLE: Record<CompanyType, CoverageRating[]> = {
  largeNonFinancial: [
    { min: -Infinity, max: 0.2, rating: "D2/D", spread: JAN_2026_SPREADS["D2/D"] },
    { min: 0.2, max: 0.65, rating: "C2/C", spread: JAN_2026_SPREADS["C2/C"] },
    { min: 0.65, max: 0.8, rating: "Ca2/CC", spread: JAN_2026_SPREADS["Ca2/CC"] },
    { min: 0.8, max: 1.25, rating: "Caa/CCC", spread: JAN_2026_SPREADS["Caa/CCC"] },
    { min: 1.25, max: 1.5, rating: "B3/B-", spread: JAN_2026_SPREADS["B3/B-"] },
    { min: 1.5, max: 1.75, rating: "B2/B", spread: JAN_2026_SPREADS["B2/B"] },
    { min: 1.75, max: 2.0, rating: "B1/B+", spread: JAN_2026_SPREADS["B1/B+"] },
    { min: 2.0, max: 2.25, rating: "Ba2/BB", spread: JAN_2026_SPREADS["Ba2/BB"] },
    { min: 2.25, max: 2.5, rating: "Ba1/BB+", spread: JAN_2026_SPREADS["Ba1/BB+"] },
    { min: 2.5, max: 3.0, rating: "Baa2/BBB", spread: JAN_2026_SPREADS["Baa2/BBB"] },
    { min: 3.0, max: 4.25, rating: "A3/A-", spread: JAN_2026_SPREADS["A3/A-"] },
    { min: 4.25, max: 5.5, rating: "A2/A", spread: JAN_2026_SPREADS["A2/A"] },
    { min: 5.5, max: 6.5, rating: "A1/A+", spread: JAN_2026_SPREADS["A1/A+"] },
    { min: 6.5, max: 8.5, rating: "Aa2/AA", spread: JAN_2026_SPREADS["Aa2/AA"] },
    { min: 8.5, max: Infinity, rating: "Aaa/AAA", spread: JAN_2026_SPREADS["Aaa/AAA"] },
  ],

  financial: [
    { min: -Infinity, max: 0.05, rating: "D2/D", spread: JAN_2026_SPREADS["D2/D"] },
    { min: 0.05, max: 0.1, rating: "C2/C", spread: JAN_2026_SPREADS["C2/C"] },
    { min: 0.1, max: 0.2, rating: "Ca2/CC", spread: JAN_2026_SPREADS["Ca2/CC"] },
    { min: 0.2, max: 0.3, rating: "Caa/CCC", spread: JAN_2026_SPREADS["Caa/CCC"] },
    { min: 0.3, max: 0.4, rating: "B3/B-", spread: JAN_2026_SPREADS["B3/B-"] },
    { min: 0.4, max: 0.5, rating: "B2/B", spread: JAN_2026_SPREADS["B2/B"] },
    { min: 0.5, max: 0.6, rating: "B1/B+", spread: JAN_2026_SPREADS["B1/B+"] },
    { min: 0.6, max: 0.75, rating: "Ba2/BB", spread: JAN_2026_SPREADS["Ba2/BB"] },
    { min: 0.75, max: 0.9, rating: "Ba1/BB+", spread: JAN_2026_SPREADS["Ba1/BB+"] },
    { min: 0.9, max: 1.2, rating: "Baa2/BBB", spread: JAN_2026_SPREADS["Baa2/BBB"] },
    { min: 1.2, max: 1.5, rating: "A3/A-", spread: JAN_2026_SPREADS["A3/A-"] },
    { min: 1.5, max: 2.0, rating: "A2/A", spread: JAN_2026_SPREADS["A2/A"] },
    { min: 2.0, max: 2.5, rating: "A1/A+", spread: JAN_2026_SPREADS["A1/A+"] },
    { min: 2.5, max: 3.0, rating: "Aa2/AA", spread: JAN_2026_SPREADS["Aa2/AA"] },
    { min: 3.0, max: Infinity, rating: "Aaa/AAA", spread: JAN_2026_SPREADS["Aaa/AAA"] },
  ],

  smallRiskyNonFinancial: [
    { min: -Infinity, max: 0.5, rating: "D2/D", spread: JAN_2026_SPREADS["D2/D"] },
    { min: 0.5, max: 0.8, rating: "C2/C", spread: JAN_2026_SPREADS["C2/C"] },
    { min: 0.8, max: 1.25, rating: "Ca2/CC", spread: JAN_2026_SPREADS["Ca2/CC"] },
    { min: 1.25, max: 1.5, rating: "Caa/CCC", spread: JAN_2026_SPREADS["Caa/CCC"] },
    { min: 1.5, max: 2.0, rating: "B3/B-", spread: JAN_2026_SPREADS["B3/B-"] },
    { min: 2.0, max: 2.5, rating: "B2/B", spread: JAN_2026_SPREADS["B2/B"] },
    { min: 2.5, max: 3.0, rating: "B1/B+", spread: JAN_2026_SPREADS["B1/B+"] },
    { min: 3.0, max: 3.5, rating: "Ba2/BB", spread: JAN_2026_SPREADS["Ba2/BB"] },
    { min: 3.5, max: 4.0, rating: "Ba1/BB+", spread: JAN_2026_SPREADS["Ba1/BB+"] },
    { min: 4.0, max: 4.5, rating: "Baa2/BBB", spread: JAN_2026_SPREADS["Baa2/BBB"] },
    { min: 4.5, max: 6.0, rating: "A3/A-", spread: JAN_2026_SPREADS["A3/A-"] },
    { min: 6.0, max: 7.5, rating: "A2/A", spread: JAN_2026_SPREADS["A2/A"] },
    { min: 7.5, max: 9.5, rating: "A1/A+", spread: JAN_2026_SPREADS["A1/A+"] },
    { min: 9.5, max: 12.5, rating: "Aa2/AA", spread: JAN_2026_SPREADS["Aa2/AA"] },
    { min: 12.5, max: Infinity, rating: "Aaa/AAA", spread: JAN_2026_SPREADS["Aaa/AAA"] },
  ],

  utility: [
    { min: -Infinity, max: 0.2, rating: "D2/D", spread: JAN_2026_SPREADS["D2/D"] },
    { min: 0.2, max: 0.5, rating: "C2/C", spread: JAN_2026_SPREADS["C2/C"] },
    { min: 0.5, max: 0.75, rating: "Ca2/CC", spread: JAN_2026_SPREADS["Ca2/CC"] },
    { min: 0.75, max: 1.0, rating: "Caa/CCC", spread: JAN_2026_SPREADS["Caa/CCC"] },
    { min: 1.0, max: 1.2, rating: "B3/B-", spread: JAN_2026_SPREADS["B3/B-"] },
    { min: 1.2, max: 1.4, rating: "B2/B", spread: JAN_2026_SPREADS["B2/B"] },
    { min: 1.4, max: 1.6, rating: "B1/B+", spread: JAN_2026_SPREADS["B1/B+"] },
    { min: 1.6, max: 1.8, rating: "Ba2/BB", spread: JAN_2026_SPREADS["Ba2/BB"] },
    { min: 1.8, max: 2.0, rating: "Ba1/BB+", spread: JAN_2026_SPREADS["Ba1/BB+"] },
    { min: 2.0, max: 2.25, rating: "Baa2/BBB", spread: JAN_2026_SPREADS["Baa2/BBB"] },
    { min: 2.25, max: 3.0, rating: "A3/A-", spread: JAN_2026_SPREADS["A3/A-"] },
    { min: 3.0, max: 3.5, rating: "A2/A", spread: JAN_2026_SPREADS["A2/A"] },
    { min: 3.5, max: 4.0, rating: "A1/A+", spread: JAN_2026_SPREADS["A1/A+"] },
    { min: 4.0, max: 4.5, rating: "Aa2/AA", spread: JAN_2026_SPREADS["Aa2/AA"] },
    { min: 4.5, max: Infinity, rating: "Aaa/AAA", spread: JAN_2026_SPREADS["Aaa/AAA"] },
  ],
}

/**
 * Get the credit spread based on interest coverage ratio and company type
 * @param type The type of company
 * @param interestCoverageRatio The interest coverage ratio (EBIT/Interest Expense)
 * @returns The rating and spread information for the given ICR
 */
export function getCoverageSpread(
  type: CompanyType,
  interestCoverageRatio: number
): CoverageRating | undefined {
  const table = COVERAGE_SPREAD_TABLE[type]
  return table.find(
    (row) => interestCoverageRatio > row.min && interestCoverageRatio <= row.max
  )
}

/**
 * Get just the spread value based on interest coverage ratio and company type
 * @param type The type of company
 * @param interestCoverageRatio The interest coverage ratio
 * @returns The spread value as a percentage (e.g., 1.11 for 1.11%)
 */
export function getSpreadValue(
  type: CompanyType,
  interestCoverageRatio: number
): number {
  const coverageInfo = getCoverageSpread(type, interestCoverageRatio)
  return (coverageInfo?.spread || 0.025) * 100
}

/**
 * Calculate the interest coverage ratio
 * @param ebit Earnings Before Interest and Taxes
 * @param interestExpense Total interest expense
 * @returns The interest coverage ratio (EBIT/Interest)
 */
export function calculateICR(ebit: number, interestExpense: number): number {
  if (interestExpense === 0) return Infinity
  return ebit / interestExpense
}

/**
 * Get a list of all available company types
 * @returns An array of company types
 */
export function getCompanyTypes(): CompanyType[] {
  return Object.keys(COVERAGE_SPREAD_TABLE) as CompanyType[]
}
