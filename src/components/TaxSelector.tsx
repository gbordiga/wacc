"use client";

import { useEffect, useState } from "react";
import {
  getTaxCountries,
  getTaxRate,
  findClosestTaxCountry,
} from "@/services/marginal-tax";

interface TaxSelectorProps {
  country: string;
  onChange: (taxRate: number, country?: string) => void;
}

export default function TaxSelector({ country, onChange }: TaxSelectorProps) {
  const [selectedTaxCountry, setSelectedTaxCountry] = useState<string>("");

  // Try to find a matching tax country when main country changes
  useEffect(() => {
    if (country) {
      // First try exact match
      const directMatch = getTaxRate(country);
      if (directMatch !== undefined) {
        setSelectedTaxCountry(country);
        onChange(directMatch);
        return;
      }

      // If no exact match, try to find closest match
      const closestCountry = findClosestTaxCountry(country);
      if (closestCountry) {
        const taxRate = getTaxRate(closestCountry);
        if (taxRate !== undefined) {
          setSelectedTaxCountry(closestCountry);
          onChange(taxRate, closestCountry);
        }
      }
    }
  }, [country, onChange]);

  const taxCountries = getTaxCountries();

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTaxCountry = event.target.value;
    setSelectedTaxCountry(newTaxCountry);

    const taxRate = getTaxRate(newTaxCountry);
    if (taxRate !== undefined) {
      onChange(taxRate, newTaxCountry);
    }
  };

  return (
    <div className="w-full space-y-2">
      <select
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value={selectedTaxCountry || ""}
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
