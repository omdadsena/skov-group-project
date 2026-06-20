"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/ai-bots", label: "AI Bots" },
  { href: "/contractors", label: "Contractors" },
  { href: "/ai-cost-estimator", label: "AI Estimator" },
  { href: "/consultation", label: "Consult" },
  { href: "/join-as-contractor", label: "Join Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all w-full max-w-full ${
        scrolled ? "bg-skov-black/80 backdrop-blur-xl border-b border-skov-gold/15" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-5 md:py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="grid h-9 w-9 place-items-center rounded-full border border-skov-gold/50 bg-skov-gold/10">
            <ShieldCheck className="h-5 w-5 text-skov-gold" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl tracking-wide gold-text">SKOV</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-skov-cream/60">Group</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-skov-cream/80 hover:text-skov-gold transition">
              {l.label}
            </Link>
          ))}
          <Link href="/consultation" className="btn-gold !py-2 !px-5 text-sm">Book Expert</Link>
        </div>
        <button className="md:hidden text-skov-gold" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-skov-gold/15 bg-skov-black/95"
          >
            <div className="flex flex-col gap-2 px-5 py-4">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-skov-cream/90 hover:text-skov-gold">
                  {l.label}
                </Link>
              ))}
              <Link href="/consultation" onClick={() => setOpen(false)} className="btn-gold mt-2 text-sm">Book Expert</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
