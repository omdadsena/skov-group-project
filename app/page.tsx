"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck, Compass, MapPin, Sparkles, Calculator, MessageSquare,
  Hammer, Building2, BadgeCheck, ArrowRight, TrendingUp, Bot, Coins
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const trustBadges = [
  { icon: ShieldCheck, label: "Verification-First Onboarding" },
  { icon: BadgeCheck, label: "Transparent Cost Planning" },
  { icon: Compass, label: "Expert-Guided Decisions" },
  { icon: MapPin, label: "Launching in Chhattisgarh" },
];

const aiTools = [
  { icon: Bot, title: "AI Bot Hub", desc: "10 specialist bots: Sketch→3D, Cost, Contractor Match, Renovation & more.", href: "/ai-bots", highlight: true },
  { icon: Calculator, title: "AI Cost Estimator", desc: "Get instant ₹/sqft estimates by city, quality, and area.", href: "/ai-cost-estimator" },
  { icon: Hammer, title: "Contractor Match", desc: "Smart-matched verified contractors based on your project.", href: "/contractors" },
  { icon: MessageSquare, title: "Expert Consultation", desc: "Book a 20-min call with an experienced civil engineer.", href: "/consultation" },
  { icon: Coins, title: "SKOV Coins Rewards", desc: "Earn coins for actions — unlock consultations, reports & contractor access.", href: "/ai-bots" },
  { icon: TrendingUp, title: "Loan & EMI Guide", desc: "Bank-tied home-loan pre-qualification and EMI math.", href: "#" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gold-radial pointer-events-none" />
        <div className="absolute inset-0 bg-hero-grid bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-skov-gold/40 bg-skov-gold/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-skov-gold"
          >
            <Sparkles className="h-3 w-3" /> India&apos;s Trust Layer for Construction
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight"
          >
            Build Your <span className="gold-text">Dream Home</span><br />
            With Absolute Trust.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-skov-cream/70 md:text-lg"
          >
            A verification-first construction platform bringing clearer cost planning, contractor discovery, and expert guidance to homeowners.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/ai-cost-estimator" className="btn-gold">
              Estimate My Home <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contractors" className="btn-outline-gold">Browse Contractors</Link>
          </motion.div>

          {/* Trust badges */}
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {trustBadges.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="card-dark flex items-center gap-3 px-4 py-4"
              >
                <div className="grid h-10 w-10 place-items-center rounded-full bg-skov-gold/15 text-skov-gold">
                  <b.icon className="h-5 w-5" />
                </div>
                <span className="text-sm text-skov-cream/85">{b.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI TOOLS GRID */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <SectionHeading
          eyebrow="AI-Powered Suite"
          title="Tools that protect every rupee you invest"
          subtitle="From estimation to expert advice — built so families and NRIs can build without worry."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {aiTools.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="card-dark group relative overflow-hidden p-6 transition hover:border-skov-gold/40 hover:shadow-gold"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-skov-gold/10 blur-2xl opacity-0 transition group-hover:opacity-100" />
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-skov-gold/10 text-skov-gold">
                <t.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl">{t.title}</h3>
              <p className="mt-2 text-sm text-skov-cream/65">{t.desc}</p>
              <Link href={t.href} className="mt-5 inline-flex items-center gap-2 text-sm text-skov-gold hover:gap-3 transition-all">
                Explore <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="card-dark relative overflow-hidden p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-gold-radial opacity-70 pointer-events-none" />
          <h3 className="relative font-display text-3xl md:text-5xl">
            Ready to build, <span className="gold-text">the right way</span>?
          </h3>
          <p className="relative mx-auto mt-4 max-w-xl text-skov-cream/70">
            Talk to a SKOV expert today — free, 20 minutes, zero obligation.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/consultation" className="btn-gold">Book Free Consultation</Link>
            <Link href="/join-as-contractor" className="btn-outline-gold">Join as Contractor</Link>
          </div>
        </div>
      </section>
    </>
  );
}
