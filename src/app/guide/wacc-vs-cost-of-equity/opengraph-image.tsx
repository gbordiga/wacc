import { createGuideOgImage } from "@/lib/og"

export const alt = "WACC vs cost of equity: when to use each"
export const contentType = "image/png"
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return createGuideOgImage({
    title: "WACC vs cost of equity",
    subtitle: "When to use each rate in DCF and NPV",
  })
}
