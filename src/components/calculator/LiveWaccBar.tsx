import type { ReactNode } from "react"
import { CalculationResult } from "@/types"
import { formatPercentage } from "@/utils/format"
import { cn } from "@/lib/utils"
import { PrintButton } from "./PrintReport"

interface LiveWaccBarProps {
  result: CalculationResult | null
}

export function LiveWaccBar({ result }: LiveWaccBarProps) {
  if (!result) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      data-live-wacc-bar
      className="fixed inset-x-0 bottom-0 z-40 print:hidden"
    >
      <div className="border-t bg-background pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_2px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4">
          <div className="flex min-w-0 items-baseline gap-6 sm:gap-10">
            <Metric
              symbol="WACC"
              value={formatPercentage(result.wacc)}
              emphasize
            />
            <Metric
              symbol={
                <>
                  k<sub>e</sub>
                </>
              }
              value={formatPercentage(result.costOfEquity)}
            />
            <Metric
              symbol={
                <>
                  k<sub>d</sub>
                </>
              }
              value={formatPercentage(result.costOfDebt)}
            />
          </div>
          <PrintButton />
        </div>
      </div>
    </div>
  )
}

interface MetricProps {
  symbol: ReactNode
  value: string
  emphasize?: boolean
}

function Metric({ symbol, value, emphasize }: MetricProps) {
  return (
    <div className="flex items-baseline gap-2 py-3 sm:gap-3">
      <p className="text-xs text-muted-foreground">{symbol}</p>
      <p
        className={cn(
          "text-lg font-semibold tabular-nums sm:text-xl",
          emphasize ? "text-primary" : "text-foreground"
        )}
      >
        {value}
      </p>
    </div>
  )
}
