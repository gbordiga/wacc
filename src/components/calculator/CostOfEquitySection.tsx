"use client";

import { useState, useEffect, useRef, type ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormValues } from "../Calculator"
import {
  Activity,
  AlertTriangle,
  ChartColumn,
  LineChart,
  Shield,
  TrendingUp,
} from "lucide-react"
import { SourceLink } from "@/components/SourceLink"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  calculateLeveredBeta,
  calculateUnleveredBeta,
} from "@/lib/financial"
import { FieldLabel } from "./FieldLabel"
import { FieldGrid, fieldCellClassName } from "./FieldGrid"
import { FormSection } from "./FormSection"

interface CostOfEquitySectionProps {
  form: UseFormReturn<FormValues>;
}

function formatNumber(value: number): number {
  return parseFloat(value.toFixed(3))
}

export function CostOfEquitySection({ form }: CostOfEquitySectionProps) {
  const [unleveredBeta, setUnleveredBeta] = useState(() =>
    formatNumber(form.getValues("beta") || 0)
  )
  const [leveredBeta, setLeveredBeta] = useState(() => {
    const values = form.getValues()
    return calculateLeveredBeta(
      values.beta || 0,
      values.debtRatio,
      values.equityRatio,
      values.taxRate
    )
  })
  const ignoreNextBetaSync = useRef(false)

  const [lastManuallySet, setLastManuallySet] = useState<
    "unlevered" | "levered"
  >("unlevered")

  const debtRatio = form.watch("debtRatio")
  const equityRatio = form.watch("equityRatio")
  const taxRate = form.watch("taxRate")
  const beta = form.watch("beta")

  function writeUnlevered(next: number) {
    ignoreNextBetaSync.current = true
    form.setValue("beta", next)
  }

  useEffect(() => {
    if (ignoreNextBetaSync.current) {
      ignoreNextBetaSync.current = false
      return
    }
    if (Math.abs((beta || 0) - unleveredBeta) < 0.0005) return

    setLastManuallySet("unlevered")
    setUnleveredBeta(beta || 0)
    setLeveredBeta(
      calculateLeveredBeta(beta || 0, debtRatio, equityRatio, taxRate)
    )
  }, [beta])

  useEffect(() => {
    if (lastManuallySet === "unlevered") {
      setLeveredBeta(
        calculateLeveredBeta(unleveredBeta, debtRatio, equityRatio, taxRate)
      )
      return
    }

    const nextUnlevered = calculateUnleveredBeta(
      leveredBeta,
      debtRatio,
      equityRatio,
      taxRate
    )
    setUnleveredBeta(nextUnlevered)
    writeUnlevered(nextUnlevered)
  }, [debtRatio, equityRatio, taxRate, lastManuallySet])

  function handleUnleveredBetaChange(value: number) {
    setLastManuallySet("unlevered")
    setUnleveredBeta(value)
    writeUnlevered(value)
    setLeveredBeta(
      calculateLeveredBeta(value, debtRatio, equityRatio, taxRate)
    )
  }

  function handleLeveredBetaChange(value: number) {
    setLastManuallySet("levered")
    setLeveredBeta(value)
    const nextUnlevered = calculateUnleveredBeta(
      value,
      debtRatio,
      equityRatio,
      taxRate
    )
    setUnleveredBeta(nextUnlevered)
    writeUnlevered(nextUnlevered)
  }

  return (
    <FormSection
      title="Cost of Equity"
      description="CAPM inputs. Choose which beta you set; the other is derived from capital structure and tax."
      icon={TrendingUp}
    >
      <FieldGrid className="gap-x-8">
        <RateField
          form={form}
          name="riskFreeRate"
          label="Risk-Free Rate (%)"
          icon={Shield}
          step="0.001"
          description={
            <>
              Rate of return on a default-free investment in the same currency
              and time horizon (
              <SourceLink href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5260463">
                Fernandez, 2025
              </SourceLink>
              )
            </>
          }
        />
        <RateField
          form={form}
          name="marketRiskPremium"
          label="Market Risk Premium (%)"
          icon={LineChart}
          step="0.01"
          description={
            <>
              Excess return of the market over the risk-free rate (
              <SourceLink href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5260463">
                Fernandez, 2025
              </SourceLink>
              )
            </>
          }
        />

        <div className="md:col-span-2 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">Beta</p>
              <p className="text-sm text-muted-foreground">
                Choose which beta you set. The other is derived from capital
                structure and tax.
              </p>
            </div>
            <Tabs
              value={lastManuallySet}
              onValueChange={(value) =>
                setLastManuallySet(value as "unlevered" | "levered")
              }
            >
              <TabsList aria-label="Which beta to set">
                <TabsTrigger value="unlevered">Set unlevered</TabsTrigger>
                <TabsTrigger value="levered">Set levered</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <FieldGrid className="gap-x-8">
            <FormField
              control={form.control}
              name="beta"
              render={() => {
                const isInput = lastManuallySet === "unlevered"
                return (
                  <FormItem className={fieldCellClassName}>
                    <div className="flex items-center justify-between gap-3">
                      <FieldLabel icon={Activity}>Unlevered Beta</FieldLabel>
                      <BetaRole isInput={isInput} />
                    </div>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.001"
                        min="0"
                        readOnly={!isInput}
                        aria-label="Unlevered beta"
                        aria-readonly={!isInput}
                        className={!isInput ? "bg-muted" : undefined}
                        value={formatNumber(unleveredBeta)}
                        onChange={(event) => {
                          if (!isInput) return
                          const value = parseFloat(event.target.value)
                          if (!isNaN(value))
                            handleUnleveredBetaChange(formatNumber(value))
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Business risk without financial leverage effect (
                      <SourceLink href="https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/BetasGlobal.html">
                        Damodaran, January 2026
                      </SourceLink>
                      )
                    </FormDescription>
                  </FormItem>
                )
              }}
            />

            <div className={`grid gap-2 ${fieldCellClassName}`}>
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="levered-beta" className="flex items-center gap-1.5">
                  <Activity className="size-3.5 text-muted-foreground" aria-hidden="true" />
                  Levered Beta
                </Label>
                <BetaRole isInput={lastManuallySet === "levered"} />
              </div>
              <Input
                id="levered-beta"
                type="number"
                step="0.001"
                min="0"
                readOnly={lastManuallySet !== "levered"}
                aria-readonly={lastManuallySet !== "levered"}
                className={
                  lastManuallySet !== "levered" ? "bg-muted" : undefined
                }
                value={formatNumber(leveredBeta)}
                onChange={(event) => {
                  if (lastManuallySet !== "levered") return
                  const value = parseFloat(event.target.value)
                  if (!isNaN(value))
                    handleLeveredBetaChange(formatNumber(value))
                }}
              />
              <p className="text-muted-foreground text-sm">
                Sensitivity including financial leverage effect. βL = βU × [1 +
                (1 − Tax Rate) × (Debt ÷ Equity)] (Hamada, 1972)
              </p>
            </div>
          </FieldGrid>
        </div>

        <RateField
          form={form}
          name="sizePremium"
          label="Size Risk Premium (%)"
          icon={ChartColumn}
          step="0.01"
          description="Additional premium based on company size (Kroll, 2025)"
        />
        <RateField
          form={form}
          name="additionalRisk"
          label="Additional Risk (%)"
          icon={AlertTriangle}
          step="0.01"
          description="Company-specific or other additional risk factors"
        />
      </FieldGrid>
    </FormSection>
  )
}

interface RateFieldProps {
  form: UseFormReturn<FormValues>
  name: "riskFreeRate" | "marketRiskPremium" | "sizePremium" | "additionalRisk"
  label: string
  icon?: LucideIcon
  step: string
  description: ReactNode
}

function BetaRole({ isInput }: { isInput: boolean }) {
  return (
    <span
      className={
        isInput
          ? "text-xs font-medium text-primary"
          : "text-xs text-muted-foreground"
      }
    >
      {isInput ? "Input" : "Calculated"}
    </span>
  )
}

function RateField({ form, name, label, icon, step, description }: RateFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={fieldCellClassName}>
          <FieldLabel icon={icon}>{label}</FieldLabel>
          <FormControl>
            <Input
              type="number"
              step={step}
              min="0"
              value={formatNumber(field.value || 0)}
              onChange={(event) => {
                const value = parseFloat(event.target.value)
                if (!isNaN(value)) field.onChange(formatNumber(value))
              }}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
        </FormItem>
      )}
    />
  )
}
