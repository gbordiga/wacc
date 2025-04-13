/**
 * Type definitions for WACC calculator
 */

export interface CountryData {
  id: string;
  name: string;
  code: string;
  region: string;
  riskFreeRate?: number;
  equityRiskPremium?: number;
  marketRiskPremium?: number;
  countryRiskPremium?: number;
  defaultSpread?: number;
  rating?: string;
  lastUpdated?: Date;
}

export interface SectorData {
  id: string;
  name: string;
  beta?: number;
  debtToEquityRatio?: number;
  effectiveTaxRate?: number;
  numberOfFirms?: number;
  region: string;
  lastUpdated?: Date;
}

export interface CalculationResult {
  costOfEquity: number;
  costOfDebt: number;
  wacc: number;
  inputs: WACCInputs;
  timestamp: Date;
  id?: string;
}

export interface SavedScenario {
  id: string;
  name: string;
  description?: string;
  result: CalculationResult;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WACCInputs {
  // Capital structure
  equityRatio: number;
  debtRatio: number;

  // Cost of equity components
  riskFreeRate: number;
  beta: number;
  marketRiskPremium: number;
  countryRiskPremium: number;
  additionalRisk: number;
  sizePremium: number; // Size premium (alfa)
  marketCap: number; // Market capitalization in millions EUR

  // Cost of debt components
  costOfDebt: number; // Pre-tax cost of debt
  debtRiskFreeRate: number; // Risk-free rate for debt
  spreadRate: number; // Debt spread over risk-free rate
  taxRate: number;

  // Metadata
  country: string;
  sector: string;
  taxCountry?: string; // Tax jurisdiction
  isAutoCalculated: boolean;
}

export interface DataSource {
  id: string;
  name: string;
  description: string;
  url?: string;
  lastUpdated?: Date;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  source?: DataSource;
  timestamp: Date;
}

export enum DataProvider {
  DAMODARAN = "damodaran",
  FRED = "fred",
  TRADING_ECONOMICS = "tradingeconomics",
  MANUAL = "manual",
}
