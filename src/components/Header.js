"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header({ businessName }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/men", label: "Men" },
    { href: "/women", label: "Women" },
    { href: "/#new-arrivals", label: "New Arrivals" },
    { href: "/#sale", label: "Sale" },
    { href: "/#location", label: "Visit Us" },
  ];

  return (
    <header className="sticky top-0 z-30 bg-sand/95 backdrop-blur border-b border-charcoal/10">
      <div className="container-page flex items-center justify-between h-16">
        <Link href="/" className="font-display text-2xl text-charcoal">
          {businessName || "Qadam Footwear"}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-charcoal/80 hover:text-rust transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-charcoal"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden container-page pb-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-charcoal/80 py-1"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
