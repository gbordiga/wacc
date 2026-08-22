"use client"

import { UseFormReturn } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"
import { FormValues } from "../Calculator"
import { Landmark, PieChart, Scale } from "lucide-react"
import { FieldLabel } from "./FieldLabel"
import { FormSection } from "./FormSection"
import { HamadaAlert } from "./HamadaAlert"

interface CapitalStructureSectionProps {
  form: UseFormReturn<FormValues>
  updateRatios: (field: "equityRatio" | "debtRatio", value: number) => void
  icr: number
}

export function CapitalStructureSection({
  form,
  updateRatios,
  icr,
}: CapitalStructureSectionProps) {
  const equityRatio = Math.round(form.watch("equityRatio") || 0)
  const debtRatio = 100 - equityRatio

  function setEquityPercent(percent: number) {
    const nextEquity = Math.min(100, Math.max(0, Math.round(percent)))
    form.setValue("equityRatio", nextEquity)
    updateRatios("equityRatio", nextEquity / 100)
  }

  return (
    <FormSection
      title="Capital Structure"
      description="Drag to set the equity share. Debt is the remainder so the two always sum to 100%."
      icon={PieChart}
    >
      <FormField
        control={form.control}
        name="equityRatio"
        render={() => (
          <FormItem>
            <div className="mb-3 flex items-end justify-between gap-4">
              <div>
                <FieldLabel icon={Scale}>Equity</FieldLabel>
                <p className="text-2xl font-semibold tabular-nums">
                  {equityRatio}%
                </p>
              </div>
              <div className="text-right">
                <p className="flex items-center justify-end gap-1.5 text-sm font-medium">
                  <Landmark className="size-3.5 text-muted-foreground" aria-hidden="true" />
                  Debt
                </p>
                <p className="text-2xl font-semibold tabular-nums text-muted-foreground">
                  {debtRatio}%
                </p>
              </div>
            </div>
            <FormControl>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[equityRatio]}
                onValueChange={([nextEquity]) => setEquityPercent(nextEquity)}
                aria-label="Equity share of capital"
                className="[&_[data-slot=slider-track]]:bg-chart-2 [&_[data-slot=slider-track]]:h-2"
              />
            </FormControl>
            <HamadaAlert
              equityRatio={equityRatio}
              debtRatio={debtRatio}
              icr={icr}
            />
          </FormItem>
        )}
      />
    </FormSection>
  )
}
