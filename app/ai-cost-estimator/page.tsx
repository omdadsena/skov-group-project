"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, IndianRupee, Sparkles, MapPin, Layers, Ruler, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";

const cities = [
  { name: "Raipur", multiplier: 1.0 },
  { name: "Bilaspur", multiplier: 0.95 },
  { name: "Bhilai", multiplier: 0.97 },
  { name: "Korba", multiplier: 0.92 },
];

const qualities = [
  { name: "Standard", rate: 1500, desc: "Solid build, essential finishes." },
  { name: "Premium", rate: 1900, desc: "Branded fittings, modern finishes." },
  { name: "Luxury", rate: 2500, desc: "Imported materials, designer interiors." },
];

export default function EstimatorPage() {
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

  const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12 w-full max-w-full">
      <SectionHeading
        eyebrow="AI Cost Estimator"
        title="Know your build cost in 30 seconds"
        subtitle="Create an early planning estimate using adjustable city, area, and quality assumptions."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Form */}
        <div className="card-dark p-5 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-skov-gold/10 text-skov-gold">
              <Calculator className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl">Project details</h3>
          </div>

          <label className="label-gold flex items-center gap-2"><Ruler className="h-4 w-4 text-skov-gold" /> Built-up area (sqft)</label>
          <input
            type="range" min={400} max={6000} step={50}
            value={area} onChange={(e) => setArea(Number(e.target.value))}
            className="w-full accent-skov-gold"
          />
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-skov-cream/60">400</span>
            <span className="rounded-full bg-skov-gold/15 px-3 py-1 text-skov-gold font-medium">{area.toLocaleString("en-IN")} sqft</span>
            <span className="text-skov-cream/60">6,000</span>
          </div>

          <div className="mt-7">
            <label className="label-gold flex items-center gap-2"><Layers className="h-4 w-4 text-skov-gold"/> Quality tier</label>
            <div className="grid gap-2 sm:grid-cols-3">
              {qualities.map((q) => (
                <button
                  key={q.name} onClick={() => setQuality(q)}
                  className={`rounded-xl border p-3 text-left transition ${
                    quality.name === q.name ? "border-skov-gold bg-skov-gold/10" : "border-skov-gold/20 hover:border-skov-gold/40"
                  }`}
                >
                  <div className="font-medium">{q.name}</div>
                  <div className="mt-1 text-xs text-skov-cream/60">{q.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <label className="label-gold flex items-center gap-2"><MapPin className="h-4 w-4 text-skov-gold"/> City</label>
            <div className="flex flex-wrap gap-2">
              {cities.map((c) => (
                <button
                  key={c.name} onClick={() => setCity(c)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    city.name === c.name ? "border-skov-gold bg-skov-gold text-skov-black" : "border-skov-gold/30 hover:border-skov-gold/60"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result */}
        <motion.div layout className="card-dark relative overflow-hidden p-5 sm:p-7">
          <div className="absolute inset-0 bg-gold-radial opacity-70 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-skov-gold">
              <Sparkles className="h-3 w-3" /> Estimated Build Cost
            </div>
            <motion.div
              key={total}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center font-display text-5xl md:text-6xl gold-text"
            >
              <IndianRupee className="h-10 w-10" />{total.toLocaleString("en-IN")}
            </motion.div>
            <div className="mt-2 text-sm text-skov-cream/65">
              ≈ <span className="text-skov-gold">{fmt(perSqft)}</span> per sqft • {city.name} • {quality.name}
            </div>

            <div className="mt-8 space-y-3">
              {breakdown.map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between text-sm">
                    <span className="text-skov-cream/80">{b.label}</span>
                    <span className="text-skov-gold">{fmt(b.amount)}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${b.pct * 100}%` }}
                      transition={{ duration: 0.6 }} className="h-full bg-gradient-to-r from-skov-darkgold to-skov-gold"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/consultation" className="btn-gold">Talk to Expert <ArrowRight className="h-4 w-4"/></Link>
              <Link href="/contractors" className="btn-outline-gold">See Contractors</Link>
            </div>
            <p className="mt-5 text-xs text-skov-cream/45">
              * Estimate is indicative. Final cost depends on plot conditions, design complexity, and material choices.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
