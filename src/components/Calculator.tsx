"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { WACCInputs, CalculationResult } from "@/types";
import WACCResults from "./WACCResults";
import { toast } from "sonner";

// Import components directly from their location in workspace
import { useCalculator } from "./calculator/useCalculator";
import { CountrySectorSection } from "./calculator/CountrySectorSection";
import { CapitalStructureSection } from "./calculator/CapitalStructureSection";
import { ICRSection } from "./calculator/ICRSection";
import { CostOfEquitySection } from "./calculator/CostOfEquitySection";
import { CostOfDebtSection } from "./calculator/CostOfDebtSection";

// Define FormValues type directly without Zod
export interface FormValues {
  equityRatio: number;
  debtRatio: number;
  riskFreeRate: number;
  beta: number;
  marketRiskPremium: number;
  additionalRisk: number;
  sizePremium: number;
  marketCap: number;
  costOfDebt: number;
  taxRate: number;
  spreadRate: number;
  debtRiskFreeRate: number;
  ebit?: number;
  interestExpense?: number;
  companyType?: string;
  country: string;
  sector: string;
  taxCountry?: string;
  isAutoCalculated: boolean;
}

// Helper function to ensure values are numbers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ensureNumber(value: any, defaultValue: number = 0): number {
  if (value === undefined || value === null) return defaultValue;

  // If it's already a number, return it
  if (typeof value === "number" && !isNaN(value)) return value;

  // Try to convert string to number, handling comma as decimal separator
  const parsedValue = parseFloat(String(value).replace(",", "."));
  return isNaN(parsedValue) ? defaultValue : parsedValue;
}

export default function Calculator() {
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize the calculator hook with all the logic
  const {
    form,
    icr,
    handleCountryChange,
    handleSectorChange,
    updateICR,
    updateRatios,
  } = useCalculator();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      // Ensure all numeric values are properly converted
      const sanitizedData = {
        ...data,
        equityRatio: ensureNumber(data.equityRatio),
        debtRatio: ensureNumber(data.debtRatio),
        riskFreeRate: ensureNumber(data.riskFreeRate),
        beta: ensureNumber(data.beta, 1.0),
        marketRiskPremium: ensureNumber(data.marketRiskPremium),
        additionalRisk: ensureNumber(data.additionalRisk),
        sizePremium: ensureNumber(data.sizePremium),
        marketCap: ensureNumber(data.marketCap),
        costOfDebt: ensureNumber(data.costOfDebt),
        taxRate: ensureNumber(data.taxRate),
        spreadRate: ensureNumber(data.spreadRate),
        debtRiskFreeRate: ensureNumber(data.debtRiskFreeRate),
        ebit: data.ebit ? ensureNumber(data.ebit) : undefined,
        interestExpense: data.interestExpense
          ? ensureNumber(data.interestExpense)
          : undefined,
      };

      // Convert form data to WACCInputs
      const waccInputs: WACCInputs = {
        ...sanitizedData,
        countryRiskPremium: 0.0,
        isAutoCalculated: true,
      };

      console.log("Submitting WACC calculation with data:", waccInputs);

      // Call the API to calculate WACC
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(waccInputs),
      });

      const result = await response.json();

      if (result.error) {
        console.error(result.error);
        toast.error("Error calculating WACC");
      } else {
        // Ensure numeric values in the result are properly formatted
        if (result.data) {
          result.data.costOfEquity = ensureNumber(result.data.costOfEquity);
          result.data.costOfDebt = ensureNumber(result.data.costOfDebt);
          result.data.wacc = ensureNumber(result.data.wacc);

          if (result.data.inputs) {
            result.data.inputs.marketRiskPremium = ensureNumber(
              result.data.inputs.marketRiskPremium
            );
            result.data.inputs.riskFreeRate = ensureNumber(
              result.data.inputs.riskFreeRate
            );
            result.data.inputs.beta = ensureNumber(
              result.data.inputs.beta,
              1.0
            );
            result.data.inputs.countryRiskPremium = ensureNumber(
              result.data.inputs.countryRiskPremium
            );
            result.data.inputs.additionalRisk = ensureNumber(
              result.data.inputs.additionalRisk
            );
            result.data.inputs.costOfDebt = ensureNumber(
              result.data.inputs.costOfDebt
            );
            result.data.inputs.taxRate = ensureNumber(
              result.data.inputs.taxRate
            );
            result.data.inputs.equityRatio = ensureNumber(
              result.data.inputs.equityRatio
            );
            result.data.inputs.debtRatio = ensureNumber(
              result.data.inputs.debtRatio
            );
          }
        }

        setResults(result.data);
      }
    } catch (error) {
      console.error("Error calculating WACC:", error);
      toast.error("Error calculating WACC");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Country & Sector Selection */}
                <CountrySectorSection
                  form={form}
                  onCountryChange={handleCountryChange}
                  onSectorChange={handleSectorChange}
                />

                {/* Interest Coverage Ratio */}
                <ICRSection form={form} updateICR={updateICR} icr={icr} />

                {/* Capital Structure */}
                <CapitalStructureSection
                  form={form}
                  updateRatios={updateRatios}
                />

                {/* Cost of Equity */}
                <CostOfEquitySection form={form} />

                {/* Cost of Debt */}
                <CostOfDebtSection form={form} updateICR={updateICR} />

                <Button type="submit" disabled={loading}>
                  {loading ? <>Calculating...</> : <>Calculate WACC</>}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>

      {results && <WACCResults result={results} />}
    </div>
  );
}
