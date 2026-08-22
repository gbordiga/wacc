import Link from "next/link"
import type { RelatedGuide } from "@/data/articles"

interface RelatedGuidesProps {
  items: RelatedGuide[]
}

export function RelatedGuides({ items }: RelatedGuidesProps) {
  return (
    <section aria-labelledby="related-guides-heading" className="space-y-4">
      <h2
        id="related-guides-heading"
        className="text-xl font-semibold tracking-tight"
      >
        Related guides
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <h3 className="font-medium">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
