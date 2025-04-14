// https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datacurrent.html#discrate

// Beta values by sector (mock data based on typical values)
export const SECTOR_BETAS: Record<string, number> = {
 "Advertising":1.254,
"Aerospace/Defense":1.037,
"Air Transport":1.295,
"Apparel":0.751,
"Auto & Truck":1.529,
"Auto Parts":1.299,
"Bank (Money Center)":0.797,
"Banks (Regional)":0.557,
"Beverage (Alcoholic)":0.864,
"Beverage (Soft)":0.573,
"Broadcasting":1.004,
"Brokerage & Investment Banking":0.909,
"Building Materials":1.026,
"Business & Consumer Services":1.016,
"Cable TV":1.069,
"Chemical (Basic)":1.149,
"Chemical (Diversified)":1.140,
"Chemical (Specialty)":1.049,
"Coal & Related Energy":1.196,
"Computer Services":1.093,
"Computers/Peripherals":1.262,
"Construction Supplies":0.978,
"Diversified":0.889,
"Drugs (Biotechnology)":1.292,
"Drugs (Pharmaceutical)":1.046,
"Education":0.863,
"Electrical Equipment":1.216,
"Electronics (Consumer & Office)":1.210,
"Electronics (General)":1.377,
"Engineering/Construction":0.929,
"Entertainment":1.055,
"Environmental & Waste Services":1.030,
"Farming/Agriculture":0.774,
"Financial Services (Non-bank & Insurance)":0.821,
"Food Processing":0.681,
"Food Wholesalers":0.599,
"Furn/Home Furnishings":0.936,
"Green & Renewable Energy":0.886,
"Healthcare Products":1.146,
"Healthcare Support Services":0.868,
"Healthcare Information and Technology":1.206,
"Homebuilding":1.068,
"Hospitals/Healthcare Facilities":0.774,
"Hotel/Gaming":0.913,
"Household Products":0.880,
"Information Services":1.125,
"Insurance (General)":0.575,
"Insurance (Life)":0.942,
"Insurance (Prop/Cas.)":0.499,
"Investments & Asset Management":0.767,
"Machinery":1.158,
"Metals & Mining":1.121,
"Office Equipment & Services":0.760,
"Oil/Gas (Integrated)":0.932,
"Oil/Gas (Production and Exploration)":1.016,
"Oil/Gas Distribution":0.672,
"Oilfield Services/Equipment":0.953,
"Packaging & Container":0.779,
"Paper/Forest Products":0.866,
"Power":0.703,
"Precious Metals":1.173,
"Publishing & Newspapers":0.834,
"R.E.I.T.":0.787,
"Real Estate (Development)":0.937,
"Real Estate (General/Diversified)":0.945,
"Real Estate (Operations & Services)":0.882,
"Recreation":1.067,
"Reinsurance":1.195,
"Restaurant/Dining":0.924,
"Retail (Automotive)":0.930,
"Retail (Building Supply)":0.977,
"Retail (Distributors)":0.820,
"Retail (General)":1.105,
"Retail (Grocery and Food)":0.775,
"Retail (REITs)":0.975,
"Retail (Special Lines)":1.060,
"Rubber& Tires":0.913,
"Semiconductor":1.678,
"Semiconductor Equip":2.019,
"Shipbuilding & Marine":0.837,
"Shoe":0.766,
"Software (Entertainment)":1.260,
"Software (Internet)":1.370,
"Software (System & Application)":1.322,
"Steel":1.150,
"Telecom (Wireless)":0.897,
"Telecom. Equipment":1.195,
"Telecom. Services":0.855,
"Tobacco":0.499,
"Transportation":0.921,
"Transportation (Railroads)":0.801,
"Trucking":0.852,
"Utility (General)":0.653,
"Utility (Water)":0.667,
"Total Market":1.016,
"Total Market (without financials)":1.048,
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
