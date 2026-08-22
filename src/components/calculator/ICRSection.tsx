"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getCompanyTypes } from "@/services/coverage-spread"
import { formatGroupedInteger } from "@/utils/format"
import { FormValues } from "../Calculator"
import { Briefcase, CircleDollarSign, Ratio, Receipt } from "lucide-react"
import { SourceLink } from "@/components/SourceLink"
import { FieldLabel } from "./FieldLabel"
import { FieldGrid, fieldCellClassName } from "./FieldGrid"
import { FormSection } from "./FormSection"

interface ICRSectionProps {
  form: UseFormReturn<FormValues>;
  updateICR: () => void;
  icr: number;
}

export function ICRSection({ form, updateICR, icr }: ICRSectionProps) {
  return (
    <FormSection
      title="Interest Coverage Ratio"
      description={
        <>
          Sets the debt spread.{" "}
          <SourceLink href="https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ratings.html">
            Damodaran, 2026
          </SourceLink>
        </>
      }
      icon={Ratio}
      action={
        <div className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm">
          <span className="text-muted-foreground">Current ICR</span>
          <span className="font-semibold tabular-nums">
            {icr === Infinity ? "∞" : icr.toFixed(2)}
          </span>
        </div>
      }
    >
      <FieldGrid columns={3}>
        <FormField
          control={form.control}
          name="ebit"
          render={({ field }) => (
            <FormItem className={fieldCellClassName}>
              <FieldLabel icon={CircleDollarSign}>EBIT</FieldLabel>
              <div className="relative">
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                >
                  $
                </span>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    className="pl-6"
                    value={field.value ? formatGroupedInteger(field.value) : ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9]/g, "")
                      const value = rawValue ? parseInt(rawValue, 10) : ""
                      field.onChange(value)
                      if (value) setTimeout(updateICR, 0)
                    }}
                  />
                </FormControl>
              </div>
              <FormDescription>
                Earnings Before Interest and Taxes
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interestExpense"
          render={({ field }) => (
            <FormItem className={fieldCellClassName}>
              <FieldLabel icon={Receipt}>Interest Expense</FieldLabel>
              <div className="relative">
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                >
                  $
                </span>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    className="pl-6"
                    value={field.value ? formatGroupedInteger(field.value) : ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9]/g, "")
                      const value = rawValue ? parseInt(rawValue, 10) : ""
                      field.onChange(value)
                      if (value) setTimeout(updateICR, 0)
                    }}
                  />
                </FormControl>
              </div>
              <FormDescription>Annual interest payment</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyType"
          render={({ field }) => (
            <FormItem className={fieldCellClassName}>
              <FieldLabel icon={Briefcase}>Company Type</FieldLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setTimeout(updateICR, 0);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getCompanyTypes().map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "largeNonFinancial"
                        ? "Large Non-Financial"
                        : type === "financial"
                        ? "Financial"
                        : type === "utility"
                        ? "Utility / Infrastructure"
                        : "Small Risky Non-Financial"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Determines debt rating thresholds
              </FormDescription>
            </FormItem>
          )}
        />
      </FieldGrid>
    </FormSection>
  )
}
