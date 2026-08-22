import { TriangleAlert } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getHamadaWarning } from "@/lib/financial"

interface HamadaAlertProps {
  equityRatio: number
  debtRatio: number
  icr?: number
}

export function HamadaAlert({
  equityRatio,
  debtRatio,
  icr,
}: HamadaAlertProps) {
  const warning = getHamadaWarning({ equityRatio, debtRatio, icr })
  if (!warning) return null

  return (
    <Alert className="mt-3">
      <TriangleAlert />
      <AlertTitle>Hamada is stretched here</AlertTitle>
      <AlertDescription>{warning}</AlertDescription>
    </Alert>
  )
}
