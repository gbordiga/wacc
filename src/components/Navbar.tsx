"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="border-b relative">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold text-sm">
              <span>W</span>
            </div>
            <div>
              <span className="text-xl font-bold">wacc</span>
              <span className="text-primary font-bold">.less</span>
              <span className="font-light">.style</span>
            </div>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Calculator
          </Link>
          <Link
            href="/guide"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            WACC Guide
          </Link>
          <Link
            href="https://github.com/gbordiga/wacc"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            GitHub
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute z-50 top-16 left-0 right-0 bg-white border-b shadow-lg">
          <nav className="flex flex-col px-4 py-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium hover:text-primary transition-colors"
            >
              Calculator
            </Link>
            <Link
              href="/guide"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium hover:text-primary transition-colors"
            >
              WACC Guide
            </Link>
            <Link
              href="https://github.com/gbordiga/wacc"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium hover:text-primary transition-colors"
            >
              GitHub
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
