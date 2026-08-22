import type { FaqItem } from "@/data/faq"
import { homeFaqItems } from "@/data/faq"
import { guideSeo, homeSeo, site } from "@/lib/site"

interface JsonLdObject {
  [key: string]: unknown
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: site.language,
    publisher: { "@id": `${site.url}/#person` },
  }
}

export function personJsonLd(): JsonLdObject {
  return {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.creator,
    url: site.github,
  }
}

export function webApplicationJsonLd(): JsonLdObject {
  return {
    "@type": "WebApplication",
    "@id": `${site.url}/#app`,
    name: "WACC Calculator",
    url: site.url,
    description: homeSeo.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    inLanguage: site.language,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: { "@id": `${site.url}/#person` },
  }
}

export function faqJsonLd({
  items = homeFaqItems,
  id = `${site.url}/#faq`,
}: {
  items?: FaqItem[]
  id?: string
} = {}): JsonLdObject {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function howToJsonLd(): JsonLdObject {
  return {
    "@type": "HowTo",
    name: "How to calculate WACC",
    description:
      "Calculate weighted average cost of capital from country, sector, size, capital structure, and coverage data.",
    step: [
      {
        "@type": "HowToStep",
        name: "Select country and sector",
        text: "Choose the country and industry to load tax rates, risk-free rates, market risk premiums, and unlevered betas.",
      },
      {
        "@type": "HowToStep",
        name: "Enter company size",
        text: "Set market capitalization to apply the Kroll size premium.",
      },
      {
        "@type": "HowToStep",
        name: "Add coverage and capital structure",
        text: "Enter EBIT, interest expense, and the equity/debt mix to estimate the credit spread and weights.",
      },
      {
        "@type": "HowToStep",
        name: "Review WACC",
        text: "Inspect cost of equity, after-tax cost of debt, and the resulting WACC.",
      },
    ],
  }
}

export function breadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[]
}): JsonLdObject {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  }
}

export function homeGraphJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      websiteJsonLd(),
      webApplicationJsonLd(),
      faqJsonLd(),
      howToJsonLd(),
    ],
  }
}

export function guideGraphJsonLd(): JsonLdObject {
  return articleGraphJsonLd({
    path: "/guide",
    title: guideSeo.title,
    description: guideSeo.description,
    breadcrumbs: [
      { name: "WACC Calculator", path: "/" },
      { name: "WACC Guide", path: "/guide" },
    ],
  })
}

export function articleGraphJsonLd({
  path,
  title,
  description,
  breadcrumbs,
  faqItems,
}: {
  path: string
  title: string
  description: string
  breadcrumbs: { name: string; path: string }[]
  faqItems?: FaqItem[]
}): JsonLdObject {
  const graph: JsonLdObject[] = [
    personJsonLd(),
    websiteJsonLd(),
    {
      "@type": "TechArticle",
      "@id": `${site.url}${path}#article`,
      headline: title,
      description,
      url: `${site.url}${path}`,
      inLanguage: site.language,
      author: { "@id": `${site.url}/#person` },
      publisher: { "@id": `${site.url}/#person` },
      mainEntityOfPage: `${site.url}${path}`,
    },
    breadcrumbJsonLd({ items: breadcrumbs }),
  ]

  if (faqItems?.length)
    graph.push(faqJsonLd({ items: faqItems, id: `${site.url}${path}#faq` }))

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  }
}
