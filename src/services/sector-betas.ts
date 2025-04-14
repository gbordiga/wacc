// https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datacurrent.html#discrate

// Beta values by sector (mock data based on typical values)
export const SECTOR_BETAS: Record<string, number> = {
  Advertising: 1.011,
  "Aerospace/Defense": 0.887,
  "Air Transport": 0.724,
  Apparel: 0.643,
  "Auto & Truck": 1.061,
  "Auto Parts": 1.001,
  "Bank (Money Center)": 0.26,
  "Banks (Regional)": 0.194,
  "Beverage (Alcoholic)": 0.721,
  "Beverage (Soft)": 0.493,
  Broadcasting: 0.586,
  "Brokerage & Investment Banking": 0.321,
  "Building Materials": 0.868,
  "Business & Consumer Services": 0.888,
  "Cable TV": 0.525,
  "Chemical (Basic)": 0.781,
  "Chemical (Diversified)": 0.748,
  "Chemical (Specialty)": 0.869,
  "Coal & Related Energy": 1.02,
  "Computer Services": 0.972,
  "Computers/Peripherals": 1.193,
  "Construction Supplies": 0.742,
  Diversified: 0.62,
  "Drugs (Biotechnology)": 1.125,
  "Drugs (Pharmaceutical)": 0.91,
  Education: 0.69,
  "Electrical Equipment": 1.056,
  "Electronics (Consumer & Office)": 0.973,
  "Electronics (General)": 1.192,
  "Engineering/Construction": 0.522,
  Entertainment: 0.908,
  "Environmental & Waste Services": 0.793,
  "Farming/Agriculture": 0.5,
  "Financial Services (Non-bank & Insurance)": 0.235,
  "Food Processing": 0.522,
  "Food Wholesalers": 0.402,
  "Furn/Home Furnishings": 0.772,
  "Green & Renewable Energy": 0.538,
  "Healthcare Products": 1.013,
  "Healthcare Support Services": 0.653,
  "Healthcare Information and Technology": 1.067,
  Homebuilding: 0.833,
  "Hospitals/Healthcare Facilities": 0.546,
  "Hotel/Gaming": 0.665,
  "Household Products": 0.784,
  "Information Services": 0.884,
  "Insurance (General)": 0.456,
  "Insurance (Life)": 0.515,
  "Insurance (Prop/Cas.)": 0.438,
  "Investments & Asset Management": 0.489,
  Machinery: 1.022,
  "Metals & Mining": 0.867,
  "Office Equipment & Services": 0.614,
  "Oil/Gas (Integrated)": 0.81,
  "Oil/Gas (Production and Exploration)": 0.806,
  "Oil/Gas Distribution": 0.432,
  "Oilfield Services/Equipment": 0.675,
  "Packaging & Container": 0.555,
  "Paper/Forest Products": 0.506,
  Power: 0.388,
  "Precious Metals": 0.995,
  "Publishing & Newspapers": 0.706,
  "R.E.I.T.": 0.432,
  "Real Estate (Development)": 0.339,
  "Real Estate (General/Diversified)": 0.458,
  "Real Estate (Operations & Services)": 0.489,
  Recreation: 0.835,
  Reinsurance: 0.983,
  "Restaurant/Dining": 0.769,
  "Retail (Automotive)": 0.627,
  "Retail (Building Supply)": 0.822,
  "Retail (Distributors)": 0.554,
  "Retail (General)": 0.986,
  "Retail (Grocery and Food)": 0.561,
  "Retail (REITs)": 0.564,
  "Retail (Special Lines)": 0.883,
  "Rubber& Tires": 0.665,
  Semiconductor: 1.592,
  "Semiconductor Equip": 1.894,
  "Shipbuilding & Marine": 0.607,
  Shoe: 0.697,
  "Software (Entertainment)": 1.219,
  "Software (Internet)": 1.252,
  "Software (System & Application)": 1.264,
  Steel: 0.785,
  "Telecom (Wireless)": 0.604,
  "Telecom. Equipment": 1.064,
  "Telecom. Services": 0.509,
  Tobacco: 0.404,
  Transportation: 0.628,
  "Transportation (Railroads)": 0.581,
  Trucking: 0.662,
  "Utility (General)": 0.391,
  "Utility (Water)": 0.365,
  "Total Market": 0.671,
  "Total Market (without financials)": 0.833,
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
