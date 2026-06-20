"use client";

import { motion } from "framer-motion";
import { Compass, Calculator, Sparkles, Hammer } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Plan Blueprint",
    desc: "Lock in room setups, sizing requirements, and draft floor configurations using our AI Plan Bots or expert callbacks.",
    icon: Compass,
  },
  {
    step: "02",
    title: "Estimate Budget",
    desc: "Generate local market estimates split by raw materials, civil structure, masonry, finishes, and contractor fees.",
    icon: Calculator,
  },
  {
    step: "03",
    title: "Design Elevations",
    desc: "Generate sketch elevations and interior renders so you visualize the dream project before building.",
    icon: Sparkles,
  },
  {
    step: "04",
    title: "Vetted Execution",
    desc: "Match with audited, local contractors near Raipur and Bilaspur, ensuring timeline and payment check security.",
    icon: Hammer,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative bg-[#060606] py-24 md:py-32 border-t border-[#d4af37]/10 w-full max-w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="mb-3 inline-block rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-4 py-1 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Execution Flow
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f5f5f0] leading-tight">
            How SKOV Works
          </h2>
          <p className="mt-4 text-[#f5f5f0]/65 font-light text-base sm:text-lg">
            A step-by-step guidance protocol engineered to ensure transparent execution of custom residential projects.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative space-y-4"
            >
              {/* Number and Line */}
              <div className="flex items-center gap-4">
                <span className="font-display text-4xl font-bold text-[#d4af37]/20 tracking-tighter">
                  {step.step}
                </span>
                {i < 3 && (
                  <div className="hidden lg:block flex-1 h-[1px] bg-gradient-to-r from-[#d4af37]/25 to-transparent mr-4" />
                )}
              </div>

              {/* Icon & Heading */}
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#d4af37]/10 text-[#d4af37]">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#f5f5f0]">
                  {step.title}
                </h3>
              </div>

              <p className="text-sm text-[#f5f5f0]/60 leading-relaxed font-light">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
