"use client";

import { UseFormReturn, useWatch } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { FormValues } from "../Calculator"
import { Input } from "../ui/input"
import { useEffect } from "react"
import { HandCoins, Landmark, Plus, Shield } from "lucide-react"
import { FieldLabel } from "./FieldLabel"
import { FieldGrid, fieldCellClassName } from "./FieldGrid"
import { FormSection } from "./FormSection"

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

    // Check if spreadRate has been manually changed
    const spreadRateState = form.getFieldState("spreadRate");

    // Update cost of debt whenever risk-free rate changes, but only if spreadRate hasn't been manually modified
    if (!spreadRateState.isDirty) {
      updateICR();
    } else {
      // If spreadRate was manually set, just update costOfDebt directly without recalculating the spread
      const spreadRate = form.getValues("spreadRate") || 0;
      const debtRiskFreeRate = form.getValues("debtRiskFreeRate") || 0;
      const newCostOfDebt = formatNumber(debtRiskFreeRate + spreadRate);
      form.setValue("costOfDebt", newCostOfDebt);
    }
  }, [riskFreeRate, form, updateICR]);

  // Run updateICR when any of the watched values change
  useEffect(() => {
    if (form.getValues("isAutoCalculated")) {
      // Check if spreadRate has been manually changed
      const spreadRateState = form.getFieldState("spreadRate");

      // Only update ICR if spreadRate hasn't been manually modified
      if (!spreadRateState.isDirty) {
        updateICR();
      }
    }
  }, [ebit, interestExpense, companyType, updateICR, form]);

  return (
    <FormSection
      title="Cost of Debt"
      description="Pre-tax cost of debt and the tax shield on interest."
      icon={HandCoins}
    >
      <FieldGrid>
        <FormField
          control={form.control}
          name="debtRiskFreeRate"
          render={({ field }) => (
            <FormItem className={fieldCellClassName}>
              <FieldLabel icon={Shield}>Risk-Free Rate for Debt (%)</FieldLabel>
              <FormControl>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formatNumber(field.value || 0)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    const roundedValue = formatNumber(value);
                    field.onChange(roundedValue);
                    const spreadRate = form.getValues("spreadRate");
                    form.setValue(
                      "costOfDebt",
                      formatNumber(roundedValue + spreadRate)
                    );
                  }
                }}
              />
              </FormControl>
              <FormDescription>
                Country-specific base rate for debt calculations (Fernandez,
                2025)
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="spreadRate"
          render={({ field }) => (
            <FormItem className={fieldCellClassName}>
              <FieldLabel icon={Plus}>Debt Spread (%)</FieldLabel>
              <FormControl>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formatNumber(field.value || 0)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    const roundedValue = formatNumber(value);
                    field.onChange(roundedValue);
                    const debtRiskFreeRate = form.getValues("debtRiskFreeRate");
                    form.setValue(
                      "costOfDebt",
                      formatNumber(debtRiskFreeRate + roundedValue)
                    );
                  }
                }}
              />
              </FormControl>
              <FormDescription>
                Additional yield over the risk-free rate (Damodaran, January
                2026)
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxRate"
          render={({ field }) => (
            <FormItem className={fieldCellClassName}>
              <FieldLabel icon={Landmark}>Marginal Tax Rate (%)</FieldLabel>
              <FormControl>
              <Input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formatNumber(field.value || 0)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    field.onChange(formatNumber(value));
                  }
                }}
              />
              </FormControl>
              <FormDescription>
                Marginal tax rate for the jurisdiction (Damodaran, January 2026)
              </FormDescription>
            </FormItem>
          )}
        />
      </FieldGrid>
    </FormSection>
  )
}
