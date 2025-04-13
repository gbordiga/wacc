/**
 * Size premium service for WACC calculations
 * Based on Duff & Phelps' size premium study
 */

export interface SizePremiumEntry {
  min: number;
  max: number;
  premium: number;
}

export const SIZE_PREMIUM_TABLE: SizePremiumEntry[] = [
  { min: 1724959, max: Infinity, premium: -0.0022 },
  { min: 25275, max: 1724959, premium: -0.0022 }, // covers top range explicitly
  { min: 11563, max: 25274.999, premium: 0.0049 },
  { min: 5916, max: 11562.999, premium: 0.0071 },
  { min: 3388, max: 5915.999, premium: 0.0075 },
  { min: 2146, max: 3387.999, premium: 0.0109 },
  { min: 1397, max: 2145.999, premium: 0.0137 },
  { min: 800, max: 1396.999, premium: 0.0154 },
  { min: 397, max: 799.999, premium: 0.0146 },
  { min: 167, max: 396.999, premium: 0.0229 },
  { min: 2, max: 166.999, premium: 0.0501 },
];

/**
 * Helper function to format market cap numbers consistently
 * @param value Market cap value in millions
 * @returns Formatted string
 */
function formatMarketCap(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}B`; // Display as billions
  } else {
    return `${value.toFixed(0)}M`; // Display as millions
  }
}

/**
 * Gets the appropriate size premium based on market capitalization in millions of USD
 * @param marketCapMlnUSD Market capitalization in millions of USD
 * @returns Size premium as a decimal (e.g., 0.0229 for 2.29%)
 */
export function getSizePremium(marketCapMlnUSD: number): number {
  return (
    SIZE_PREMIUM_TABLE.find(
      (entry) => marketCapMlnUSD >= entry.min && marketCapMlnUSD <= entry.max
    )?.premium ?? 0
  );
}

/**
 * Gets the appropriate size premium formatted as a percentage string
 * @param marketCapMlnUSD Market capitalization in millions of USD
 * @returns Size premium as a percentage string (e.g., "2.29%")
 */
export function getFormattedSizePremium(marketCapMlnUSD: number): string {
  const premium = getSizePremium(marketCapMlnUSD);
  return `${(premium * 100).toFixed(2)}%`;
}

/**
 * Gets the market cap size range description for a given market cap
 * @param marketCapMlnUSD Market capitalization in millions of USD
 * @returns Description of the size range
 */
export function getSizeCategory(marketCapMlnUSD: number): string {
  if (marketCapMlnUSD >= 25275) {
    return "Very Large Cap";
  } else if (marketCapMlnUSD >= 5916) {
    return "Large Cap";
  } else if (marketCapMlnUSD >= 1397) {
    return "Mid Cap";
  } else if (marketCapMlnUSD >= 167) {
    return "Small Cap";
  } else {
    return "Micro Cap";
  }
}

/**
 * Gets all available size premium entries for UI display
 * @returns Array of size premium entries with descriptions
 */
export function getSizePremiumRanges(): Array<
  SizePremiumEntry & { description: string }
> {
  return SIZE_PREMIUM_TABLE.map((entry) => {
    let description = "";

    if (entry.max === Infinity) {
      description = `$${formatMarketCap(entry.min)} and above`;
    } else {
      description = `$${formatMarketCap(entry.min)} to $${formatMarketCap(
        entry.max
      )}`;
    }

    return {
      ...entry,
      description,
    };
  });
}

/**
 * Converts enterprise value to equity value (market cap)
 * @param enterpriseValue Enterprise value in millions
 * @param netDebt Net debt in millions (positive if debt exceeds cash)
 * @returns Equity value (market cap) in millions
 */
export function calculateMarketCap(
  enterpriseValue: number,
  netDebt: number
): number {
  return enterpriseValue - netDebt;
}
