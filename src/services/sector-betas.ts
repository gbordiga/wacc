// Damodaran, January 2026 — Global unlevered betas (effective/marginal mix as published)
// https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/BetasGlobal.html
// Source file: https://www.stern.nyu.edu/~adamodar/pc/datasets/betaGlobal.xls

export const SECTOR_BETAS: Record<string, number> = {
  Advertising: 0.977,
  "Aerospace/Defense": 1.122,
  "Air Transport": 0.624,
  Apparel: 0.669,
  "Auto & Truck": 1.036,
  "Auto Parts": 1.201,
  "Bank (Money Center)": 0.27,
  "Banks (Regional)": 0.205,
  "Beverage (Alcoholic)": 0.688,
  "Beverage (Soft)": 0.52,
  Broadcasting: 0.585,
  "Brokerage & Investment Banking": 0.421,
  "Building Materials": 0.859,
  "Business & Consumer Services": 0.86,
  "Cable TV": 0.569,
  "Chemical (Basic)": 0.912,
  "Chemical (Diversified)": 0.84,
  "Chemical (Specialty)": 0.981,
  "Coal & Related Energy": 0.995,
  "Computer Services": 1.004,
  "Computers/Peripherals": 1.42,
  "Construction Supplies": 0.844,
  Diversified: 0.585,
  "Drugs (Biotechnology)": 1.127,
  "Drugs (Pharmaceutical)": 0.956,
  Education: 0.669,
  "Electrical Equipment": 1.246,
  "Electronics (Consumer & Office)": 1.067,
  "Electronics (General)": 1.445,
  "Engineering/Construction": 0.637,
  Entertainment: 0.925,
  "Environmental & Waste Services": 0.87,
  "Farming/Agriculture": 0.465,
  "Financial Services (Non-bank & Insurance)": 0.277,
  "Food Processing": 0.528,
  "Food Wholesalers": 0.477,
  "Furn/Home Furnishings": 0.812,
  "Green & Renewable Energy": 0.546,
  "Healthcare Products": 1.071,
  "Healthcare Support Services": 0.714,
  "Healthcare Information and Technology": 1.168,
  Homebuilding: 0.74,
  "Hospitals/Healthcare Facilities": 0.564,
  "Hotel/Gaming": 0.614,
  "Household Products": 0.743,
  "Information Services": 0.826,
  "Insurance (General)": 0.417,
  "Insurance (Life)": 0.515,
  "Insurance (Prop/Cas.)": 0.385,
  "Investments & Asset Management": 0.516,
  Machinery: 1.244,
  "Metals & Mining": 1.055,
  "Office Equipment & Services": 0.625,
  "Oil/Gas (Integrated)": 0.593,
  "Oil/Gas (Production and Exploration)": 0.699,
  "Oil/Gas Distribution": 0.448,
  "Oilfield Services/Equipment": 0.732,
  "Packaging & Container": 0.545,
  "Paper/Forest Products": 0.561,
  Power: 0.435,
  "Precious Metals": 1.309,
  "Publishing & Newspapers": 0.676,
  "R.E.I.T.": 0.354,
  "Real Estate (Development)": 0.381,
  "Real Estate (General/Diversified)": 0.559,
  "Real Estate (Operations & Services)": 0.484,
  Recreation: 0.806,
  Reinsurance: 0.859,
  "Restaurant/Dining": 0.632,
  "Retail (Automotive)": 0.599,
  "Retail (Building Supply)": 0.792,
  "Retail (Distributors)": 0.598,
  "Retail (General)": 0.895,
  "Retail (Grocery and Food)": 0.65,
  "Retail (REITs)": 0.397,
  "Retail (Special Lines)": 0.845,
  "Rubber& Tires": 0.708,
  Semiconductor: 1.821,
  "Semiconductor Equip": 2.04,
  "Shipbuilding & Marine": 0.667,
  Shoe: 0.83,
  "Software (Entertainment)": 1.218,
  "Software (Internet)": 1.295,
  "Software (System & Application)": 1.297,
  Steel: 0.834,
  "Telecom (Wireless)": 0.57,
  "Telecom. Equipment": 1.239,
  "Telecom. Services": 0.471,
  Tobacco: 0.363,
  Transportation: 0.689,
  "Transportation (Railroads)": 0.532,
  Trucking: 0.655,
  "Utility (General)": 0.321,
  "Utility (Water)": 0.419,
  "Total Market": 0.752,
  "Total Market (without financials)": 0.903,
}

// Default beta if sector not found
export const DEFAULT_BETA = 1.0

/**
 * Get beta value for a specific sector
 * @param sectorName The name of the industry sector
 * @returns The beta value for the specified sector or the default beta if not found
 */
export function getSectorBeta(sectorName: string): number {
  return SECTOR_BETAS[sectorName] || DEFAULT_BETA
}

/**
 * Get all sectors with their beta values
 * @returns Array of objects containing sector name and beta value
 */
export function getAllSectorBetas(): Array<{ name: string; beta: number }> {
  return Object.entries(SECTOR_BETAS).map(([name, beta]) => ({
    name,
    beta,
  }))
}
