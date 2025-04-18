"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCompanyTypes } from "@/services/coverage-spread";
import { FormValues } from "../Calculator";
import { Calculator } from "lucide-react";

interface ICRSectionProps {
  form: UseFormReturn<FormValues>;
  updateICR: () => void;
  icr: number;
}

export function ICRSection({ form, updateICR, icr }: ICRSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Interest Coverage Ratio (ICR)
        </div>
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Determines the debt spread premium (
        <a
          href="https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ratings.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Damodaran, January 2025
        </a>
        )
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="ebit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>EBIT</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="text"
                    className="pl-6"
                    value={
                      field.value
                        ? field.value.toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                            useGrouping: true,
                          })
                        : ""
                    }
                    onChange={(e) => {
                      // Remove all non-numeric characters for processing
                      const rawValue = e.target.value.replace(/[^0-9]/g, "");

                      // Convert to number or use empty string if backspaced to nothing
                      const value = rawValue ? parseInt(rawValue, 10) : "";

                      // Update the form
                      field.onChange(value);

                      // Trigger ICR calculation if we have a value
                      if (value) {
                        setTimeout(updateICR, 0);
                      }
                    }}
                  />
                </div>
              </FormControl>
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
            <FormItem>
              <FormLabel>Interest Expense</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="text"
                    className="pl-6"
                    value={
                      field.value
                        ? field.value.toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                            useGrouping: true,
                          })
                        : ""
                    }
                    onChange={(e) => {
                      // Remove all non-numeric characters for processing
                      const rawValue = e.target.value.replace(/[^0-9]/g, "");

                      // Convert to number or use empty string if backspaced to nothing
                      const value = rawValue ? parseInt(rawValue, 10) : "";

                      // Update the form
                      field.onChange(value);

                      // Trigger ICR calculation if we have a value
                      if (value) {
                        setTimeout(updateICR, 0);
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>Annual interest payment</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Type</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setTimeout(updateICR, 0);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
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
      </div>
      <div className="mt-2 text-sm">
        <span className="font-medium">Current ICR:</span>{" "}
        {icr === Infinity ? "∞" : icr.toFixed(2)}
      </div>
    </div>
  );
}
