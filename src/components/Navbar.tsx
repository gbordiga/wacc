"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            WACC <span className="text-primary">Calculator</span>
          </Link>
        </div>

        {/* Mobile menu button would go here */}
      </div>
    </header>
  );
}
