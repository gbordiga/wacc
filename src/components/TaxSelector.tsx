"use client"

import { forwardRef, useEffect, useState } from "react"
import {
  findClosestTaxCountry,
  getTaxCountries,
  getTaxRate,
} from "@/services/marginal-tax"
import { SearchableSelect } from "@/components/ui/searchable-select"

interface TaxSelectorProps {
  country: string
  onChange: (taxRate: number, country?: string) => void
}

function resolveTaxCountry(country: string): string {
  if (!country) return ""
  if (getTaxRate(country) !== undefined) return country
  return findClosestTaxCountry(country) ?? ""
}

const TaxSelector = forwardRef<HTMLDivElement, TaxSelectorProps>(
  function TaxSelector({ country, onChange }, ref) {
  const [selectedTaxCountry, setSelectedTaxCountry] = useState(() =>
    resolveTaxCountry(country)
  )

  useEffect(() => {
    const nextCountry = resolveTaxCountry(country)
    if (!nextCountry || nextCountry === selectedTaxCountry) return

    setSelectedTaxCountry(nextCountry)
    const taxRate = getTaxRate(nextCountry)
    if (taxRate === undefined) return
    onChange(taxRate, nextCountry)
  }, [country, onChange, selectedTaxCountry])

  function handleCountryChange(newTaxCountry: string) {
    setSelectedTaxCountry(newTaxCountry)
    const taxRate = getTaxRate(newTaxCountry)
    if (taxRate === undefined) return
    onChange(taxRate, newTaxCountry)
  }

  return (
    <SearchableSelect
      ref={ref}
      value={selectedTaxCountry}
      onChange={handleCountryChange}
      placeholder="Select tax country"
      options={getTaxCountries().map((taxCountry) => {
        const rate = getTaxRate(taxCountry)
        return {
          value: taxCountry,
          label: `${taxCountry} (${((rate ?? 0) * 100).toFixed(1)}%)`,
        }
      })}
    />
    )
  }
)

export default TaxSelector
