import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface FormSectionProps {
  children: ReactNode
  title: string
  description?: ReactNode
  icon?: LucideIcon
  action?: ReactNode
  className?: string
  contentClassName?: string
}

export function FormSection({
  children,
  title,
  description,
  icon: Icon,
  action,
  className,
  contentClassName,
}: FormSectionProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start gap-3">
          {Icon && (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-4" aria-hidden="true" />
            </span>
          )}
          <div className="space-y-1.5">
            <CardTitle>
              <h2 className="text-lg font-medium">{title}</h2>
            </CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  )
}
