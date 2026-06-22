"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/ai-bots", label: "Tools" },
  { href: "/contractors", label: "Contractors" },
  { href: "/#cities", label: "Cities" },
  { href: "/join", label: "Join Us" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 w-full max-w-full border-b border-[#d4af37]/20 bg-[#0a0a0a]/95"
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex min-h-11 items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-[#d4af37]/45 bg-[#d4af37]/10 transition duration-300 group-hover:bg-[#d4af37]/20 group-hover:border-[#d4af37]">
            <ShieldCheck className="h-6 w-6 text-[#d4af37]" />
          </div>
          <div className="leading-tight">
            <span className="font-display text-xl font-semibold tracking-wide text-[#f5f5f0] group-hover:text-[#d4af37] transition duration-300">
              SKOV <span className="text-[#d4af37]">GROUP</span>
            </span>
            <div className="text-[9px] uppercase tracking-[0.3em] text-[#f5f5f0]/50">
              Trust Layer
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#f5f5f0]/80 hover:text-[#d4af37] transition duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center rounded-full border border-[#d4af37] bg-[#d4af37]/10 px-6 py-2 text-xs font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#0a0a0a]"
          >
            Consultation
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full text-[#e2bd58] transition hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
          <div
            id="mobile-navigation"
            className="overflow-hidden border-t border-[#d4af37]/20 bg-[#0a0a0a] lg:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-6 border-b border-[#d4af37]/10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-11 items-center text-base font-medium text-[#f5f5f0]/90 hover:text-[#d4af37] transition duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/consultation"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-[#d4af37] bg-[#d4af37] text-[#0a0a0a] px-6 py-3 text-sm font-semibold transition hover:bg-[#d4af37]/90 mt-2 w-full"
              >
                Book Consultation
              </Link>
            </div>
          </div>
      )}
    </header>
  );
}
