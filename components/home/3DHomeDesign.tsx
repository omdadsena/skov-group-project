"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ThreeDHomeDesign() {
  const [activeTab, setActiveTab] = useState<"sketch" | "render">("render");

  return (
    <section className="relative bg-[#0a0a0a] py-24 md:py-32 border-t border-[#d4af37]/10 w-full max-w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
          {/* Left Column: Description & info */}
          <div className="space-y-8">
            <div>
              <div className="mb-3 inline-block rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-4 py-1 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                AI Visualizer
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f5f5f0] leading-tight">
                3D Home Design Assist
              </h2>
              <p className="mt-4 text-[#f5f5f0]/65 font-light text-sm sm:text-base leading-relaxed">
                Transform rough sketches or floor plan layouts into premium photorealistic 3D architectural renders. Click tabs on the right to compare the inputs and outputs.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-[#d4af37]/15 text-[#d4af37]">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f5f5f0]">1. Draft Sketch</h4>
                  <p className="text-xs text-[#f5f5f0]/60 mt-0.5 font-light">
                    Upload your hand-drawn drawing showing rooms, doors, and site dimensions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-[#d4af37]/15 text-[#d4af37]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#f5f5f0]">2. AI Elevation Render</h4>
                  <p className="text-xs text-[#f5f5f0]/60 mt-0.5 font-light">
                    SKOV Bot processes boundaries and textures to render elevation variations.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/ai-bots"
                className="inline-flex items-center gap-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 px-6 py-3 text-sm font-semibold text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a] transition duration-300"
              >
                Try Sketch → 3D Bot <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Comparison frame */}
          <div className="space-y-4">
            {/* Tabs */}
            <div className="flex gap-2 bg-[#0c0c0c] border border-neutral-900 p-1.5 rounded-xl">
              <button
                onClick={() => setActiveTab("sketch")}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold uppercase tracking-wider transition duration-300 ${
                  activeTab === "sketch"
                    ? "bg-neutral-800 text-[#f5f5f0]"
                    : "text-[#f5f5f0]/45 hover:text-[#f5f5f0]/70"
                }`}
              >
                <FileText className="h-4 w-4" /> Client Blueprint Sketch
              </button>
              <button
                onClick={() => setActiveTab("render")}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold uppercase tracking-wider transition duration-300 ${
                  activeTab === "render"
                    ? "bg-[#d4af37] text-[#0a0a0a]"
                    : "text-[#f5f5f0]/45 hover:text-[#f5f5f0]/70"
                }`}
              >
                <Eye className="h-4 w-4" /> AI 3D Elevation Render
              </button>
            </div>

            {/* Simulated frame viewport */}
            <div className="relative h-[280px] sm:h-[380px] rounded-2xl overflow-hidden border border-neutral-900 bg-[#0d0d0c] shadow-[0_12px_30px_rgba(0,0,0,0.8)]">
              <AnimatePresence mode="wait">
                {activeTab === "sketch" ? (
                  <motion.div
                    key="sketch"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center"
                  >
                    {/* Sketch graphics (SVG outline mockup) */}
                    <svg
                      className="w-48 h-48 text-[#d4af37]/35 stroke-current stroke-[1.5]"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <rect x="10" y="10" width="80" height="80" rx="3" />
                      <line x1="50" y1="10" x2="50" y2="90" />
                      <line x1="10" y1="50" x2="90" y2="50" />
                      <line x1="30" y1="10" x2="30" y2="50" />
                      <circle cx="50" cy="50" r="12" className="fill-[#d4af37]/5" />
                      <text x="15" y="25" fontSize="6" fill="#f5f5f0" opacity="0.5">
                        MASTER BED
                      </text>
                      <text x="55" y="25" fontSize="6" fill="#f5f5f0" opacity="0.5">
                        LIVING AREA
                      </text>
                      <text x="15" y="65" fontSize="6" fill="#f5f5f0" opacity="0.5">
                        KITCHEN
                      </text>
                      <text x="55" y="65" fontSize="6" fill="#f5f5f0" opacity="0.5">
                        FOYER
                      </text>
                    </svg>
                    <div className="text-xs text-[#f5f5f0]/50 uppercase tracking-widest mt-4">
                      Simulated Draft Blueprint
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="render"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#0c0c0c] to-[#121210]"
                  >
                    {/* Premium rendered representation */}
                    <div className="relative border border-[#d4af37]/20 p-6 rounded-xl bg-black/40 shadow-inner max-w-sm">
                      <div className="absolute top-3 right-3 rounded-full bg-[#d4af37]/20 px-2 py-0.5 text-[8px] text-[#d4af37] font-bold uppercase tracking-widest">
                        HD 3D
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 grid place-items-center mx-auto text-[#d4af37] mb-4">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <h4 className="font-display text-[#f5f5f0] text-lg font-bold">
                        Contemporary Villa Render
                      </h4>
                      <p className="text-xs text-[#f5f5f0]/65 mt-2 font-light leading-relaxed">
                        Double-height facade, premium wood panel highlights, ambient cove highlights, and anti-skid terrace parameters.
                      </p>
                    </div>
                    <div className="text-xs text-[#d4af37] uppercase tracking-widest mt-6 font-semibold">
                      Generated 3D Presentation model
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
