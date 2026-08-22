import type { FaqItem } from "@/data/faq"

interface FaqListProps {
  items: FaqItem[]
  heading: string
  headingId?: string
}

export function FaqList({
  items,
  heading,
  headingId = "faq-heading",
}: FaqListProps) {
  return (
    <section aria-labelledby={headingId} className="space-y-4">
      <h2
        id={headingId}
        className="text-xl font-semibold tracking-tight scroll-mt-24"
      >
        {heading}
      </h2>
      <div className="divide-y rounded-xl border bg-card">
        {items.map((item) => (
          <details key={item.question} className="group px-5 py-4">
            <summary className="cursor-pointer list-none font-medium marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-muted-foreground transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}