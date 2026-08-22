"use client";
import { FormValues } from "./Calculator";

function todayISO() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${now.getFullYear()}-${month}-${day}`
}

export const defaultValues: FormValues = {
  companyName: "",
  asOfDate: todayISO(),
  equityRatio: 40,
  debtRatio: 60,
  riskFreeRate: 4.1,
  beta: 1.297,
  marketRiskPremium: 5.5,
  additionalRisk: 0.0,
  sizePremium: 0.74,
  marketCap: 5000, // Default to mid cap ($5 billion)
  costOfDebt: 0.058,
  taxRate: 25.63,
  spreadRate: 0.89,
  debtRiskFreeRate: 4.1,
  ebit: 500000,
  interestExpense: 150000,
  companyType: "largeNonFinancial",
  country: "USA",
  sector: "Software (System & Application)",
  taxCountry: "United States of America",
  isAutoCalculated: true,
};
