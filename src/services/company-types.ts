// Company types for cost of debt calculation based on interest coverage ratio
export type CompanyType =
  | "largeNonFinancial"
  | "financial"
  | "smallNonFinancial"
  | "utility";

// Company type descriptions with display names for the UI
const COMPANY_TYPE_DISPLAY_NAMES: Record<CompanyType, string> = {
  largeNonFinancial: "Large Non-Financial Company",
  financial: "Financial Company",
  smallNonFinancial: "Small Non-Financial Company",
  utility: "Utility",
};

/**
 * Returns an object mapping company type codes to their display names
 */
export function getCompanyTypes(): Record<CompanyType, string> {
  return COMPANY_TYPE_DISPLAY_NAMES;
}

/**
 * Returns the display name for a given company type
 * @param type The company type code
 * @returns The display name for the company type
 */
export function getCompanyTypeDisplayName(type: CompanyType): string {
  return COMPANY_TYPE_DISPLAY_NAMES[type] || type;
}

/**
 * Returns an array of company types
 * @returns Array of company type objects with code and display name
 */
export function getCompanyTypeOptions(): Array<{
  value: CompanyType;
  label: string;
}> {
  return Object.entries(COMPANY_TYPE_DISPLAY_NAMES).map(([value, label]) => ({
    value: value as CompanyType,
    label,
  }));
}
