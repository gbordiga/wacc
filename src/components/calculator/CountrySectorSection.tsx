"use client";

import { useState, useEffect, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form"
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
import { Building2, ChartColumn, Factory, Globe, Landmark, MapPin } from "lucide-react"
import { SourceLink } from "@/components/SourceLink"
import { FieldLabel } from "./FieldLabel"
import { FormSection } from "./FormSection"
const pairedSectionClassName = "lg:row-span-7 lg:grid lg:grid-rows-subgrid"
const pairedContentClassName = "grid gap-6 lg:row-span-6 lg:grid-rows-subgrid"
const pairedFieldClassName = "lg:row-span-3 lg:grid-rows-subgrid"

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
  const taxCountries = getTaxCountries()
  const [isManualTaxRate, setIsManualTaxRate] = useState(false);
  const [isManualTaxCountry, setIsManualTaxCountry] = useState(false);
  const currentCountry = form.watch("country");
  const taxRate = form.watch("taxRate");

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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <FormSection
        title="Geography"
        description="Tax country follows the selected country unless you override it."
        icon={Globe}
        className={pairedSectionClassName}
        contentClassName={pairedContentClassName}
      >
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className={pairedFieldClassName}>
                <FieldLabel icon={MapPin}>Country</FieldLabel>
                <FormControl>
                  <CountrySelector
                    value={field.value}
                    onChange={handleMainCountryChange}
                  />
                </FormControl>
                <FormDescription>
                  Determines risk-free rate and market risk premium (
                  <SourceLink href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5260463">
                    Fernandez, 2025
                  </SourceLink>
                  )
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxCountry"
            render={({ field }) => (
              <FormItem className={pairedFieldClassName}>
                <FieldLabel icon={Landmark}>Tax Country</FieldLabel>
                <FormControl>
                  <TaxSelector
                    country={field.value || ""}
                    onChange={handleTaxSelectorChange}
                  />
                </FormControl>
                <FormDescription>
                  Determines the marginal tax rate for cost of debt calculation
                  (
                  <SourceLink href="https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/countrytaxrates.html">
                    Damodaran, January 2026
                  </SourceLink>
                  )
                </FormDescription>
              </FormItem>
            )}
          />
      </FormSection>

      <FormSection
        title="Industry and size"
        description="Sector sets the unlevered beta. Size sets the size premium."
        icon={Building2}
        className={pairedSectionClassName}
        contentClassName={pairedContentClassName}
      >
          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <FormItem className={pairedFieldClassName}>
                <FieldLabel icon={Factory}>Industry Sector</FieldLabel>
                <FormControl>
                  <SectorSelector
                    value={field.value}
                    onChange={onSectorChange}
                  />
                </FormControl>
                <FormDescription>
                  Determines the unlevered beta for the calculation (
                  <SourceLink href="https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/BetasGlobal.html">
                    Damodaran, January 2026, Global Betas
                  </SourceLink>
                  )
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="marketCap"
            render={({ field }) => (
              <FormItem className={pairedFieldClassName}>
                <FieldLabel icon={ChartColumn}>Market Capitalization</FieldLabel>
                <FormControl>
                  <MarketCapSelector
                    marketCap={field.value || 0}
                    onChange={handleMarketCapChange}
                  />
                </FormControl>
                <FormDescription>
                  Company size in millions of USD determines the size premium
                  (Kroll, 2025)
                </FormDescription>
              </FormItem>
            )}
          />
      </FormSection>
    </div>
  )
}
