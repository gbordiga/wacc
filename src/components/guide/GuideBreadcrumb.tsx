import Link from "next/link"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface GuideBreadcrumbProps {
  items?: BreadcrumbItem[]
}

const defaultItems: BreadcrumbItem[] = [
  { label: "WACC Calculator", href: "/" },
  { label: "WACC Guide" },
]

export function GuideBreadcrumb({
  items = defaultItems,
}: GuideBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-foreground" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
