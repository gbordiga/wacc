"use client"

import { forwardRef, useEffect, useId, useMemo, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { nativeSelectClassName } from "@/components/ui/native-select"

export interface SearchableOption {
  value: string
  label: string
}

interface SearchableSelectProps {
  value: string
  onChange: (value: string) => void
  options: SearchableOption[]
  placeholder?: string
}

export const SearchableSelect = forwardRef<HTMLDivElement, SearchableSelectProps>(
  function SearchableSelect(
    { value, onChange, options, placeholder = "Select" },
    forwardedRef
  ) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const listId = useId()
  const selected = options.find((option) => option.value === value)

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return options
    return options.filter((option) =>
      option.label.toLowerCase().includes(normalizedQuery)
    )
  }, [options, query])

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node))
        setIsOpen(false)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div
      ref={(node) => {
        containerRef.current = node
        if (typeof forwardedRef === "function") forwardedRef(node)
        else if (forwardedRef) forwardedRef.current = node
      }}
      className="relative w-full"
    >
      <button
        type="button"
        className={cn(nativeSelectClassName, "flex items-center justify-between gap-2 text-left")}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="block min-w-0 truncate">
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground">
          <input
            autoFocus
            className="w-full border-b bg-transparent px-3 py-2 text-sm outline-none"
            placeholder="Search…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ul
            id={listId}
            role="listbox"
            className="max-h-60 overflow-auto py-1"
          >
            {filteredOptions.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm hover:bg-accent",
                    option.value === value && "bg-accent"
                  )}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                    setQuery("")
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="px-3 py-2 text-sm text-muted-foreground">
                No matches
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
})
