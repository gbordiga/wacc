"use client";
import { FormValues } from "./Calculator";

export const defaultValues: FormValues = {
  equityRatio: 70,
  debtRatio: 30,
  riskFreeRate: 0.038,
  beta: 1.2,
  marketRiskPremium: 0.058,
  additionalRisk: 0.0,
  sizePremium: 0.0,
  marketCap: 5000, // Default to large cap (€5 billion)
  costOfDebt: 0.058,
  taxRate: 21.0,
  spreadRate: 0.02,
  debtRiskFreeRate: 0.038,
  ebit: 500000,
  interestExpense: 150000,
  companyType: "largeNonFinancial",
  country: "USA",
  sector: "Software (System & Application)",
  taxCountry: "United States of America",
  isAutoCalculated: true,
};
