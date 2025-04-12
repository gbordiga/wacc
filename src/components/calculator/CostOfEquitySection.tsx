"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormValues } from "../Calculator";
import { Percent } from "lucide-react";

interface CostOfEquitySectionProps {
  form: UseFormReturn<FormValues>;
}

// Helper function to properly format numbers
function formatNumber(value: number): number {
  return parseFloat(value.toFixed(2));
}

export function CostOfEquitySection({ form }: CostOfEquitySectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
        <Percent className="h-5 w-5" />
        Cost of Equity Components
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="riskFreeRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Risk-Free Rate (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
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
                Rate of return on a default-free investment in the same currency
                and time horizon
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="beta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beta</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
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
                Sensitivity of the sector to market movements
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="marketRiskPremium"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Market Risk Premium (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
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
                Excess return of the market over the risk-free rate
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sizePremium"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size Risk Premium (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
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
                Additional premium based on company size
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalRisk"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Risk (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
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
                Company-specific or other additional risk factors
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
