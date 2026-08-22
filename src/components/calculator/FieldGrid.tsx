import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FieldGridProps {
  children: ReactNode
  columns?: 2 | 3
  className?: string
}

export const fieldCellClassName = "row-span-3 grid-rows-subgrid"

export function FieldGrid({
  children,
  columns = 2,
  className,
}: FieldGridProps) {
  return (
    <div
      className={cn(
        "grid gap-x-6 gap-y-6",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  )
}
