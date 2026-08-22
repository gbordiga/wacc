import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { FormLabel } from "@/components/ui/form"
import { cn } from "@/lib/utils"

interface FieldLabelProps {
  icon?: LucideIcon
  children: ReactNode
  className?: string
}

export function FieldLabel({ icon: Icon, children, className }: FieldLabelProps) {
  return (
    <FormLabel className={cn("flex items-center gap-1.5", className)}>
      {Icon && (
        <Icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
      )}
      {children}
    </FormLabel>
  )
}
