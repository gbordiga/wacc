import { createGuideOgImage } from "@/lib/og"

export const alt = "Damodaran WACC calculator with sector betas and tax rates"
export const contentType = "image/png"
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return createGuideOgImage({
    title: "Damodaran WACC calculator",
    subtitle: "Sector betas, country tax rates, and default spreads",
  })
}
