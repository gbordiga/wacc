"use client"

import { forwardRef } from "react"
import { getAllSectorBetas } from "@/services/sector-betas"
import { SearchableSelect } from "@/components/ui/searchable-select"

interface SectorSelectorProps {
  value: string
  onChange: (value: string) => void
}

const SectorSelector = forwardRef<HTMLDivElement, SectorSelectorProps>(
  function SectorSelector({ value, onChange }, ref) {
    return (
      <SearchableSelect
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder="Select industry sector"
        options={getAllSectorBetas().map((sector) => ({
          value: sector.name,
          label: sector.beta
            ? `${sector.name} (βU: ${sector.beta})`
            : sector.name,
        }))}
      />
    )
  }
)

export default SectorSelector
