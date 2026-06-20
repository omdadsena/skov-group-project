"use client";
import { useMemo, useState } from "react";
import { contractors } from "@/lib/contractors";
import { Star, MapPin, BadgeCheck, Search, IndianRupee, Building2, Filter } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

const cities = ["All", "Raipur", "Bilaspur"] as const;
const sorts = ["Top Rated", "Most Projects", "Lowest Price"] as const;

export default function ContractorsPage() {
  const [city, setCity] = useState<(typeof cities)[number]>("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Top Rated");

  const list = useMemo(() => {
    let r = contractors.filter((c) => (city === "All" ? true : c.city === city));
    if (q.trim()) {
      const t = q.toLowerCase();
      r = r.filter((c) => c.name.toLowerCase().includes(t) || c.specialty.toLowerCase().includes(t) || c.tags.some((x) => x.toLowerCase().includes(t)));
    }
    if (sort === "Top Rated") r = [...r].sort((a, b) => b.rating - a.rating);
    if (sort === "Most Projects") r = [...r].sort((a, b) => b.projects - a.projects);
    if (sort === "Lowest Price") r = [...r].sort((a, b) => a.startingPrice - b.startingPrice);
    return r;
  }, [city, q, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12 w-full max-w-full">
      <SectionHeading
        eyebrow="Launching Soon"
        title="Contractor network in progress"
        subtitle="We are onboarding and reviewing our first contractor partners in Chhattisgarh."
      />

      {/* Filters */}
      <div className="card-dark mt-8 md:mt-10 grid gap-4 p-4 sm:p-5 md:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-skov-cream/40" />
          <input
            value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, specialty, tag…"
            className="input-dark pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {cities.map((c) => (
            <button
              key={c} onClick={() => setCity(c)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                city === c ? "border-skov-gold bg-skov-gold text-skov-black" : "border-skov-gold/30 text-skov-cream/80 hover:border-skov-gold/60"
              }`}
            >
              {c === "All" ? <span className="flex items-center gap-1"><Filter className="h-3 w-3"/>{c}</span> : <span className="flex items-center gap-1"><MapPin className="h-3 w-3"/>{c}</span>}
            </button>
          ))}
        </div>
        <select
          value={sort} onChange={(e) => setSort(e.target.value as any)}
          className="input-dark md:w-48"
        >
          {sorts.map((s) => <option key={s} className="bg-skov-black">{s}</option>)}
        </select>
      </div>

      {/* Results */}
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.04 }}
            className="card-dark group flex flex-col p-5 sm:p-6 hover:border-skov-gold/40 hover:shadow-gold transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl">{c.name}</h3>
                  {c.verified && <BadgeCheck className="h-4 w-4 text-skov-gold" />}
                </div>
                <p className="mt-1 text-sm text-skov-cream/60">{c.specialty}</p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-skov-gold/15 px-2.5 py-1 text-xs text-skov-gold">
                <Star className="h-3 w-3 fill-skov-gold" /> {c.rating.toFixed(1)}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-lg font-semibold">{c.projects}</div>
                <div className="text-[10px] uppercase tracking-wider text-skov-cream/50">Projects</div>
              </div>
              <div>
                <div className="text-lg font-semibold">{c.experience}y</div>
                <div className="text-[10px] uppercase tracking-wider text-skov-cream/50">Exp</div>
              </div>
              <div>
                <div className="flex items-center justify-center text-lg font-semibold">
                  <IndianRupee className="h-4 w-4" />{c.startingPrice}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-skov-cream/50">/sqft</div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-skov-gold/20 px-2.5 py-1 text-xs text-skov-cream/70">
                <MapPin className="h-3 w-3" />{c.city}
              </span>
              {c.tags.map((t) => (
                <span key={t} className="rounded-full border border-skov-gold/15 px-2.5 py-1 text-xs text-skov-cream/65">{t}</span>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <Link href="/consultation" className="btn-gold flex-1 !py-2.5 text-sm">Contact</Link>
              <button className="btn-outline-gold !px-4 !py-2.5 text-sm"><Building2 className="h-4 w-4"/></button>
            </div>
          </motion.div>
        ))}
        {list.length === 0 && (
          <div className="col-span-full card-dark p-10 text-center text-skov-cream/60">
            No contractors match your filters yet — try widening the search.
          </div>
        )}
      </div>
    </div>
  );
}
