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
import { PieChart } from "lucide-react";

interface CapitalStructureSectionProps {
  form: UseFormReturn<FormValues>;
  updateRatios: (field: "equityRatio" | "debtRatio", value: number) => void;
}

// Helper function to properly format numbers
function formatNumber(value: number): number {
  return parseFloat(value.toFixed(2));
}

export function CapitalStructureSection({
  form,
  updateRatios,
}: CapitalStructureSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
        <PieChart className="h-5 w-5" />
        Capital Structure
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="equityRatio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equity Ratio (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      const percentValue = formatNumber(value);
                      field.onChange(percentValue);
                      // Convert percent to ratio for internal calculations
                      updateRatios("equityRatio", percentValue / 100);
                    }
                  }}
                  // Display as percentage (0-100)
                  value={formatNumber(field.value || 0)}
                />
              </FormControl>
              <FormDescription>
                Percentage of financing through equity
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="debtRatio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Debt Ratio (%)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      const percentValue = formatNumber(value);
                      field.onChange(percentValue);
                      // Convert percent to ratio for internal calculations
                      updateRatios("debtRatio", percentValue / 100);
                    }
                  }}
                  // Display as percentage (0-100)
                  value={formatNumber(field.value || 0)}
                />
              </FormControl>
              <FormDescription>
                Percentage of financing through debt
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
