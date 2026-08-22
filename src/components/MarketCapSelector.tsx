"use client"

import { forwardRef } from "react"
import {
  getSizeCategory,
  getSizePremiumRanges,
} from "@/services/size-premium"
import { SearchableSelect } from "@/components/ui/searchable-select"

interface MarketCapSelectorProps {
  marketCap: number
  onChange: (sizePremium: number, marketCap?: number) => void
}

const MarketCapSelector = forwardRef<HTMLDivElement, MarketCapSelectorProps>(
  function MarketCapSelector({ marketCap, onChange }, ref) {
  const sizePremiumRanges = getSizePremiumRanges()
  const currentRangeIndex = sizePremiumRanges.findIndex(
    (range) => marketCap >= range.min && marketCap <= range.max
  )

  function handleMarketCapChange(nextIndex: string) {
    const selectedRange = sizePremiumRanges[parseInt(nextIndex, 10)]
    if (!selectedRange) return

    const avgMarketCap =
      selectedRange.max === Infinity
        ? selectedRange.min + 1000
        : (selectedRange.min + selectedRange.max) / 2

    onChange(selectedRange.premium * 100, avgMarketCap)
  }

  return (
    <SearchableSelect
      ref={ref}
      value={currentRangeIndex >= 0 ? currentRangeIndex.toString() : ""}
      onChange={handleMarketCapChange}
      placeholder="Select market capitalization range"
      options={sizePremiumRanges.map((range, index) => ({
        value: index.toString(),
        label: `${range.description} (${getSizeCategory(range.min)}) (${(
          range.premium * 100
        ).toFixed(2)}%)`,
      }))}
    />
    )
  }
)

export default MarketCapSelector
