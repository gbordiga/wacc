// Beta values by sector (mock data based on typical values)
export const SECTOR_BETAS: Record<string, number> = {
  Advertising: 1.34,
  "Aerospace/Defense": 0.9,
  "Air Transport": 1.24,
  Apparel: 0.99,
  "Auto & Truck": 1.62,
  "Auto Parts": 1.23,
  "Bank (Money Center)": 0.88,
  "Banks (Regional)": 0.52,
  "Beverage (Alcoholic)": 0.61,
  "Beverage (Soft)": 0.57,
  Broadcasting: 0.92,
  "Brokerage & Investment Banking": 0.95,
  "Building Materials": 1.36,
  "Business & Consumer Services": 1,
  "Cable TV": 0.96,
  "Chemical (Basic)": 1.15,
  "Chemical (Diversified)": 0.99,
  "Chemical (Specialty)": 0.92,
  "Coal & Related Energy": 1.18,
  "Computer Services": 1.23,
  "Computers/Peripherals": 1.14,
  "Construction Supplies": 1.29,
  Diversified: 1.09,
  "Drugs (Biotechnology)": 1.25,
  "Drugs (Pharmaceutical)": 1.07,
  Education: 0.98,
  "Electrical Equipment": 1.27,
  "Electronics (Consumer & Office)": 0.92,
  "Electronics (General)": 1.06,
  "Engineering/Construction": 0.99,
  Entertainment: 1.04,
  "Environmental & Waste Services": 0.92,
  "Farming/Agriculture": 0.98,
  "Financial Svcs. (Non-bank & Insurance)": 1.07,
  "Food Processing": 0.47,
  "Food Wholesalers": 0.72,
  "Furn/Home Furnishings": 0.87,
  "Green & Renewable Energy": 1.13,
  "Healthcare Products": 1.01,
  "Healthcare Support Services": 0.94,
  "Heathcare Information and Technology": 1.22,
  Homebuilding: 1.43,
  "Hospitals/Healthcare Facilities": 0.86,
  "Hotel/Gaming": 1.19,
  "Household Products": 0.9,
  "Information Services": 0.98,
  "Insurance (General)": 0.76,
  "Insurance (Life)": 0.73,
  "Insurance (Prop/Cas.)": 0.61,
  "Investments & Asset Management": 0.57,
  Machinery: 1.07,
  "Metals & Mining": 1.02,
  "Office Equipment & Services": 1.2,
  "Oil/Gas (Integrated)": 0.48,
  "Oil/Gas (Production and Exploration)": 0.88,
  "Oil/Gas Distribution": 0.75,
  "Oilfield Svcs/Equip.": 0.94,
  "Packaging & Container": 0.98,
  "Paper/Forest Products": 1.07,
  Power: 0.54,
  "Precious Metals": 1.23,
  "Publishing & Newspapers": 0.64,
  "R.E.I.T.": 0.95,
  "Real Estate (Development)": 1.03,
  "Real Estate (General/Diversified)": 0.86,
  "Real Estate (Operations & Services)": 1.08,
  Recreation: 1.33,
  Reinsurance: 0.54,
  "Restaurant/Dining": 1.01,
  "Retail (Automotive)": 1.35,
  "Retail (Building Supply)": 1.79,
  "Retail (Distributors)": 1.12,
  "Retail (General)": 1.06,
  "Retail (Grocery and Food)": 0.58,
  "Retail (REITs)": 0.95,
  "Retail (Special Lines)": 1.22,
  "Rubber& Tires": 0.65,
  Semiconductor: 1.49,
  "Semiconductor Equip": 1.48,
  "Shipbuilding & Marine": 0.58,
  Shoe: 1.42,
  "Software (Entertainment)": 1.18,
  "Software (Internet)": 1.69,
  "Software (System & Application)": 1.24,
  Steel: 1.06,
  "Telecom (Wireless)": 0.77,
  "Telecom. Equipment": 1,
  "Telecom. Services": 0.89,
  Tobacco: 0.98,
  Transportation: 1.03,
  "Transportation (Railroads)": 0.99,
  Trucking: 1.1,
  "Utility (General)": 0.39,
  "Utility (Water)": 0.68,
};

// Default beta if sector not found
export const DEFAULT_BETA = 1.0;

/**
 * Get beta value for a specific sector
 * @param sectorName The name of the industry sector
 * @returns The beta value for the specified sector or the default beta if not found
 */
export function getSectorBeta(sectorName: string): number {
  return SECTOR_BETAS[sectorName] || DEFAULT_BETA;
}

/**
 * Get all sectors with their beta values
 * @returns Array of objects containing sector name and beta value
 */
export function getAllSectorBetas(): Array<{ name: string; beta: number }> {
  return Object.entries(SECTOR_BETAS).map(([name, beta]) => ({
    name,
    beta,
  }));
}
