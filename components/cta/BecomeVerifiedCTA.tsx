"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, CheckCircle2, ArrowRight, Star, Users, Phone, Image, TrendingUp } from "lucide-react";

interface BecomeVerifiedCTAProps {
  variant?: "banner" | "sidebar" | "compact";
}

const benefits = [
  { icon: Shield, text: "Verified badge on search results" },
  { icon: TrendingUp, text: "Priority listing (appear first)" },
  { icon: Phone, text: "Direct client contact access" },
  { icon: Image, text: "Profile with photos + reviews" },
  { icon: Star, text: "City-wise visibility in the contractor directory" },
];

export default function BecomeVerifiedCTA({ variant = "banner" }: BecomeVerifiedCTAProps) {
  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-skov-gold/30 bg-skov-gold/5 p-4 flex items-center justify-between gap-4 flex-wrap"
      >
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-skov-gold flex-shrink-0" />
          <span className="text-sm text-skov-cream font-medium">
            Are you a contractor? Apply for early partner onboarding
          </span>
        </div>
        <Link
          href="/join"
          className="inline-flex items-center gap-1.5 rounded-full bg-skov-gold px-4 py-2 text-xs font-semibold text-skov-black hover:bg-[#d8b572] transition whitespace-nowrap"
        >
          Apply Now <ArrowRight className="h-3 w-3" />
        </Link>
      </motion.div>
    );
  }

  if (variant === "sidebar") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl border border-skov-gold/25 bg-[#151515] p-5 space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-skov-gold/10 text-skov-gold">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-display text-base font-semibold text-skov-cream">Become Verified</h4>
            <p className="text-xs text-skov-cream/50">Join the contractor network</p>
          </div>
        </div>
        <div className="space-y-2.5">
          {benefits.slice(0, 3).map((b) => (
            <div key={b.text} className="flex items-center gap-2 text-xs text-skov-cream/75">
              <CheckCircle2 className="h-3.5 w-3.5 text-skov-gold flex-shrink-0" />
              {b.text}
            </div>
          ))}
        </div>
        <Link
          href="/join"
          className="btn-gold w-full !py-2.5 text-sm"
        >
          Apply for Verification <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    );
  }

  // Default: banner variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-skov-gold/30 bg-gradient-to-r from-[#151515] via-[#1a1810] to-[#151515] p-6 md:p-8"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-skov-gold/15 text-skov-gold">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-skov-cream">
                Become a SKOV Verified Contractor
              </h3>
              <p className="text-sm text-skov-cream/60">
                Complete onboarding before the public directory launches
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {benefits.map((b) => (
              <div key={b.text} className="flex items-center gap-2 text-sm text-skov-cream/80">
                <CheckCircle2 className="h-4 w-4 text-skov-gold flex-shrink-0" />
                {b.text}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0">
          <Link
            href="/join"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-skov-gold px-8 py-4 text-base font-semibold text-skov-black shadow-gold hover:bg-[#d8b572] transition duration-300 hover:shadow-[0_10px_40px_rgba(201,164,92,0.5)] transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            Apply for Verification <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mt-2 text-center text-xs text-skov-cream/40">Free to apply • Verify in 2-3 days</p>
        </div>
      </div>
    </motion.div>
  );
}
