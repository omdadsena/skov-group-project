"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Hammer, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

const benefits = [
  "Free profile verification & city placement",
  "Boosted exposure to high-intent local homeowners",
  "Access to standardized client billing templates",
  "Zero upfront listing fees — Pay only when selected",
];

export default function ContractorCTA() {
  return (
    <section className="relative bg-[#060606] py-24 md:py-32 border-t border-[#d4af37]/10 w-full max-w-full">
      <div className="mx-auto max-w-5xl px-4 md:px-8 relative z-10">
        <div className="card-dark relative overflow-hidden border border-[#d4af37]/25 p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#0c0c0b] to-[#14120e]">
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-gold-radial opacity-60 pointer-events-none" />

          <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] items-center">
            {/* Context Left */}
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-[#d4af37]">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#d4af37]/15">
                  <Hammer className="h-5 w-5" />
                </div>
                <span className="text-xs uppercase tracking-widest font-semibold">
                  Builder Partnerships
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#f5f5f0] leading-snug">
                Grow Your Business As A <span className="text-[#d4af37]">SKOV Verified</span> Partner
              </h2>
              <p className="text-sm text-[#f5f5f0]/65 leading-relaxed font-light">
                Are you a local general contractor, builder firm, or interior designer in Chhattisgarh? Build credibility, get verified, and showcase your project details.
              </p>
              <div className="pt-2">
                <Link
                  href="/join-as-contractor"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#d4af37] px-8 py-3.5 text-sm font-bold text-[#0a0a0a] shadow-[0_8px_25px_rgba(212,175,55,0.25)] hover:bg-[#c5a043] transition duration-300"
                >
                  Join as Partner <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Checklist Right */}
            <div className="rounded-2xl border border-neutral-900 bg-black/60 p-6 sm:p-8 space-y-6">
              <h3 className="font-display text-lg font-bold text-[#f5f5f0] flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#d4af37]" /> Partner Benefits
              </h3>
              <ul className="space-y-3.5">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-xs text-[#f5f5f0]/80 font-light">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[10px] text-[#f5f5f0]/40 italic font-light">
                * Applications are reviewed by our physical inspection crew. No guaranteed visibility without a complete documentation pass.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
