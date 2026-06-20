"use client";

import { motion } from "framer-motion";
import { UserCheck, ShieldAlert, Award, FileText, CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "1. Apply & Submit KYC",
    desc: "Contractors apply online with registration documents, PAN, and local tax identification.",
    icon: FileText,
  },
  {
    title: "2. Rigorous Verification Check",
    desc: "SKOV audits past projects, conducts physical site visits, and checks reference clients directly.",
    icon: ShieldAlert,
  },
  {
    title: "3. Project Delivery Training",
    desc: "Selected partners train on cost estimation accuracy and client contract alignment.",
    icon: Award,
  },
  {
    title: "4. Featured Directory Listing",
    desc: "Only contractors who pass our evaluation get listed as verified inside our system.",
    icon: UserCheck,
  },
];

const checklistItems = [
  "Government registration & license check",
  "Previous site quality audit",
  "Financial stability verification",
  "Owner/Builder identity check (Aadhaar/PAN)",
  "Client testimonials verification (min. 2 references)",
];

export default function VerifiedContractors() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 md:py-32 border-t border-[#d4af37]/10 w-full max-w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
          {/* Left Column: Process steps */}
          <div className="space-y-12">
            <div>
              <div className="mb-3 inline-block rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-4 py-1 text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Vetting Layer
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f5f5f0] leading-tight">
                Our Verified Contractor Process
              </h2>
              <p className="mt-4 text-[#f5f5f0]/65 font-light text-sm sm:text-base leading-relaxed">
                Most directories list anyone who pays. SKOV uses a verification process covering business docs, site checks, and reference interviews.
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-xl border border-neutral-900 bg-[#0c0c0c] p-6 hover:border-[#d4af37]/30 transition"
                >
                  <div className="mb-4 grid h-9 w-9 place-items-center rounded-lg bg-[#d4af37]/10 text-[#d4af37]">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-[#f5f5f0] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#f5f5f0]/60 leading-relaxed font-light">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Verification list */}
          <div className="card-dark relative overflow-hidden border border-[#d4af37]/20 p-8 sm:p-10 rounded-2xl bg-[#0e0e0c]/90">
            <div className="absolute inset-0 bg-gold-radial opacity-40 pointer-events-none" />
            
            <div className="relative space-y-6">
              <h3 className="font-display text-2xl font-semibold text-[#f5f5f0]">
                SKOV Vetting Checklist
              </h3>
              <p className="text-sm text-[#f5f5f0]/60 font-light leading-relaxed">
                Before any local Mason, Contractor, or Firm obtains our badge, we verify:
              </p>
              
              <ul className="space-y-4">
                {checklistItems.map((item, idx) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex items-start gap-3 text-sm text-[#f5f5f0]/85 font-light"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="pt-6 border-t border-[#d4af37]/20 text-xs text-[#d4af37]/70 italic font-medium">
                * Zero tolerance policy. Misleading information results in automatic permanent ban.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
