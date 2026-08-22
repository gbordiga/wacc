/**
 * Size premium service for WACC calculations
 * Kroll market-cap decile premia, 2025
 */

export interface SizePremiumEntry {
  min: number
  max: number
  premium: number
}

export const SIZE_PREMIUM_TABLE: SizePremiumEntry[] = [
  { min: 46949, max: Infinity, premium: -0.0001 },
  { min: 20178, max: 46948.999, premium: 0.0033 },
  { min: 9937, max: 20177.999, premium: 0.0049 },
  { min: 6181, max: 9936.999, premium: 0.005 },
  { min: 3946, max: 6180.999, premium: 0.0074 },
  { min: 2465, max: 3945.999, premium: 0.01 },
  { min: 1417, max: 2464.999, premium: 0.0119 },
  { min: 730, max: 1416.999, premium: 0.0088 },
  { min: 304, max: 729.999, premium: 0.0173 },
  { min: 2, max: 303.999, premium: 0.0447 },
]

/**
 * Helper function to format market cap numbers consistently
 * @param value Market cap value in millions
 * @returns Formatted string
 */
function formatMarketCap(value: number): string {
  if (value >= 1000)
    return `${(value / 1000).toFixed(1)}B`

  return `${value.toFixed(0)}M`
}

/**
 * Gets the appropriate size premium based on market capitalization in millions of USD
 * @param marketCapMlnUSD Market capitalization in millions of USD
 * @returns Size premium as a decimal (e.g., 0.0173 for 1.73%)
 */
export function getSizePremium(marketCapMlnUSD: number): number {
  return (
    SIZE_PREMIUM_TABLE.find(
      (entry) => marketCapMlnUSD >= entry.min && marketCapMlnUSD <= entry.max
    )?.premium ?? 0
  )
}

/**
 * Gets the appropriate size premium formatted as a percentage string
 * @param marketCapMlnUSD Market capitalization in millions of USD
 * @returns Size premium as a percentage string (e.g., "1.73%")
 */
export function getFormattedSizePremium(marketCapMlnUSD: number): string {
  const premium = getSizePremium(marketCapMlnUSD)
  return `${(premium * 100).toFixed(2)}%`
}

/**
 * Gets the market cap size range description for a given market cap
 * @param marketCapMlnUSD Market capitalization in millions of USD
 * @returns Description of the size range
 */
export function getSizeCategory(marketCapMlnUSD: number): string {
  if (marketCapMlnUSD >= 46949) return "Very Large Cap"
  if (marketCapMlnUSD >= 9937) return "Large Cap"
  if (marketCapMlnUSD >= 2465) return "Mid Cap"
  if (marketCapMlnUSD >= 304) return "Small Cap"
  return "Micro Cap"
}

/**
 * Gets all available size premium entries for UI display
 * @returns Array of size premium entries with descriptions
 */
export function getSizePremiumRanges(): Array<
  SizePremiumEntry & { description: string }
> {
  return SIZE_PREMIUM_TABLE.map((entry) => {
    const description =
      entry.max === Infinity
        ? `$${formatMarketCap(entry.min)} and above`
        : `$${formatMarketCap(entry.min)} to $${formatMarketCap(entry.max)}`

    return {
      ...entry,
      description,
    }
  })
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
  return enterpriseValue - netDebt
}
