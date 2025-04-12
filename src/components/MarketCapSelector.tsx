"use client";

import { useEffect } from "react";
import {
  getSizePremium,
  getSizePremiumRanges,
  getSizeCategory,
} from "@/services/size-premium";

interface MarketCapSelectorProps {
  marketCap: number;
  onChange: (sizePremium: number, marketCap?: number) => void;
}

export default function MarketCapSelector({
  marketCap,
  onChange,
}: MarketCapSelectorProps) {
  // Update the size premium when market cap changes
  useEffect(() => {
    if (marketCap) {
      const sizePremium = getSizePremium(marketCap);
      onChange(sizePremium * 100); // Convert decimal to percentage
    }
  }, [marketCap, onChange]);

  const sizePremiumRanges = getSizePremiumRanges();

  const handleMarketCapChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // Get the middle value of the selected range
    const selectedRangeIndex = parseInt(event.target.value);
    const selectedRange = sizePremiumRanges[selectedRangeIndex];

    if (selectedRange) {
      // Use the average value in the range or min if it's infinity
      const avgMarketCap =
        selectedRange.max === Infinity
          ? selectedRange.min + 1000 // Just use min+1000 for the infinity range
          : (selectedRange.min + selectedRange.max) / 2;

      // Get size premium for the selected range
      const sizePremium = selectedRange.premium;

      // Call onChange with both size premium and market cap
      onChange(sizePremium * 100, avgMarketCap); // Convert premium to percentage
    }
  };

  // Find the current range index based on market cap
  const currentRangeIndex = marketCap
    ? sizePremiumRanges.findIndex(
        (range) => marketCap >= range.min && marketCap <= range.max
      )
    : -1;

  return (
    <div className="w-full space-y-2">
      <select
        key={`market-cap-${marketCap}`}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value={currentRangeIndex >= 0 ? currentRangeIndex.toString() : ""}
        onChange={handleMarketCapChange}
      >
        <option value="" disabled>
          Select market capitalization range
        </option>
        {sizePremiumRanges.map((range, index) => {
          const sizePremium = range.premium;
          const category =
            range.min >= 1397 && range.max < 25275
              ? ` (${getSizeCategory(range.min)})`
              : range.min >= 25275
              ? ` (${getSizeCategory(range.min)})`
              : range.max < 1397
              ? ` (${getSizeCategory(range.min)})`
              : "";

          return (
            <option key={index} value={index.toString()}>
              {range.description}
              {category} ({(sizePremium * 100).toFixed(2)}%)
            </option>
          );
        })}
      </select>
    </div>
  );
}
