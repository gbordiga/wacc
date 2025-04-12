"use client";

import { useMemo } from "react";
import { CountryData } from "@/types";
import { COUNTRIES } from "@/services/countries";

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CountrySelector({
  value,
  onChange,
}: CountrySelectorProps) {
  // Create a list of CountryData objects from the static COUNTRIES array
  const countries = useMemo(() => {
    return COUNTRIES.map(
      (countryName) =>
        ({
          id: countryName.toLowerCase().replace(/\s+/g, "_"),
          name: countryName,
          code: countryName, // Use the full country name as the code
          region: "Global",
        } as CountryData)
    );
  }, []);

  return (
    <div className="w-full">
      <select
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {countries.length === 0 ? (
          <option value="">No countries available</option>
        ) : (
          countries.map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
}
