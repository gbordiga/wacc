import { homeFaqItems } from "@/data/faq"
import { FaqList } from "@/components/FaqList"

export function HomeFaq() {
  return <FaqList items={homeFaqItems} heading="WACC calculator FAQ" />
}
