"use client";

import { UseFormReturn, useWatch } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FormValues } from "../Calculator";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { Percent } from "lucide-react";

interface CostOfDebtSectionProps {
  form: UseFormReturn<FormValues>;
  updateICR: () => void;
}

// Helper function to properly format numbers
function formatNumber(value: number): number {
  return parseFloat(value.toFixed(2));
}

export function CostOfDebtSection({ form, updateICR }: CostOfDebtSectionProps) {
  // Set auto-calculate to always be true since we removed the toggle
  useEffect(() => {
    form.setValue("isAutoCalculated", true);
  }, [form]);

  // Watch for changes to EBIT, interestExpense, and companyType to update spread rate
  const ebit = useWatch({ control: form.control, name: "ebit" });
  const interestExpense = useWatch({
    control: form.control,
    name: "interestExpense",
  });
  const companyType = useWatch({ control: form.control, name: "companyType" });

  // Watch for changes to riskFreeRate to update debtRiskFreeRate
  const riskFreeRate = useWatch({
    control: form.control,
    name: "riskFreeRate",
  });

  // Sync debtRiskFreeRate with riskFreeRate initially and when riskFreeRate changes
  useEffect(() => {
    // Only update if debtRiskFreeRate hasn't been manually changed
    const currentDebtRiskFreeRate = form.getValues("debtRiskFreeRate");
    const formattedRiskFreeRate = formatNumber(riskFreeRate || 0);

    if (
      currentDebtRiskFreeRate === undefined ||
      currentDebtRiskFreeRate === null
    ) {
      form.setValue("debtRiskFreeRate", formattedRiskFreeRate);
    }

    // Update cost of debt whenever risk-free rate changes
    updateICR();
  }, [riskFreeRate, form, updateICR]);

  // Run updateICR when any of the watched values change
  useEffect(() => {
    if (form.getValues("isAutoCalculated")) {
      updateICR();
    }
  }, [ebit, interestExpense, companyType, updateICR, form]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
        <Percent className="h-5 w-5" />
        Cost of Debt Parameters
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <FormField
          control={form.control}
          name="debtRiskFreeRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Risk-Free Rate for Debt (%)</FormLabel>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formatNumber(field.value || 0)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    // Round to 2 decimal places
                    const roundedValue = formatNumber(value);
                    field.onChange(roundedValue);

                    // Update cost of debt when risk-free rate changes
                    const spreadRate = form.getValues("spreadRate");
                    const newCostOfDebt = formatNumber(
                      roundedValue + spreadRate
                    );
                    form.setValue("costOfDebt", newCostOfDebt);
                  }
                }}
                id={field.name}
                placeholder="Enter risk-free rate for debt"
              />
              <FormDescription>
                Country-specific base rate for debt calculations
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="spreadRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Debt Spread (%)</FormLabel>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formatNumber(field.value || 0)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    // Round to 2 decimal places
                    const roundedValue = formatNumber(value);
                    field.onChange(roundedValue);

                    // Update cost of debt when spread changes
                    const debtRiskFreeRate = form.getValues("debtRiskFreeRate");
                    const newCostOfDebt = formatNumber(
                      debtRiskFreeRate + roundedValue
                    );
                    form.setValue("costOfDebt", newCostOfDebt);
                  }
                }}
                id={field.name}
                placeholder="Enter debt spread percentage"
              />
              <FormDescription>
                Additional yield over the risk-free rate (debt premium)
              </FormDescription>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="taxRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marginal Tax Rate (%)</FormLabel>
              <Input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formatNumber(field.value || 0)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    // Round to 2 decimal places
                    const roundedValue = formatNumber(value);
                    field.onChange(roundedValue);
                  }
                }}
                id={field.name}
                placeholder="Enter tax rate percentage"
              />
              <FormDescription>
                Marginal tax rate for the jurisdiction
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
