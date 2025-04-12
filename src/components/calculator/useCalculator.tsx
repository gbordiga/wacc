"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { defaultValues } from "../defaultValues";
import { CompanyType, getSpreadValue } from "@/services/coverage-spread";
import { getRiskFreeRate } from "@/services/risk-free";
import { getMarketRiskPremium } from "@/services/market-risk-premium";
import { getSectorBeta } from "@/services/sector-betas";
import { FormValues } from "../Calculator";

export function useCalculator() {
  const [isLoadingCountryData, setIsLoadingCountryData] = useState(false);

  // ICR calculation
  const [icr, setICR] = useState<number>(
    defaultValues.ebit && defaultValues.interestExpense
      ? defaultValues.ebit / defaultValues.interestExpense
      : 3.33 // Default to 3.33 if values are undefined
  );

  // Define form using React Hook Form without Zod
  const form = useForm<FormValues>({
    defaultValues,
  });

  // Update debt ratio when equity ratio changes and vice versa
  // Note: value is now expected to be in decimal form (0-1) after conversion in the UI
  const updateRatios = (field: "equityRatio" | "debtRatio", value: number) => {
    if (field === "equityRatio") {
      // Store the complement as percentage (0-100) in the form
      form.setValue("debtRatio", formatNumber(100 - value * 100));
    } else {
      // Store the complement as percentage (0-100) in the form
      form.setValue("equityRatio", formatNumber(100 - value * 100));
    }
  };

  const handleCountryChange = (countryCode: string) => {
    form.setValue("country", countryCode);
    // Fetch country-specific data
    fetchCountryData(countryCode);
  };

  const handleSectorChange = (sector: string) => {
    form.setValue("sector", sector);
    // Fetch sector-specific data
    fetchSectorData(sector);
  };

  // Helper function to properly format numbers
  function formatNumber(value: number): number {
    return parseFloat(value.toFixed(2));
  }

  const updateICR = () => {
    const ebit = form.getValues("ebit") || 0;
    const interestExpense = form.getValues("interestExpense") || 1; // Avoid division by zero

    if (ebit && interestExpense) {
      const newICR = formatNumber(ebit / interestExpense);
      setICR(newICR);
      updateCostOfDebt(newICR);
    }
  };

  const updateCostOfDebt = (interestCoverageRatio: number) => {
    try {
      const companyType =
        (form.getValues("companyType") as CompanyType) || "largeNonFinancial";
      const debtRiskFreeRate = form.getValues("debtRiskFreeRate");

      // Use user-provided spread if manual input is preferred,
      // or calculate it from ICR and company type
      const isAutoCalculated = form.getValues("isAutoCalculated");

      let calculatedSpread = 0;

      if (isAutoCalculated) {
        // Calculate spread from ICR and company type
        calculatedSpread = getSpreadValue(companyType, interestCoverageRatio);
        // Update the form with the calculated spread rounded to 2 decimal places
        form.setValue("spreadRate", formatNumber(calculatedSpread));
      }

      // Get the current spread value (either calculated or manually set)
      const currentSpread = form.getValues("spreadRate");

      // Calculate cost of debt: risk-free rate + company risk (spread)
      const costOfDebt = formatNumber(debtRiskFreeRate + currentSpread);

      // Update the form
      form.setValue("costOfDebt", costOfDebt);
    } catch (error) {
      console.error("Error updating cost of debt:", error);
    }
  };

  const fetchCountryData = (country: string): void => {
    try {
      setIsLoadingCountryData(true);
      console.log("Fetching data for country:", country);

      // Get values directly from our services instead of API calls
      const riskFreeRate = getRiskFreeRate(country);
      const marketRiskPremium = getMarketRiskPremium(country);

      console.log("Retrieved values:", { riskFreeRate, marketRiskPremium });

      // Make sure we have valid values before updating the form
      if (riskFreeRate !== undefined) {
        // Ensure riskFreeRate is a number
        const riskFreeRateNum = parseFloat(
          String(riskFreeRate).replace(",", ".")
        );
        const formattedRiskFreeRate = isNaN(riskFreeRateNum)
          ? 0
          : formatNumber(riskFreeRateNum);

        form.setValue("riskFreeRate", formattedRiskFreeRate);

        // Also update the debtRiskFreeRate to match, but user can change it later
        form.setValue("debtRiskFreeRate", formattedRiskFreeRate);
      } else {
        console.warn("Risk-free rate is undefined for country:", country);
        form.setValue("riskFreeRate", 0);
        form.setValue("debtRiskFreeRate", 0);
      }

      if (marketRiskPremium !== undefined) {
        // Ensure marketRiskPremium is a number
        const marketRiskPremiumNum = parseFloat(
          String(marketRiskPremium).replace(",", ".")
        );
        form.setValue(
          "marketRiskPremium",
          isNaN(marketRiskPremiumNum) ? 0 : formatNumber(marketRiskPremiumNum)
        );
      } else {
        console.warn("Market risk premium is undefined for country:", country);
        form.setValue("marketRiskPremium", 0);
      }

      // Update cost of debt with new risk-free rate
      updateCostOfDebt(icr);

      setIsLoadingCountryData(false);
    } catch (error) {
      console.error("Error getting country data:", error);
      toast.error("Failed to get country data. Please try again later.");
      setIsLoadingCountryData(false);
    }
  };

  const fetchSectorData = (sectorName: string) => {
    try {
      const beta = getSectorBeta(sectorName);
      // Ensure beta is a number
      const betaNum = parseFloat(String(beta).replace(",", "."));
      form.setValue("beta", isNaN(betaNum) ? 1.0 : formatNumber(betaNum));
    } catch (error) {
      console.error("Error getting beta data:", error);
      toast.error("Failed to get beta data for the selected sector");
    }
  };

  return {
    form,
    icr,
    updateRatios,
    handleCountryChange,
    handleSectorChange,
    updateICR,
    updateCostOfDebt,
    isLoadingCountryData,
  };
}
