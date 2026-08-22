"use client"

import type { ReactNode } from "react"

interface SourceLinkProps {
  href: string
  children: ReactNode
}

export function SourceLink({ href, children }: SourceLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
    >
      {children}
    </a>
  )
}
