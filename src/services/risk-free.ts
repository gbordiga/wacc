// Fernandez survey averages.
// 2025 (54 countries): https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5260463
// 2024 fallback for countries not reported in 2025: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4754347

export const RISK_FREE_BY_COUNTRY = {
  AbuDhabi: 0.029, // 2024
  Andorra: 0.033, // 2024
  Argentina: 0.089,
  Australia: 0.042,
  Austria: 0.034,
  Bangladesh: 0.092, // 2024
  Barbados: 0.049, // 2024
  Belgium: 0.034,
  Bolivia: 0.16,
  Bosnia: 0.038, // 2024
  Brazil: 0.109,
  Bulgaria: 0.041, // 2024
  Canada: 0.033,
  Chile: 0.052,
  China: 0.023,
  Colombia: 0.063,
  "Costa Rica": 0.047, // 2024
  Croatia: 0.031, // 2024
  Cyprus: 0.036, // 2024
  "Czech Republic": 0.046,
  Denmark: 0.024,
  "Dominican Rep.": 0.061,
  Ecuador: 0.076,
  Egypt: 0.246,
  Estonia: 0.023, // 2024
  Ethiopia: 0.12, // 2024
  Finland: 0.033,
  France: 0.033,
  Georgia: 0.049, // 2024
  Germany: 0.027,
  Ghana: 0.186, // 2024
  Greece: 0.035,
  "Hong Kong": 0.039, // 2024
  Hungary: 0.043, // 2024
  Iceland: 0.064, // 2024
  India: 0.068,
  Indonesia: 0.069, // 2024
  Ireland: 0.025,
  Israel: 0.042,
  Italy: 0.034,
  Jamaica: 0.048, // 2024
  Japan: 0.016,
  Kazakhstan: 0.057, // 2024
  Kenya: 0.138,
  "Korea, (South)": 0.033,
  Kuwait: 0.02, // 2024
  Latvia: 0.023, // 2024
  Lithuania: 0.035,
  Luxembourg: 0.025,
  Malaysia: 0.047,
  Malta: 0.037, // 2024
  Mauritius: 0.046, // 2024
  Mexico: 0.08,
  Mongolia: 0.104, // 2024
  Montenegro: 0.066, // 2024
  Morocco: 0.037, // 2024
  Mozambique: 0.073, // 2024
  Netherlands: 0.028,
  "New Zealand": 0.043,
  Nigeria: 0.155,
  Norway: 0.038,
  "Nrth Macedonia": 0.064, // 2024
  Pakistan: 0.125,
  Panama: 0.066, // 2024
  Peru: 0.061,
  Phillipines: 0.063,
  Poland: 0.054,
  Portugal: 0.032,
  Qatar: 0.047, // 2024
  Romania: 0.065,
  Russia: 0.142,
  "Saudi Arabia": 0.06,
  Serbia: 0.042, // 2024
  Singapore: 0.031,
  Slovakia: 0.031, // 2024
  Slovenia: 0.031, // 2024
  "South Africa": 0.105,
  Spain: 0.033,
  "Sri Lanka": 0.126, // 2024
  Sweden: 0.03,
  Switzerland: 0.024,
  Taiwan: 0.018,
  Tanzania: 0.093, // 2024
  Thailand: 0.026,
  "Trinidad and Tobago": 0.049, // 2024
  Tunisia: 0.079, // 2024
  Turkey: 0.186, // 2024
  Uganda: 0.136, // 2024
  Ukraine: 0.131, // 2024
  "United Arab Emirates (UAE)": 0.045, // 2024
  "United Kingdom": 0.041,
  Uruguay: 0.078,
  USA: 0.041,
  Venezuela: 0.14,
  Vietnam: 0.034,
  Zambia: 0.266, // 2024
}

/**
 * Get the risk-free rate for a specific country
 * @param country The country name
 * @returns The risk-free rate as a percentage (e.g., 4.1 for 4.1%)
 */
export function getRiskFreeRate(country: string): number {
  const rate =
    RISK_FREE_BY_COUNTRY[country as keyof typeof RISK_FREE_BY_COUNTRY]
  if (rate === undefined) {
    return RISK_FREE_BY_COUNTRY.USA
  }
  return rate * 100
}

/**
 * Get all available risk-free rates by country
 * @returns An object containing all risk-free rates by country
 */
export function getAllRiskFreeRates(): typeof RISK_FREE_BY_COUNTRY {
  return RISK_FREE_BY_COUNTRY
}

/**
 * Get a list of all countries with available risk-free rates
 * @returns An array of country names
 */
export function getAvailableCountries(): string[] {
  return Object.keys(RISK_FREE_BY_COUNTRY)
}
