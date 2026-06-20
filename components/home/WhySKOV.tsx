"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Calculator, Landmark } from "lucide-react";

const benefits = [
  {
    title: "100% Free Access",
    desc: "Use all our specialized estimation models, 3D renders, and directories without subscription cards or hidden charges.",
    icon: Sparkles,
  },
  {
    title: "Vetted Local Contractors",
    desc: "We verify credentials, past works, and financial compliance so you avoid contractors who delay projects.",
    icon: ShieldCheck,
  },
  {
    title: "No-Overrun Estimates",
    desc: "Generate complete material and work cost items up-front. Know exact parameters before signing agreements.",
    icon: Calculator,
  },
  {
    title: "Chhattisgarh Specialization",
    desc: "Our databases reflect actual market parameters of Raipur, Bilaspur, Bhilai, and nearby supply centers.",
    icon: Landmark,
  },
];

export default function WhySKOV() {
  return (
    <section className="relative bg-[#060606] py-24 md:py-32 border-t border-[#d4af37]/10 w-full max-w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-3 inline-block rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-4 py-1 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Value Shield
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f5f5f0] leading-tight">
            Why Choose SKOV GROUP?
          </h2>
          <p className="mt-4 text-[#f5f5f0]/65 font-light text-base sm:text-lg">
            We are building a trust layer between homeowners and contractors, eliminating over-invoicing and quality shortcuts.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-2xl border border-neutral-900 bg-[#0a0a0a] p-6 hover:border-[#d4af37]/30 transition duration-300"
            >
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-[#d4af37]/10 text-[#d4af37]">
                <b.icon className="h-5.5 w-5.5" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#f5f5f0] mb-2.5">
                {b.title}
              </h3>
              <p className="text-sm text-[#f5f5f0]/60 leading-relaxed font-light">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
