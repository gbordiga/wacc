/**
 * Utility functions for formatting data
 */

/**
 * Format a number to percentage with specified decimal places
 * Works with both decimals (0.0523) and percentages (5.23),
 * intelligently determining which format is being used
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  // If value is likely already a percentage (>= 1), don't multiply by 100
  if (value >= 1) {
    return `${value.toFixed(decimals)}%`;
  }
  // Otherwise, treat as decimal and convert to percentage
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format a number as currency
 */
export function formatCurrency(
  value: number,
  currency: string = "EUR",
  locale: string = "it-IT"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}

/**
 * Format a number with thousand separators
 */
export function formatNumber(
  value: number,
  decimals: number = 2,
  locale: string = "it-IT"
): string {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

/**
 * Convert percentage input string to decimal number
 * e.g., "5.23%" -> 0.0523
 */
export function parsePercentage(value: string): number {
  // Remove % sign and convert to number
  return parseFloat(value.replace(/%/g, "")) / 100;
}

/**
 * Check if value is a valid number
 */
export function isValidNumber(value: unknown): boolean {
  if (value === null || value === undefined) return false;

  const number = Number(value);
  return !isNaN(number) && isFinite(number);
}
