export type CompanyType =
  | "largeNonFinancial"
  | "financial"
  | "smallRiskyNonFinancial";

export interface CoverageRating {
  min: number;
  max: number;
  rating: string;
  spread: number;
}

export const COVERAGE_SPREAD_TABLE: Record<CompanyType, CoverageRating[]> = {
  largeNonFinancial: [
    { min: -Infinity, max: 0.2, rating: "D2/D", spread: 0.19 },
    { min: 0.2, max: 0.65, rating: "C2/C", spread: 0.155 },
    { min: 0.65, max: 0.8, rating: "Ca2/CC", spread: 0.101 },
    { min: 0.8, max: 1.25, rating: "Caa/CCC", spread: 0.0728 },
    { min: 1.25, max: 1.5, rating: "B3/B-", spread: 0.0442 },
    { min: 1.5, max: 1.75, rating: "B2/B", spread: 0.03 },
    { min: 1.75, max: 2.0, rating: "B1/B+", spread: 0.0261 },
    { min: 2.0, max: 2.25, rating: "Ba2/BB", spread: 0.0183 },
    { min: 2.25, max: 2.5, rating: "Ba1/BB+", spread: 0.0155 },
    { min: 2.5, max: 3.0, rating: "Baa2/BBB", spread: 0.012 },
    { min: 3.0, max: 4.25, rating: "A3/A-", spread: 0.0095 },
    { min: 4.25, max: 5.5, rating: "A2/A", spread: 0.0085 },
    { min: 5.5, max: 6.5, rating: "A1/A+", spread: 0.0077 },
    { min: 6.5, max: 8.5, rating: "Aa2/AA", spread: 0.006 },
    { min: 8.5, max: Infinity, rating: "Aaa/AAA", spread: 0.0045 },
  ],

  financial: [
    { min: -Infinity, max: 0.05, rating: "D2/D", spread: 0.19 },
    { min: 0.05, max: 0.1, rating: "C2/C", spread: 0.155 },
    { min: 0.1, max: 0.2, rating: "Ca2/CC", spread: 0.101 },
    { min: 0.2, max: 0.3, rating: "Caa/CCC", spread: 0.0728 },
    { min: 0.3, max: 0.4, rating: "B3/B-", spread: 0.0442 },
    { min: 0.4, max: 0.5, rating: "B2/B", spread: 0.03 },
    { min: 0.5, max: 0.6, rating: "B1/B+", spread: 0.0261 },
    { min: 0.6, max: 0.75, rating: "Ba2/BB", spread: 0.0183 },
    { min: 0.75, max: 0.9, rating: "Ba1/BB+", spread: 0.0155 },
    { min: 0.9, max: 1.2, rating: "Baa2/BBB", spread: 0.012 },
    { min: 1.2, max: 1.5, rating: "A3/A-", spread: 0.0095 },
    { min: 1.5, max: 2.0, rating: "A2/A", spread: 0.0085 },
    { min: 2.0, max: 2.5, rating: "A1/A+", spread: 0.0077 },
    { min: 2.5, max: 3.0, rating: "Aa2/AA", spread: 0.006 },
    { min: 3.0, max: Infinity, rating: "Aaa/AAA", spread: 0.0045 },
  ],

  smallRiskyNonFinancial: [
    { min: -Infinity, max: 0.5, rating: "D2/D", spread: 0.19 },
    { min: 0.5, max: 0.8, rating: "C2/C", spread: 0.155 },
    { min: 0.8, max: 1.25, rating: "Ca2/CC", spread: 0.101 },
    { min: 1.25, max: 1.5, rating: "Caa/CCC", spread: 0.0728 },
    { min: 1.5, max: 2.0, rating: "B3/B-", spread: 0.0442 },
    { min: 2.0, max: 2.5, rating: "B2/B", spread: 0.03 },
    { min: 2.5, max: 3.0, rating: "B1/B+", spread: 0.0261 },
    { min: 3.0, max: 3.5, rating: "Ba2/BB", spread: 0.0183 },
    { min: 3.5, max: 4.0, rating: "Ba1/BB+", spread: 0.0155 },
    { min: 4.0, max: 4.5, rating: "Baa2/BBB", spread: 0.012 },
    { min: 4.5, max: 6.0, rating: "A3/A-", spread: 0.0095 },
    { min: 6.0, max: 7.5, rating: "A2/A", spread: 0.0085 },
    { min: 7.5, max: 9.5, rating: "A1/A+", spread: 0.0077 },
    { min: 9.5, max: 12.5, rating: "Aa2/AA", spread: 0.006 },
    { min: 12.5, max: Infinity, rating: "Aaa/AAA", spread: 0.0045 },
  ],
};

/**
 * Get the credit spread based on interest coverage ratio and company type
 * @param type The type of company (largeNonFinancial, financial, or smallRiskyNonFinancial)
 * @param interestCoverageRatio The interest coverage ratio (EBIT/Interest Expense)
 * @returns The rating and spread information for the given ICR
 */
export function getCoverageSpread(
  type: CompanyType,
  interestCoverageRatio: number
): CoverageRating | undefined {
  const table = COVERAGE_SPREAD_TABLE[type];
  return table.find(
    (row) => interestCoverageRatio > row.min && interestCoverageRatio <= row.max
  );
}

/**
 * Get just the spread value based on interest coverage ratio and company type
 * @param type The type of company
 * @param interestCoverageRatio The interest coverage ratio
 * @returns The spread value as a decimal (e.g., 0.012 for 1.2%)
 */
export function getSpreadValue(
  type: CompanyType,
  interestCoverageRatio: number
): number {
  const coverageInfo = getCoverageSpread(type, interestCoverageRatio);
  return (coverageInfo?.spread || 0.025) * 100; // Default to 2.5% if not found
}

/**
 * Calculate the interest coverage ratio
 * @param ebit Earnings Before Interest and Taxes
 * @param interestExpense Total interest expense
 * @returns The interest coverage ratio (EBIT/Interest)
 */
export function calculateICR(ebit: number, interestExpense: number): number {
  if (interestExpense === 0) return Infinity;
  return ebit / interestExpense;
}

/**
 * Get a list of all available company types
 * @returns An array of company types
 */
export function getCompanyTypes(): CompanyType[] {
  return Object.keys(COVERAGE_SPREAD_TABLE) as CompanyType[];
}

// Esempio:
const result = getCoverageSpread("largeNonFinancial", 2.6);
