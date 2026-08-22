"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ThemeToggle"

const navItems = [
  { href: "/", label: "Calculator" },
  { href: "/guide", label: "WACC Guide" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === "/") return pathname === "/" || pathname === "/calculator"
    if (href === "/guide")
      return pathname === "/guide" || pathname.startsWith("/guide/")
    return pathname === href
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileMenuOpen(false)
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <header className="border-b relative bg-background print:hidden">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold text-sm">
            <span aria-hidden="true">W</span>
          </div>
          <div>
            <span className="text-xl font-bold">wacc</span>
            <span className="text-primary font-bold">.less</span>
            <span className="font-light">.style</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-4">
        <nav className="flex space-x-6" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(item.href) && "text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/gbordiga/wacc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </nav>
        <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex items-center min-h-11 min-w-11 justify-center"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden absolute z-50 top-16 left-0 right-0 bg-background border-b"
        >
          <nav className="flex flex-col px-4 py-3" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "py-3 text-base font-medium hover:text-primary transition-colors",
                  isActive(item.href) && "text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://github.com/gbordiga/wacc"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-base font-medium hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
