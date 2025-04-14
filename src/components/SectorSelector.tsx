"use client";

import { useMemo } from "react";
import { getAllSectorBetas } from "@/services/sector-betas";

interface SectorSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SectorSelector({
  value,
  onChange,
}: SectorSelectorProps) {
  // Get sectors directly from the service using useMemo for better performance
  const sectors = useMemo(() => getAllSectorBetas(), []);

  return (
    <div className="w-full">
      <select
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {sectors.length === 0 ? (
          <option value="">No sectors available</option>
        ) : (
          sectors.map((sector) => (
            <option key={sector.name} value={sector.name}>
              {sector.name} {sector.beta ? `(βU: ${sector.beta})` : ""}
            </option>
          ))
        )}
      </select>
    </div>
  );
}
