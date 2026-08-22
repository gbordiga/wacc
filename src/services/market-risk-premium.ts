// Fernandez survey averages.
// 2025 (54 countries): https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5260463
// 2024 fallback for countries not reported in 2025: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4754347

export const MRP_BY_COUNTRY = {
  AbuDhabi: 0.06, // 2024
  Andorra: 0.082, // 2024
  Argentina: 0.164,
  Australia: 0.063,
  Austria: 0.057,
  Bangladesh: 0.116, // 2024
  Barbados: 0.163, // 2024
  Belgium: 0.057,
  Bolivia: 0.17,
  Bosnia: 0.079, // 2024
  Brazil: 0.079,
  Bulgaria: 0.068, // 2024
  Canada: 0.056,
  Chile: 0.066,
  China: 0.056,
  Colombia: 0.094,
  "Costa Rica": 0.122, // 2024
  Croatia: 0.062, // 2024
  Cyprus: 0.078, // 2024
  "Czech Republic": 0.063,
  Denmark: 0.051,
  "Dominican Rep.": 0.102,
  Ecuador: 0.139,
  Egypt: 0.145,
  Estonia: 0.063, // 2024
  Ethiopia: 0.195, // 2024
  Finland: 0.057,
  France: 0.051,
  Georgia: 0.1, // 2024
  Germany: 0.054,
  Ghana: 0.227, // 2024
  Greece: 0.074,
  "Hong Kong": 0.073, // 2024
  Hungary: 0.063, // 2024
  Iceland: 0.066, // 2024
  India: 0.071,
  Indonesia: 0.082, // 2024
  Ireland: 0.047,
  Israel: 0.058,
  Italy: 0.06,
  Jamaica: 0.132, // 2024
  Japan: 0.051,
  Kazakhstan: 0.078, // 2024
  Kenya: 0.107,
  "Korea, (South)": 0.056,
  Kuwait: 0.063, // 2024
  Latvia: 0.07, // 2024
  Lithuania: 0.058,
  Luxembourg: 0.047,
  Malaysia: 0.064,
  Malta: 0.062, // 2024
  Mauritius: 0.087, // 2024
  Mexico: 0.068,
  Mongolia: 0.164, // 2024
  Montenegro: 0.114, // 2024
  Morocco: 0.091, // 2024
  Mozambique: 0.186, // 2024
  Netherlands: 0.053,
  "New Zealand": 0.062,
  Nigeria: 0.121,
  Norway: 0.052,
  "Nrth Macedonia": 0.107, // 2024
  Pakistan: 0.132,
  Panama: 0.089, // 2024
  Peru: 0.055,
  Phillipines: 0.072,
  Poland: 0.055,
  Portugal: 0.056,
  Qatar: 0.067, // 2024
  Romania: 0.071,
  Russia: 0.12,
  "Saudi Arabia": 0.087,
  Serbia: 0.069, // 2024
  Singapore: 0.048,
  Slovakia: 0.056, // 2024
  Slovenia: 0.059, // 2024
  "South Africa": 0.074,
  Spain: 0.059,
  "Sri Lanka": 0.235, // 2024
  Sweden: 0.056,
  Switzerland: 0.042,
  Taiwan: 0.059,
  Tanzania: 0.139, // 2024
  Thailand: 0.065,
  "Trinidad and Tobago": 0.1, // 2024
  Tunisia: 0.217, // 2024
  Turkey: 0.165, // 2024
  Uganda: 0.139, // 2024
  Ukraine: 0.226, // 2024
  "United Arab Emirates (UAE)": 0.062, // 2024
  "United Kingdom": 0.054,
  Uruguay: 0.077,
  USA: 0.055,
  Venezuela: 0.28,
  Vietnam: 0.082,
  Zambia: 0.227, // 2024
}

/**
 * Get the market risk premium for a specific country
 * @param country The country name
 * @returns The market risk premium as a percentage (e.g., 5.5 for 5.5%)
 */
export function getMarketRiskPremium(country: string): number {
  const premium = MRP_BY_COUNTRY[country as keyof typeof MRP_BY_COUNTRY]
  if (premium === undefined) {
    return MRP_BY_COUNTRY.USA
  }
  return premium * 100
}

/**
 * Get all available market risk premiums by country
 * @returns An object containing all market risk premiums by country
 */
export function getAllMarketRiskPremiums(): typeof MRP_BY_COUNTRY {
  return MRP_BY_COUNTRY
}

/**
 * Get a list of all countries with available market risk premiums
 * @returns An array of country names
 */
export function getAvailableCountriesWithMRP(): string[] {
  return Object.keys(MRP_BY_COUNTRY)
}
