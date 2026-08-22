"use client"

import { useEffect, useRef } from "react"
import katex from "katex"
import "katex/dist/katex.min.css"

interface KaTeXFormulaProps {
  formula: string
  displayMode?: boolean
}

export function KaTeXFormula({
  formula,
  displayMode = false,
}: KaTeXFormulaProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    katex.render(formula, containerRef.current, {
      displayMode,
      throwOnError: false,
    })
  }, [formula, displayMode])

  return <span ref={containerRef} />
}
