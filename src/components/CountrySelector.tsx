"use client"

import { forwardRef } from "react"
import { COUNTRIES } from "@/services/countries"
import { SearchableSelect } from "@/components/ui/searchable-select"

interface CountrySelectorProps {
  value: string
  onChange: (value: string) => void
}

const CountrySelector = forwardRef<HTMLDivElement, CountrySelectorProps>(
  function CountrySelector({ value, onChange }, ref) {
    return (
      <SearchableSelect
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder="Select country"
        options={COUNTRIES.map((countryName) => ({
          value: countryName,
          label: countryName,
        }))}
      />
    )
  }
)

export default CountrySelector
