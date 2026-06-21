"use client";

import { motion } from "framer-motion";
import { MapPin, Sparkles, Layout } from "lucide-react";
import { Project } from "../../Types";

const projects: Project[] = [
  {
    id: "proj1",
    title: "The Goldstone Duplex",
    city: "Raipur",
    type: "Residential Duplex",
    image: "bg-gradient-to-tr from-[#0a0a0a] via-[#1a1813] to-[#2c2415]",
  },
  {
    id: "proj2",
    title: "Bilaspur Heights Villa",
    city: "Bilaspur",
    type: "Premium Villa",
    image: "bg-gradient-to-tr from-[#0a0a0a] via-[#181a13] to-[#222c15]",
  },
  {
    id: "proj3",
    title: "Civic Center Commercial",
    city: "Bhilai",
    type: "Commercial Office",
    image: "bg-gradient-to-tr from-[#0a0a0a] via-[#13171a] to-[#15232c]",
  },
  {
    id: "proj4",
    title: "Kawardha Royal Bungalow",
    city: "Kawardha",
    type: "Heritage Bungalow",
    image: "bg-gradient-to-tr from-[#0a0a0a] via-[#1a1318] to-[#2c1523]",
  },
];

export default function ProjectsGallery() {
  return (
    <section className="relative bg-[#060606] py-24 md:py-32 border-t border-[#d4af37]/10 w-full max-w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-3 inline-block rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-4 py-1 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Design Concepts
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f5f5f0] leading-tight">
            Concept Gallery Preview
          </h2>
          <p className="mt-4 text-[#f5f5f0]/65 font-light text-base sm:text-lg">
            Illustrative project directions for exploring styles, locations, and construction goals.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative rounded-2xl overflow-hidden border border-neutral-900 bg-[#0a0a0a] hover:border-[#d4af37]/50 transition duration-300 shadow-lg"
            >
              {/* Card visual wrapper */}
              <div className={`h-[220px] w-full ${p.image} flex items-center justify-center p-6 transition duration-500 group-hover:scale-102`}>
                <div className="opacity-15 group-hover:opacity-30 transition duration-300">
                  <Layout className="w-16 h-16 text-[#d4af37]" />
                </div>
              </div>

              {/* Detail block */}
              <div className="p-5 space-y-3 bg-[#0c0c0c]">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#d4af37]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#d4af37] uppercase tracking-wider">
                    <MapPin className="h-3 w-3" /> {p.city}
                  </span>
                  <span className="text-[10px] text-[#f5f5f0]/50 font-medium">
                    {p.type}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#f5f5f0] leading-snug group-hover:text-[#d4af37] transition duration-200">
                  {p.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
