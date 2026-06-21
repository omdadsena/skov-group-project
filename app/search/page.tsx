"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, MapPin, Phone, Filter, Loader2, Users, ChevronDown } from "lucide-react";
import Link from "next/link";
import BecomeVerifiedCTA from "@/components/cta/BecomeVerifiedCTA";

type Contractor = {
  id: string;
  name: string;
  phone: string | null;
  city: string;
  state: string;
  services: string[];
  rating: number;
  reviews_count: number;
  is_verified: boolean;
};

const SERVICES = [
  "All", "Construction", "Renovation", "Interior Design", "Electrical",
  "Plumbing", "Painting", "Carpentry", "Architectural", "Commercial",
];

const STATES = [
  "All States", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const RATINGS = [
  { label: "All Ratings", value: 0 },
  { label: "3+ Stars", value: 3 },
  { label: "3.5+ Stars", value: 3.5 },
  { label: "4+ Stars", value: 4 },
  { label: "4.5+ Stars", value: 4.5 },
];

function maskPhone(phone: string | null): string {
  if (!phone) return "Contact via SKOV";
  if (phone.length >= 10) return phone.slice(0, 3) + "****" + phone.slice(-2);
  return "***" + phone.slice(-2);
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [service, setService] = useState("All");
  const [state, setState] = useState("All States");
  const [minRating, setMinRating] = useState(0);
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchContractors = useCallback(
    async (p: number, append = false) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query.trim()) params.set("q", query.trim());
        if (state !== "All States") params.set("state", state);
        if (service !== "All") params.set("services", service);
        if (minRating > 0) params.set("min_rating", minRating.toString());
        params.set("page", p.toString());
        params.set("limit", "20");

        const res = await fetch(`/api/contractors/search?${params}`);
        const data = await res.json();

        if (append) {
          setContractors((prev) => [...prev, ...(data.contractors || [])]);
        } else {
          setContractors(data.contractors || []);
        }
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 0);
        setPage(p);
      } catch {
        if (!append) setContractors([]);
      }
      setLoading(false);
      setInitialLoad(false);
    },
    [query, service, state, minRating]
  );

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => fetchContractors(1), 300);
    return () => clearTimeout(timer);
  }, [fetchContractors]);

  const loadMore = () => fetchContractors(page + 1, true);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Search Section */}
      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,164,92,0.08),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl sm:text-5xl font-semibold text-[#f5f5f0] leading-tight"
          >
            Find Contractors{" "}
            <span className="bg-gradient-to-r from-[#d4af37] via-[#f7e4a6] to-[#d4af37] bg-clip-text text-transparent">
              Across India
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-[#f5f5f0]/65"
          >
            Search contractors in any Indian city — from metros to small towns
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-skov-cream/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city, contractor name, or state..."
              className="w-full rounded-2xl border border-skov-gold/25 bg-[#151515] pl-12 pr-4 py-4 text-base text-skov-cream placeholder:text-skov-cream/35 outline-none focus:border-skov-gold focus:ring-2 focus:ring-skov-gold/20 transition"
            />
          </motion.div>
        </div>
      </section>

      {/* Filters + Results */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 pb-24">
        {/* Filter Bar */}
        <div className="card-dark p-4 grid gap-3 sm:grid-cols-3 mb-6">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-skov-cream/40 pointer-events-none" />
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="input-dark !pl-9 !py-2.5 text-sm appearance-none"
            >
              {SERVICES.map((s) => (
                <option key={s} className="bg-skov-black">{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-skov-cream/40 pointer-events-none" />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-skov-cream/40 pointer-events-none" />
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="input-dark !pl-9 !py-2.5 text-sm appearance-none"
            >
              {STATES.map((s) => (
                <option key={s} className="bg-skov-black">{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-skov-cream/40 pointer-events-none" />
          </div>
          <div className="relative">
            <Star className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-skov-cream/40 pointer-events-none" />
            <select
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="input-dark !pl-9 !py-2.5 text-sm appearance-none"
            >
              {RATINGS.map((r) => (
                <option key={r.value} value={r.value} className="bg-skov-black">{r.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-skov-cream/40 pointer-events-none" />
          </div>
        </div>

        {/* Become Verified CTA Banner */}
        <div className="mb-8">
          <BecomeVerifiedCTA variant="banner" />
        </div>

        {/* Results Count */}
        {!initialLoad && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-skov-cream/60">
              {total > 0
                ? `Showing ${contractors.length} of ${total} contractors`
                : "No contractors found"}
            </p>
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs text-skov-gold hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && contractors.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <Loader2 className="h-8 w-8 text-skov-gold animate-spin" />
            <p className="text-sm text-skov-cream/60">Searching contractors across India...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !initialLoad && contractors.length === 0 && (
          <div className="card-dark flex flex-col items-center justify-center gap-4 p-12 text-center">
            <Users className="h-12 w-12 text-skov-gold/30" />
            <div>
              <h3 className="font-display text-xl text-skov-cream">No contractors found</h3>
              <p className="mt-2 text-sm text-skov-cream/50">
                Try a different city, service type, or broaden your filters.
              </p>
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {contractors.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.3) }}
                className="card-dark group flex flex-col p-5 hover:border-skov-gold/40 hover:shadow-gold transition duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg text-skov-cream truncate">{c.name}</h3>
                    <p className="mt-1 text-xs text-skov-cream/55 flex items-center gap-1">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      {c.city}, {c.state}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-skov-gold/15 px-2.5 py-1 text-xs text-skov-gold flex-shrink-0 ml-2">
                    <Star className="h-3 w-3 fill-skov-gold" />
                    {c.rating?.toFixed(1) || "N/A"}
                  </div>
                </div>

                {/* Services */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(c.services || []).slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-skov-gold/15 px-2.5 py-0.5 text-[10px] text-skov-cream/65"
                    >
                      {s}
                    </span>
                  ))}
                  {(c.services || []).length > 3 && (
                    <span className="text-[10px] text-skov-cream/40">
                      +{c.services.length - 3} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="mt-4 flex items-center justify-between text-xs text-skov-cream/50">
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {maskPhone(c.phone)}
                  </span>
                  <span>{c.reviews_count || 0} reviews</span>
                </div>

                {/* CTA */}
                <Link
                  href="/consultation"
                  className="btn-gold mt-5 w-full !py-2.5 text-sm"
                >
                  Contact via SKOV
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More */}
        {page < totalPages && !loading && (
          <div className="mt-10 text-center">
            <button
              onClick={loadMore}
              className="btn-outline-gold"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Loading...</>
              ) : (
                `Show More (${total - contractors.length} remaining)`
              )}
            </button>
          </div>
        )}
        {loading && contractors.length > 0 && (
          <div className="mt-6 text-center">
            <Loader2 className="h-6 w-6 text-skov-gold animate-spin mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
}
