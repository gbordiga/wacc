"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b">
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

        <nav className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Calculator
          </Link>
          <Link
            href="https://github.com/gbordiga/wacc"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            GitHub
          </Link>
        </nav>
      </div>
    </header>
  );
}
