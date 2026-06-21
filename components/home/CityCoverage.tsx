"use client";

import { motion } from "framer-motion";
import { MapPin, Globe, Sparkles } from "lucide-react";
import { City } from "../../Types";
import Link from "next/link";

const citiesList: City[] = [
  { name: "Raipur", state: "Chhattisgarh", status: "Active" },
  { name: "Bilaspur", state: "Chhattisgarh", status: "Active" },
  { name: "Durg", state: "Chhattisgarh", status: "Active" },
  { name: "Bhilai", state: "Chhattisgarh", status: "Active" },
  { name: "Baloda Bazar", state: "Chhattisgarh", status: "Expanding Soon" },
  { name: "Kawardha", state: "Chhattisgarh", status: "Expanding Soon" },
];

const cityLinks: Record<string, string> = {
  Raipur: "/contractors-in-raipur",
  Bilaspur: "/contractors-in-bilaspur",
  Durg: "/contractors-in-durg",
  Bhilai: "/contractors-in-bhilai",
  "Baloda Bazar": "/contractors-in-baloda-bazar",
  Kawardha: "/contractors-in-kawardha",
};

export default function CityCoverage() {
  return (
    <section id="cities" className="relative bg-[#0a0a0a] py-24 md:py-32 border-t border-[#d4af37]/10 w-full max-w-full">
      {/* Subtle bottom-right gold ambient glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.04),transparent_60%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-center">
          {/* Left Column: Context */}
          <div className="space-y-6">
            <div className="mb-3 inline-block rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-4 py-1 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              Regional Footprint
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f5f5f0] leading-tight">
              Local Expertise Across Chhattisgarh
            </h2>
            <p className="text-[#f5f5f0]/65 font-light text-sm sm:text-base leading-relaxed">
              We focus on build conditions, local materials pricing indices, municipal parameters, and vetted local construction contractor crews in specific cities.
            </p>
            <div className="p-5 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5 text-xs text-[#d4af37] flex items-start gap-3">
              <Sparkles className="h-5 w-5 flex-shrink-0" />
              <div>
                <span className="font-bold uppercase tracking-wider block mb-1">
                  Honest Coverage Note
                </span>
                Coverage is expanded city-by-city so local rates, service availability, and contractor information remain useful.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Grid of Cities */}
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
            {citiesList.map((city, idx) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className={`rounded-xl border p-5 flex flex-col justify-between transition duration-300 ${
                  city.status === "Active"
                    ? "border-[#d4af37]/25 bg-[#0e0e0c]/80 hover:border-[#d4af37]"
                    : "border-neutral-900 bg-[#070707] opacity-65"
                }`}
              >
                <Link href={cityLinks[city.name]} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`grid h-8 w-8 place-items-center rounded-lg ${city.status === "Active" ? "bg-[#d4af37]/15 text-[#d4af37]" : "bg-neutral-850 text-neutral-600"}`}>
                      <MapPin className="h-4.5 w-4.5" />
                    </div>
                    <span className={`text-[8px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded ${city.status === "Active" ? "bg-[#d4af37]/25 text-[#d4af37]" : "bg-neutral-900 text-neutral-500"}`}>
                      {city.status}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-[#f5f5f0]">
                    {city.name}
                  </h3>
                </Link>
                <div className="text-[10px] text-[#f5f5f0]/40 font-medium mt-4">
                  {city.state}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
