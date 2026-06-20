"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] pt-32 pb-24 md:pt-40 md:pb-36 flex flex-col items-center text-center">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)] opacity-60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center">
        {/* Subtle Luxury Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#d4af37]"
        >
          <Sparkles className="h-3.5 w-3.5" /> Pilot Network Expanding
        </motion.div>

        {/* Trillion-dollar Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display text-3xl sm:text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight text-[#f5f5f0]"
        >
          India&apos;s Trusted <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#d4af37] via-[#f7e4a6] to-[#d4af37] bg-clip-text text-transparent">
            Construction + Real Estate
          </span>{" "}
          <br className="hidden sm:inline" />
          Intelligence Platform
        </motion.h1>

        {/* Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 max-w-3xl text-base sm:text-xl font-light text-[#f5f5f0]/80 leading-relaxed"
        >
          All AI Tools Free — Verified Contractors <span className="text-[#d4af37] mx-1.5">•</span> Transparent Estimates <span className="text-[#d4af37] mx-1.5">•</span> City-Wise Service
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/consultation"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-[#d4af37] px-8 py-4 text-base font-semibold text-[#0a0a0a] shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:bg-[#c5a043] transition duration-300 hover:shadow-[0_10px_40px_rgba(212,175,55,0.5)] transform hover:-translate-y-0.5"
          >
            Start Your Project <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/ai-cost-estimator"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-[#f5f5f0]/40 bg-[#f5f5f0]/5 px-8 py-4 text-base font-semibold text-[#f5f5f0] hover:bg-[#f5f5f0]/10 hover:border-[#f5f5f0] transition duration-300"
          >
            Get Cost Estimate
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
