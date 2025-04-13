"use client";
import { FormValues } from "./Calculator";

export const defaultValues: FormValues = {
  equityRatio: 40,
  debtRatio: 60,
  riskFreeRate: 4.1,
  beta: 1.2,
  marketRiskPremium: 5.5,
  additionalRisk: 0.0,
  sizePremium: 0.75,
  marketCap: 5000, // Default to large cap (€5 billion)
  costOfDebt: 0.058,
  taxRate: 21.0,
  spreadRate: 0.95,
  debtRiskFreeRate: 4.1,
  ebit: 500000,
  interestExpense: 150000,
  companyType: "largeNonFinancial",
  country: "USA",
  sector: "Software (System & Application)",
  taxCountry: "United States of America",
  isAutoCalculated: true,
};
