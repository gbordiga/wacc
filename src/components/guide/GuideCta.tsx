import Link from "next/link"

interface GuideCtaProps {
  label?: string
}

export function GuideCta({ label = "Open the WACC calculator" }: GuideCtaProps) {
  return (
    <div className="text-center mt-8">
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-6 bg-primary text-white hover:bg-primary/90 transition-colors"
      >
        {label}
      </Link>
    </div>
  )
}
