"use client";

import { useState, useEffect, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import CountrySelector from "../CountrySelector";
import SectorSelector from "../SectorSelector";
import TaxSelector from "../TaxSelector";
import MarketCapSelector from "../MarketCapSelector";
import { FormValues } from "../Calculator";
import {
  getTaxRate,
  getTaxCountries,
  findClosestTaxCountry,
} from "@/services/marginal-tax";
import { Globe } from "lucide-react";

interface CountrySectorSectionProps {
  form: UseFormReturn<FormValues>;
  onCountryChange: (countryCode: string) => void;
  onSectorChange: (sector: string) => void;
}

export function CountrySectorSection({
  form,
  onCountryChange,
  onSectorChange,
}: CountrySectorSectionProps) {
  const [taxCountries, setTaxCountries] = useState<string[]>([]);
  const [isManualTaxRate, setIsManualTaxRate] = useState(false);
  const currentCountry = form.watch("country");

  // Watch for changes to taxRate to detect manual edits
  const taxRate = form.watch("taxRate");

  // Initialize tax countries
  useEffect(() => {
    setTaxCountries(getTaxCountries());
  }, []);

  // Update tax rate when tax country changes
  const handleTaxCountryChange = useCallback(
    (country: string) => {
      const taxRate = getTaxRate(country);
      if (country && taxRate !== undefined && !isManualTaxRate) {
        // Only update tax rate if it hasn't been manually changed
        // Convert from decimal to percentage format (e.g., 0.25 to 25)
        form.setValue("taxRate", taxRate * 100);
        form.setValue("taxCountry", country);
      } else if (country) {
        // Always update the tax country even if we don't change the tax rate
        form.setValue("taxCountry", country);
      }
    },
    [form, isManualTaxRate]
  );

  // Reset manual flag when tax country is explicitly selected
  const handleTaxSelectorChange = useCallback(
    (taxRate: number, newCountry?: string) => {
      // Update both the tax country and tax rate
      if (newCountry) {
        form.setValue("taxCountry", newCountry);
        // When user explicitly selects a tax country in the tax selector,
        // we should update the tax rate and reset the manual flag
        form.setValue("taxRate", taxRate * 100); // Convert decimal to percentage
        setIsManualTaxRate(false);
      }
    },
    [form]
  );

  // Handle market cap change and update size premium
  const handleMarketCapChange = useCallback(
    (sizePremium: number, marketCap?: number) => {
      // Update both size premium and market cap
      form.setValue("sizePremium", sizePremium);
      if (marketCap !== undefined) {
        form.setValue("marketCap", marketCap);
      }
    },
    [form]
  );

  // Try to find and set the tax rate when the main country changes
  useEffect(() => {
    if (!currentCountry) return;

    // First try direct match
    if (taxCountries.includes(currentCountry)) {
      handleTaxCountryChange(currentCountry);
      return;
    }

    // Try to find closest match
    const closestMatch = findClosestTaxCountry(currentCountry);
    if (closestMatch) {
      form.setValue("taxCountry", closestMatch);
      handleTaxCountryChange(closestMatch);
    }
  }, [currentCountry, taxCountries, form, handleTaxCountryChange]);

  // Detect manual changes to tax rate
  useEffect(() => {
    const taxCountry = form.getValues("taxCountry");
    if (!taxCountry) return;

    const taxRateFromCountry = getTaxRate(taxCountry);
    if (taxRateFromCountry === undefined) return;

    const expectedTaxRate = taxRateFromCountry * 100;

    // If tax rate doesn't match what would be set by the country,
    // assume it was manually changed
    if (Math.abs(taxRate - expectedTaxRate) > 0.01) {
      setIsManualTaxRate(true);
    }
  }, [taxRate, form]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
        <Globe className="h-5 w-5" />
        Country and Sector
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <CountrySelector value={field.value} onChange={onCountryChange} />
              <FormDescription>
                Determines risk-free rate and market risk premium (Fernandez,
                2024)
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sector"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry Sector</FormLabel>
              <SectorSelector value={field.value} onChange={onSectorChange} />
              <FormDescription>
                Determines the beta for the calculation (Damodaran, January
                2025)
              </FormDescription>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="taxCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Country</FormLabel>
              <TaxSelector
                country={field.value || ""}
                onChange={handleTaxSelectorChange}
              />
              <FormDescription>
                Determines the marginal tax rate for cost of debt calculation
                (Damodaran, January 2025)
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="marketCap"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Market Capitalization</FormLabel>
              <MarketCapSelector
                marketCap={field.value || 0}
                onChange={handleMarketCapChange}
              />
              <FormDescription>
                Company size in millions of USD determines the size premium
                (Duff & Phelps, 2023)
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
