export interface FaqItem {
  question: string
  answer: string
}

export const homeFaqItems: FaqItem[] = [
  {
    question: "What is WACC?",
    answer:
      "WACC (Weighted Average Cost of Capital) is the blended return a company must earn to satisfy equity and debt investors. It is the hurdle rate for capital budgeting and the discount rate in many DCF valuations.",
  },
  {
    question: "How do you calculate WACC?",
    answer:
      "WACC = (E / (E + D)) × ke + (D / (E + D)) × kd × (1 − T). Equity and debt are market values, ke is the cost of equity, kd is the cost of debt, and T is the corporate tax rate.",
  },
  {
    question: "How is cost of equity calculated?",
    answer:
      "This calculator uses CAPM: ke = rf + βL × MRP + size premium + additional risk. The risk-free rate and market risk premium come from Fernandez country surveys; beta is levered from Damodaran sector unlevered betas.",
  },
  {
    question: "Why is the cost of debt after tax?",
    answer:
      "Interest is tax-deductible in most jurisdictions, so WACC uses kd × (1 − T). The pre-tax cost of debt is the risk-free rate plus a credit spread implied by the interest coverage ratio.",
  },
  {
    question: "Which data sources does the calculator use?",
    answer:
      "Fernandez 2025 (and 2024 where needed) for risk-free rates and market risk premiums, Damodaran 2026 for global sector betas, country tax rates, and default spreads, and Kroll 2025 for size premiums.",
  },
]

export const waccVsEquityFaqItems: FaqItem[] = [
  {
    question: "Is WACC always lower than the cost of equity?",
    answer:
      "Usually yes, because lenders typically accept a lower return than owners, and interest often reduces tax. If the company has no debt, the two rates are the same. The gap shrinks if debt is very expensive or if interest is not tax-deductible.",
  },
  {
    question: "Can I value a whole company using the cost of equity?",
    answer:
      "Not if you are looking at cash the business generates before paying lenders. That cash has to satisfy both owners and lenders, so the matching rate is WACC. Use cost of equity only for cash that belongs to owners after interest.",
  },
  {
    question: "Can I judge a new project with the cost of equity?",
    answer:
      "Yes, if the project is funded only with equity and has a similar risk to the company’s shares. Most company projects are funded with a mix of equity and debt, so WACC is the usual benchmark. Adjust it if the project is clearly riskier or safer than the existing business.",
  },
  {
    question: "Why can more debt lower WACC?",
    answer:
      "Debt is usually cheaper than equity, especially after the tax saving on interest. Replacing some equity with debt can therefore pull the average down. The benefit is not unlimited: more debt makes owners and lenders demand higher returns.",
  },
]

export const damodaranFaqItems: FaqItem[] = [
  {
    question: "Is this Aswath Damodaran’s official WACC calculator?",
    answer:
      "No. This is an independent calculator. It applies Damodaran’s publicly published sector betas, country tax rates, and default-spread tables, then combines them with Fernandez country premiums and Kroll size premiums.",
  },
  {
    question: "Which Damodaran datasets are used?",
    answer:
      "Global sector unlevered betas, corporate marginal tax rates by country, and ratings / interest-coverage default spreads, using the January 2026 updates linked in the WACC guide.",
  },
  {
    question: "Does the calculator use Damodaran’s equity risk premium?",
    answer:
      "No. The risk-free rate and market risk premium come from Fernandez country surveys (2025, with 2024 fallback). Damodaran data is used for beta, tax, and debt spread.",
  },
  {
    question: "Can I override Damodaran inputs?",
    answer:
      "Yes. Country, sector, tax rate, unlevered or levered beta, and the debt spread are starting points. You can replace any of them with company-specific estimates before reading WACC.",
  },
]
