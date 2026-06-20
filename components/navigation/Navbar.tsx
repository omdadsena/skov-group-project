"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ai-bots", label: "Tools" },
  { href: "/contractors", label: "Contractors" },
  { href: "/contractors#projects", label: "Projects" },
  { href: "/#cities", label: "Cities" },
  { href: "/join-as-contractor", label: "Join Us" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full max-w-full ${
        isScrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#d4af37]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
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
        <div className="hidden md:flex items-center gap-8">
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
          className="md:hidden text-[#d4af37] p-2 hover:bg-neutral-900 rounded-full transition"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-[#d4af37]/20 bg-[#0a0a0a]"
          >
            <div className="flex flex-col gap-4 px-4 py-6 border-b border-[#d4af37]/10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-[#f5f5f0]/90 hover:text-[#d4af37] transition duration-200 py-1"
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
