"use client"

import { UseFormReturn } from "react-hook-form"
import { Building2, CalendarDays } from "lucide-react"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormValues } from "../Calculator"
import { FieldLabel } from "./FieldLabel"
import { FieldGrid, fieldCellClassName } from "./FieldGrid"
import { FormSection } from "./FormSection"

interface ReportIdentitySectionProps {
  form: UseFormReturn<FormValues>
}

export function ReportIdentitySection({ form }: ReportIdentitySectionProps) {
  return (
    <FormSection
      title="Report"
      description="Company name and as-of date appear on the printed calculation."
      icon={Building2}
    >
      <FieldGrid>
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem className={fieldCellClassName}>
              <FieldLabel icon={Building2}>Company name</FieldLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="e.g. Acme Corporation"
                  autoComplete="organization"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Optional. Used as the title of the printed report.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="asOfDate"
          render={({ field }) => (
            <FormItem className={fieldCellClassName}>
              <FieldLabel icon={CalendarDays}>As-of date</FieldLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>
                Reference date of the inputs used in this calculation.
              </FormDescription>
            </FormItem>
          )}
        />
      </FieldGrid>
    </FormSection>
  )
}
