"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Calculator, Sparkles, MessageSquare, Palette, Image, ArrowRight } from "lucide-react";
import { Tool } from "../../Types";

const toolsData: Tool[] = [
  {
    id: "contractors",
    title: "Lead Qualification Bot",
    desc: "Turn a project enquiry into a clear scope, feasibility check, and practical next steps.",
    icon: Users,
    href: "/ai-bots",
    highlight: true,
  },
  {
    id: "estimator",
    title: "AI Cost Estimator",
    desc: "Calculate structural, finishing, plumbing, and design cost breakdowns based on local market rates.",
    icon: Calculator,
    href: "/ai-cost-estimator",
  },
  {
    id: "design3d",
    title: "Sketch to 3D Home Bot",
    desc: "Upload a sketch, review the layout, and receive a design-concept workflow.",
    icon: Sparkles,
    href: "/ai-bots",
  },
  {
    id: "consultation",
    title: "House Plan Assistant",
    desc: "Get room sizing, circulation, ventilation, and layout suggestions for your plot.",
    icon: MessageSquare,
    href: "/ai-bots",
  },
  {
    id: "renovation",
    title: "Renovation Advisor",
    desc: "Prioritize repairs and upgrades against your room, budget, and timeline.",
    icon: Palette,
    href: "/ai-bots",
  },
  {
    id: "gallery",
    title: "Material Budget Bot",
    desc: "Build an indicative cement, steel, brick, tile, paint, and labour budget.",
    icon: Image,
    href: "/ai-bots",
  },
];

export default function ToolsGrid() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 md:py-32 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-3 inline-block rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-4 py-1 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            AI Tools
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f5f5f0] leading-tight">
            Six practical tools for smarter construction decisions
          </h2>
          <p className="mt-4 text-[#f5f5f0]/65 font-light text-base sm:text-lg">
            From initial cost layouts to contractor alignment — built so families and NRIs can build home projects without stress.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {toolsData.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`group relative rounded-2xl border p-7 transition duration-300 ${
                tool.highlight
                  ? "border-[#d4af37]/35 bg-[#121210] hover:border-[#d4af37] hover:shadow-[0_10px_35px_-5px_rgba(212,175,55,0.15)]"
                  : "border-neutral-800 bg-[#0c0c0c] hover:border-[#d4af37]/45 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              }`}
            >
              {/* Subtle ambient card glow */}
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#d4af37]/5 blur-2xl opacity-0 group-hover:opacity-100 transition duration-300" />

              <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-[#d4af37]/10 text-[#d4af37] transition group-hover:bg-[#d4af37] group-hover:text-[#0a0a0a] duration-300">
                <tool.icon className="h-6 w-6" />
              </div>

              <h3 className="font-display text-xl font-bold text-[#f5f5f0]">
                {tool.title}
              </h3>
              <p className="mt-2.5 text-sm text-[#f5f5f0]/60 leading-relaxed font-light">
                {tool.desc}
              </p>

              <Link
                href={tool.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#d4af37] group-hover:gap-2.5 transition-all duration-300"
              >
                Launch Tool <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
