"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQItem } from "../../Types";

const faqData: FAQItem[] = [
  {
    question: "Is it really free to use SKOV GROUP's AI tools?",
    answer: "Yes. All AI tools — including the Construction Cost Estimator, Sketch to 3D Visualizer, and the Planning Assistant — are 100% free with no subscription cards or hidden service charges.",
  },
  {
    question: "How does SKOV verify local contractors?",
    answer: "Our vetting protocol covers government registration audits, identity verification (PAN/Aadhaar), manual site checks of active construction phases, and direct reference interviews with past clients.",
  },
  {
    question: "Does SKOV charge homeowners a commission on projects?",
    answer: "No. SKOV is an intelligence database layer. Homeowners access tools, search contractor parameters, and consult civil engineers directly for free.",
  },
  {
    question: "Are cost estimations accurate for Raipur, Bilaspur, and Bhilai?",
    answer: "Yes. Our cost engine utilizes dynamic local price indices reflecting cement, brick, coarse sand, and TMT bar rates specific to Chhattisgarh distribution centers.",
  },
  {
    question: "What items are covered in the AI Cost Estimator breakdown?",
    answer: "The estimate is split into civil structure (masonry, foundations), finishes & interior woodwork, plumbing & electrical installation, professional architect fees, and municipal approval provisions.",
  },
  {
    question: "How does the Sketch to 3D Design tool work?",
    answer: "You upload a blueprint sketch. The model analyzes boundaries and structures to output contemporary elevation renders representing luxury or standard themes.",
  },
  {
    question: "Can I book a consultation call from outside Chhattisgarh or India?",
    answer: "Absolutely. We routinely consult NRIs who want to build ancestral family homes or manage residential land plots in Durg, Bilaspur, or Raipur.",
  },
  {
    question: "How can a local contractor apply to join the verified network?",
    answer: "Local builders can click 'Join as Contractor' to submit project portfolios and KYC documents. Vetting and physical site check cycles take 3-5 business days.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="relative bg-[#0a0a0a] py-24 md:py-32 border-t border-[#d4af37]/10 w-full max-w-full">
      <div className="mx-auto max-w-4xl px-4 md:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="mb-3 inline-block rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-4 py-1 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Help Center
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f5f5f0] leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-[#f5f5f0]/65 font-light text-base">
            Get clear, honest answers about our tools, databases, and verification processes.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-900 bg-[#0c0c0c] overflow-hidden transition hover:border-[#d4af37]/20"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left transition duration-200"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#f5f5f0]/95 pr-4">
                    {item.question}
                  </span>
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-neutral-900 border border-neutral-800 text-[#d4af37] flex-shrink-0">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-sm text-[#f5f5f0]/65 leading-relaxed font-light border-t border-neutral-900/60 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
