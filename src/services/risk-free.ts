// https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4754347

export const RISK_FREE_BY_COUNTRY = {
  AbuDhabi: 0.029,
  Andorra: 0.033,
  Argentina: 0.174,
  Australia: 0.042,
  Austria: 0.03,
  Bangladesh: 0.092,
  Barbados: 0.049,
  Belgium: 0.031,
  Bolivia: 0.068,
  Bosnia: 0.038,
  Brazil: 0.098,
  Bulgaria: 0.041,
  Canada: 0.035,
  Chile: 0.06,
  China: 0.03,
  Colombia: 0.098,
  "Costa Rica": 0.047,
  Croatia: 0.031,
  Cyprus: 0.036,
  "Czech Republic": 0.034,
  Denmark: 0.029,
  "Dominican Rep.": 0.079,
  Ecuador: 0.139,
  Egypt: 0.187,
  Estonia: 0.023,
  Ethiopia: 0.12,
  Finland: 0.03,
  France: 0.03,
  Georgia: 0.049,
  Germany: 0.027,
  Ghana: 0.186,
  Greece: 0.033,
  "Hong Kong": 0.039,
  Hungary: 0.043,
  Iceland: 0.064,
  India: 0.072,
  Indonesia: 0.069,
  Ireland: 0.029,
  Israel: 0.044,
  Italy: 0.034,
  Jamaica: 0.048,
  Japan: 0.011,
  Kazakhstan: 0.057,
  Kenya: 0.161,
  "Korea, (South)": 0.035,
  Kuwait: 0.02,
  Latvia: 0.023,
  Lithuania: 0.031,
  Luxembourg: 0.031,
  Malaysia: 0.04,
  Malta: 0.037,
  Mauritius: 0.046,
  Mexico: 0.092,
  Mongolia: 0.104,
  Montenegro: 0.066,
  Morocco: 0.037,
  Mozambique: 0.073,
  Netherlands: 0.029,
  "New Zealand": 0.049,
  Nigeria: 0.139,
  Norway: 0.033,
  "Nrth Macedonia": 0.064,
  Pakistan: 0.157,
  Panama: 0.066,
  Peru: 0.062,
  Phillipines: 0.06,
  Poland: 0.043,
  Portugal: 0.031,
  Qatar: 0.047,
  Romania: 0.064,
  Russia: 0.111,
  "Saudi Arabia": 0.054,
  Serbia: 0.042,
  Singapore: 0.032,
  Slovakia: 0.031,
  Slovenia: 0.031,
  "South Africa": 0.103,
  "Spain 2024": 0.035,
  "Sri Lanka": 0.126,
  Sweden: 0.029,
  Switzerland: 0.022,
  Taiwan: 0.014,
  Tanzania: 0.093,
  Thailand: 0.027,
  "Trinidad and Tobago": 0.049,
  Tunisia: 0.079,
  Turkey: 0.186,
  Uganda: 0.136,
  Ukraine: 0.131,
  "United Arab Emirates (UAE)": 0.045,
  "United Kingdom": 0.04,
  Uruguay: 0.071,
  USA: 0.041,
  Venezuela: 0.241,
  Vietnam: 0.031,
  Zambia: 0.266,
};

/**
 * Get the risk-free rate for a specific country
 * @param country The country name
 * @returns The risk-free rate (as a decimal, e.g., 0.041 for 4.1%)
 */
export function getRiskFreeRate(country: string): number {
  const rate =
    RISK_FREE_BY_COUNTRY[country as keyof typeof RISK_FREE_BY_COUNTRY];
  if (rate === undefined) {
    // Default to US rate if country not found
    return RISK_FREE_BY_COUNTRY.USA;
  }
  return rate * 100;
}

/**
 * Get all available risk-free rates by country
 * @returns An object containing all risk-free rates by country
 */
export function getAllRiskFreeRates(): typeof RISK_FREE_BY_COUNTRY {
  return RISK_FREE_BY_COUNTRY;
}

/**
 * Get a list of all countries with available risk-free rates
 * @returns An array of country names
 */
export function getAvailableCountries(): string[] {
  return Object.keys(RISK_FREE_BY_COUNTRY);
}
