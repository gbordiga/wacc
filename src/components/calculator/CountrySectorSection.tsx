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
  const [isManualTaxCountry, setIsManualTaxCountry] = useState(false);
  const currentCountry = form.watch("country");
  const currentTaxCountry = form.watch("taxCountry");

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
      if (!newCountry) return;

      // User has explicitly selected a tax country
      setIsManualTaxCountry(true);
      form.setValue("taxCountry", newCountry);

      // Update tax rate and reset the manual tax rate flag
      form.setValue("taxRate", taxRate * 100); // Convert decimal to percentage
      setIsManualTaxRate(false);
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
    if (!currentCountry || isManualTaxCountry) return;

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
  }, [
    currentCountry,
    taxCountries,
    form,
    handleTaxCountryChange,
    isManualTaxCountry,
  ]);

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

  // Reset manual tax country flag when user explicitly selects the main country
  const handleMainCountryChange = (countryCode: string) => {
    setIsManualTaxCountry(false);
    onCountryChange(countryCode);
  };

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
              <CountrySelector
                value={field.value}
                onChange={handleMainCountryChange}
              />
              <FormDescription>
                Determines risk-free rate and market risk premium (
                <a
                  href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4754347"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Fernandez, 2024
                </a>
                )
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
                Determines the unlevered beta for the calculation (
                <a
                  href="https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datacurrent.html#discrate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Damodaran, January 2025, Global Betas, Effective Tax
                </a>
                )
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
                Determines the marginal tax rate for cost of debt calculation (
                <a
                  href="https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/countrytaxrates.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Damodaran, January 2025
                </a>
                )
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
