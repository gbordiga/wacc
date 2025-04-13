// https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4754347

export const MRP_BY_COUNTRY = {
  AbuDhabi: 0.06,
  Andorra: 0.082,
  Argentina: 0.213,
  Australia: 0.055,
  Austria: 0.059,
  Bangladesh: 0.116,
  Barbados: 0.163,
  Belgium: 0.057,
  Bolivia: 0.151,
  Bosnia: 0.079,
  Brazil: 0.076,
  Bulgaria: 0.068,
  Canada: 0.052,
  Chile: 0.063,
  China: 0.066,
  Colombia: 0.074,
  "Costa Rica": 0.122,
  Croatia: 0.062,
  Cyprus: 0.078,
  "Czech Republic": 0.056,
  Denmark: 0.058,
  "Dominican Rep.": 0.111,
  Ecuador: 0.158,
  Egypt: 0.168,
  Estonia: 0.063,
  Ethiopia: 0.195,
  Finland: 0.057,
  France: 0.056,
  Georgia: 0.1,
  Germany: 0.056,
  Ghana: 0.227,
  Greece: 0.067,
  "Hong Kong": 0.073,
  Hungary: 0.063,
  Iceland: 0.066,
  India: 0.084,
  Indonesia: 0.082,
  Ireland: 0.055,
  Israel: 0.06,
  Italy: 0.062,
  Jamaica: 0.132,
  Japan: 0.055,
  Kazakhstan: 0.078,
  Kenya: 0.149,
  "Korea, (South)": 0.058,
  Kuwait: 0.063,
  Latvia: 0.07,
  Lithuania: 0.065,
  Luxembourg: 0.055,
  Malaysia: 0.072,
  Malta: 0.062,
  Mauritius: 0.087,
  Mexico: 0.073,
  Mongolia: 0.164,
  Montenegro: 0.114,
  Morocco: 0.091,
  Mozambique: 0.186,
  Netherlands: 0.054,
  "New Zealand": 0.06,
  Nigeria: 0.152,
  Norway: 0.054,
  "Nrth Macedonia": 0.107,
  Pakistan: 0.163,
  Panama: 0.089,
  Peru: 0.088,
  Phillipines: 0.074,
  Poland: 0.058,
  Portugal: 0.06,
  Qatar: 0.067,
  Romania: 0.074,
  Russia: 0.105,
  "Saudi Arabia": 0.068,
  Serbia: 0.069,
  Singapore: 0.051,
  Slovakia: 0.056,
  Slovenia: 0.059,
  "South Africa": 0.083,
  Spain: 0.064,
  "Sri Lanka": 0.235,
  Sweden: 0.054,
  Switzerland: 0.053,
  Taiwan: 0.06,
  Tanzania: 0.139,
  Thailand: 0.077,
  "Trinidad and Tobago": 0.1,
  Tunisia: 0.217,
  Turkey: 0.165,
  Uganda: 0.139,
  Ukraine: 0.226,
  "United Arab Emirates (UAE)": 0.062,
  "United Kingdom": 0.057,
  Uruguay: 0.09,
  USA: 0.055,
  Venezuela: 0.268,
  Vietnam: 0.097,
  Zambia: 0.227,
};

/**
 * Get the market risk premium for a specific country
 * @param country The country name
 * @returns The market risk premium (as a decimal, e.g., 0.055 for 5.5%)
 */
export function getMarketRiskPremium(country: string): number {
  const premium = MRP_BY_COUNTRY[country as keyof typeof MRP_BY_COUNTRY];
  if (premium === undefined) {
    // Default to US market risk premium if country not found
    return MRP_BY_COUNTRY.USA;
  }
  return premium * 100;
}

/**
 * Get all available market risk premiums by country
 * @returns An object containing all market risk premiums by country
 */
export function getAllMarketRiskPremiums(): typeof MRP_BY_COUNTRY {
  return MRP_BY_COUNTRY;
}

/**
 * Get a list of all countries with available market risk premiums
 * @returns An array of country names
 */
export function getAvailableCountriesWithMRP(): string[] {
  return Object.keys(MRP_BY_COUNTRY);
}
