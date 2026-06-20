"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, IndianRupee, Sparkles, MapPin, Layers, Ruler } from "lucide-react";

const cities = [
  { name: "Raipur", multiplier: 1.0 },
  { name: "Bilaspur", multiplier: 0.95 },
  { name: "Bhilai", multiplier: 0.97 },
];

const qualities = [
  { name: "Standard", rate: 1500, desc: "Solid structure, standard bricks & tiles." },
  { name: "Premium", rate: 1900, desc: "Modular fittings, premium modular switches." },
  { name: "Luxury", rate: 2500, desc: "Italian marble finish, designer interior work." },
];

export default function AICostEstimator() {
  const [area, setArea] = useState(1500);
  const [quality, setQuality] = useState(qualities[1]);
  const [city, setCity] = useState(cities[0]);

  const { total, perSqft, breakdown } = useMemo(() => {
    const perSqft = Math.round(quality.rate * city.multiplier);
    const total = perSqft * area;
    const breakdown = [
      { label: "Civil & Structure", pct: 0.45 },
      { label: "Finishes & Interiors", pct: 0.28 },
      { label: "Plumbing & Electrical", pct: 0.15 },
      { label: "Design & Supervision", pct: 0.07 },
      { label: "Approvals & Misc.", pct: 0.05 },
    ].map((b) => ({ ...b, amount: Math.round(total * b.pct) }));
    return { total, perSqft, breakdown };
  }, [area, quality, city]);

  return (
    <section className="relative bg-[#060606] py-24 md:py-32 border-t border-[#d4af37]/10 w-full max-w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
          {/* Left Column: Text and controls */}
          <div className="space-y-8">
            <div>
              <div className="mb-3 inline-block rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-4 py-1 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Cost Modeling
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f5f5f0] leading-tight">
                AI Cost Estimator Preview
              </h2>
              <p className="mt-4 text-[#f5f5f0]/65 font-light text-sm sm:text-base leading-relaxed">
                Estimate your custom home project parameters instantly. Adjust the controls to see estimated cost breakdowns for materials and labor.
              </p>
            </div>

            {/* Slider Control */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-[#f5f5f0]/95 flex items-center gap-2">
                <Ruler className="h-4 w-4 text-[#d4af37]" /> Built-up Area:{" "}
                <span className="text-[#d4af37] font-bold">{area.toLocaleString("en-IN")} sqft</span>
              </label>
              <input
                type="range"
                min={500}
                max={5000}
                step={50}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
              />
              <div className="flex justify-between text-xs text-[#f5f5f0]/45 font-medium">
                <span>500 sqft</span>
                <span>5,000 sqft</span>
              </div>
            </div>

            {/* Quality Select */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-[#f5f5f0]/95 flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#d4af37]" /> Quality Tier
              </label>
              <div className="grid gap-3 grid-cols-3">
                {qualities.map((q) => (
                  <button
                    key={q.name}
                    onClick={() => setQuality(q)}
                    className={`rounded-xl border p-3.5 text-left transition duration-300 ${
                      quality.name === q.name
                        ? "border-[#d4af37] bg-[#d4af37]/10"
                        : "border-neutral-900 bg-[#0a0a0a] hover:border-neutral-800"
                    }`}
                  >
                    <div className="text-sm font-bold text-[#f5f5f0]">{q.name}</div>
                    <div className="text-[10px] text-[#f5f5f0]/50 mt-1 leading-normal font-light">
                      {q.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* City Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-[#f5f5f0]/95 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#d4af37]" /> City Location
              </label>
              <div className="flex flex-wrap gap-2.5">
                {cities.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setCity(c)}
                    className={`rounded-full border px-5 py-2 text-xs font-semibold tracking-wider uppercase transition duration-300 ${
                      city.name === c.name
                        ? "border-[#d4af37] bg-[#d4af37] text-[#0a0a0a]"
                        : "border-neutral-900 bg-[#0a0a0a] text-[#f5f5f0]/75 hover:border-neutral-800"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Breakdown Display card */}
          <motion.div
            layout
            className="card-dark relative overflow-hidden border border-[#d4af37]/20 p-8 sm:p-10 rounded-2xl bg-[#0e0e0c]/90 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute inset-0 bg-gold-radial opacity-40 pointer-events-none" />

            <div className="relative space-y-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                <Sparkles className="h-3.5 w-3.5" /> Estimated Construction Cost
              </div>

              <div>
                <div className="flex items-center text-4xl sm:text-5xl font-display font-semibold text-[#f5f5f0] tracking-tight bg-gradient-to-r from-[#d4af37] to-[#f7e4a6] bg-clip-text text-transparent">
                  <IndianRupee className="h-8 w-8 text-[#d4af37] mr-1 flex-shrink-0" />
                  {total.toLocaleString("en-IN")}
                </div>
                <p className="text-xs text-[#f5f5f0]/50 mt-2 font-medium">
                  Estimated at ~<span className="text-[#d4af37]">₹{perSqft} / sqft</span> based on local specifications.
                </p>
              </div>

              {/* Progress bars breakdown */}
              <div className="space-y-4">
                {breakdown.map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#f5f5f0]/75">{item.label}</span>
                      <span className="text-[#d4af37]">₹{item.amount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-neutral-900">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct * 100}%` }}
                        transition={{ duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-[#c5a043] to-[#d4af37]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-[#f5f5f0]/45 italic font-light leading-normal pt-2 border-t border-neutral-900">
                * The values above represent localized pilot database indices. Project costs may vary depending on design drafts and soil conditions.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
