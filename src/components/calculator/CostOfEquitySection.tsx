"use client";

import { useState, useEffect, useRef } from "react";
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
import { Percent, Lock, Unlock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CostOfEquitySectionProps {
  form: UseFormReturn<FormValues>;
}

// Helper function to properly format numbers
function formatNumber(value: number): number {
  return parseFloat(value.toFixed(3));
}

// Calculate levered beta from unlevered beta
function calculateLeveredBeta(
  unleveredBeta: number,
  debtRatio: number,
  equityRatio: number,
  taxRate: number
): number {
  if (equityRatio === 0) return unleveredBeta; // Avoid division by zero
  // Convert from percentage to decimal for tax rate and ratio between debt and equity
  const taxAdjustedDebtToEquity =
    (1 - taxRate / 100) * (debtRatio / equityRatio);
  return formatNumber(unleveredBeta * (1 + taxAdjustedDebtToEquity));
}

// Calculate unlevered beta from levered beta
function calculateUnleveredBeta(
  leveredBeta: number,
  debtRatio: number,
  equityRatio: number,
  taxRate: number
): number {
  if (debtRatio === 0) return leveredBeta; // If no debt, levered = unlevered
  const taxAdjustedDebtToEquity =
    (1 - taxRate / 100) * (debtRatio / equityRatio);
  return formatNumber(leveredBeta / (1 + taxAdjustedDebtToEquity));
}

export function CostOfEquitySection({ form }: CostOfEquitySectionProps) {
  const [betaMode, setBetaMode] = useState<"unlevered" | "levered">(
    "unlevered"
  );
  const [unleveredBeta, setUnleveredBeta] = useState<number>(0);
  const [leveredBeta, setLeveredBeta] = useState<number>(0);
  const isUpdating = useRef(false);
  const isInitialized = useRef(false);
  const prevBetaMode = useRef<"unlevered" | "levered">("unlevered");

  // Watch for changes in capital structure and tax rate
  const debtRatio = form.watch("debtRatio");
  const equityRatio = form.watch("equityRatio");
  const taxRate = form.watch("taxRate");
  const beta = form.watch("beta");

  // Initialize component on first render
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Set initial values from the form's beta, which should be unlevered
    setUnleveredBeta(beta || 0);
    if (equityRatio > 0) {
      setLeveredBeta(
        calculateLeveredBeta(beta || 0, debtRatio, equityRatio, taxRate)
      );
    }
  }, [beta, debtRatio, equityRatio, taxRate]);

  // Track beta changes and update both values
  useEffect(() => {
    if (isUpdating.current) return;
    if (!isInitialized.current) return; // Skip until initialized
    isUpdating.current = true;

    try {
      // The form's beta is always the unlevered beta
      setUnleveredBeta(beta || 0);
      if (equityRatio > 0) {
        setLeveredBeta(
          calculateLeveredBeta(beta || 0, debtRatio, equityRatio, taxRate)
        );
      }
    } finally {
      isUpdating.current = false;
    }
  }, [beta, debtRatio, equityRatio, taxRate]);

  // Recalculate when capital structure or tax rate changes
  useEffect(() => {
    if (isUpdating.current) return;
    if (equityRatio === 0) return; // Avoid division by zero
    if (!isInitialized.current) return; // Skip until initialized

    isUpdating.current = true;
    try {
      // Always recalculate the levered beta from the unlevered beta
      const newLeveredBeta = calculateLeveredBeta(
        unleveredBeta,
        debtRatio,
        equityRatio,
        taxRate
      );
      setLeveredBeta(newLeveredBeta);
    } finally {
      isUpdating.current = false;
    }
  }, [debtRatio, equityRatio, taxRate, unleveredBeta]);

  // Handle unlevered beta change
  const handleUnleveredBetaChange = (value: number) => {
    if (isUpdating.current) return;
    isUpdating.current = true;

    try {
      // Set the unlevered beta directly
      setUnleveredBeta(value);
      form.setValue("beta", value);

      // Calculate the corresponding levered beta
      if (equityRatio > 0) {
        const newLeveredBeta = calculateLeveredBeta(
          value,
          debtRatio,
          equityRatio,
          taxRate
        );
        setLeveredBeta(newLeveredBeta);
      }
    } finally {
      isUpdating.current = false;
    }
  };

  // Handle levered beta change
  const handleLeveredBetaChange = (value: number) => {
    if (isUpdating.current) return;
    isUpdating.current = true;

    try {
      // Set the levered beta directly
      setLeveredBeta(value);

      // Calculate the corresponding unlevered beta
      if (equityRatio > 0) {
        const newUnleveredBeta = calculateUnleveredBeta(
          value,
          debtRatio,
          equityRatio,
          taxRate
        );
        setUnleveredBeta(newUnleveredBeta);
        // Always use unlevered beta for the form
        form.setValue("beta", newUnleveredBeta);
      }
    } finally {
      isUpdating.current = false;
    }
  };

  // Handle tab change - preserve all values, just change the UI state
  const handleTabChange = (value: "unlevered" | "levered") => {
    prevBetaMode.current = betaMode;
    setBetaMode(value);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
        <Percent className="h-5 w-5" />
        Cost of Equity Parameters
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

        <div className="space-y-2">
          <FormLabel>Beta</FormLabel>
          <Tabs
            defaultValue={betaMode}
            onValueChange={(v) => handleTabChange(v as "unlevered" | "levered")}
            className="w-full"
          >
            <TabsList className="w-full mb-2">
              <TabsTrigger value="unlevered" className="flex-1">
                Unlevered Beta
              </TabsTrigger>
              <TabsTrigger value="levered" className="flex-1">
                Levered Beta
              </TabsTrigger>
            </TabsList>
            <TabsContent value="unlevered" className="mt-0">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  step="0.001"
                  min="0"
                  value={formatNumber(unleveredBeta)}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      handleUnleveredBetaChange(formatNumber(value));
                    }
                  }}
                />
                <Unlock className="h-4 w-4 text-gray-500" />
              </div>
              <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                <Lock className="h-3 w-3" />
                <span>Levered: {formatNumber(leveredBeta)}</span>
              </div>
              <div className="mt-2 text-xs text-gray-500 italic">
                βL = βU × [1 + (1 - Tax Rate) × (Debt ÷ Equity)]
              </div>
            </TabsContent>
            <TabsContent value="levered" className="mt-0">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  step="0.001"
                  min="0"
                  value={formatNumber(leveredBeta)}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                      handleLeveredBetaChange(formatNumber(value));
                    }
                  }}
                />
                <Unlock className="h-4 w-4 text-gray-500" />
              </div>
              <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                <Lock className="h-3 w-3" />
                <span>Unlevered: {formatNumber(unleveredBeta)}</span>
              </div>
              <div className="mt-2 text-xs text-gray-500 italic">
                βU = βL ÷ [1 + (1 - Tax Rate) × (Debt ÷ Equity)]
              </div>
            </TabsContent>
          </Tabs>
          <FormDescription>
            {betaMode === "unlevered"
              ? "Business risk without financial leverage effect"
              : "Sensitivity including financial leverage effect"}
          </FormDescription>
        </div>

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
