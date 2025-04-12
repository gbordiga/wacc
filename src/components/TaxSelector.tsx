"use client";

import { useEffect } from "react";
import { getTaxCountries, getTaxRate } from "@/services/marginal-tax";

interface TaxSelectorProps {
  country: string;
  onChange: (taxRate: number, country?: string) => void;
}

export default function TaxSelector({ country, onChange }: TaxSelectorProps) {
  // Update the tax rate when country changes
  useEffect(() => {
    if (country) {
      const taxRate = getTaxRate(country);
      if (taxRate !== undefined) {
        onChange(taxRate);
      }
    }
  }, [country, onChange]);

  const taxCountries = getTaxCountries();

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = event.target.value;
    const taxRate = getTaxRate(newCountry);
    if (taxRate !== undefined) {
      onChange(taxRate, newCountry);
    }
  };

  return (
    <div className="w-full space-y-2">
      <select
        key={`tax-country-${country}`}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value={country || ""}
        onChange={handleCountryChange}
      >
        <option value="" disabled>
          Select tax country
        </option>
        {taxCountries.map((taxCountry) => {
          const rate = getTaxRate(taxCountry);
          return (
            <option key={taxCountry} value={taxCountry}>
              {taxCountry} ({(rate ? rate * 100 : 0).toFixed(1)}%)
            </option>
          );
        })}
      </select>
    </div>
  );
}
