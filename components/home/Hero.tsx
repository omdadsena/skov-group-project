import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] pt-32 pb-24 md:pt-40 md:pb-36 flex flex-col items-center text-center">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)] opacity-60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center">
        {/* Subtle Luxury Badge */}
        <div
          className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/5 px-4 py-2 text-center text-[10px] uppercase tracking-[0.18em] text-[#d4af37] sm:text-xs sm:tracking-[0.25em]"
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0" /> Construction services across Chhattisgarh
        </div>

        {/* Trillion-dollar Heading */}
        <h1
          className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#f5f5f0] sm:text-5xl md:text-7xl"
        >
          Verified Contractors &amp; Construction Services{" "}
          <span className="gold-text">in Chhattisgarh</span>
        </h1>

        {/* Value Proposition */}
        <p
          className="mt-8 max-w-3xl text-base leading-relaxed text-[#f5f5f0]/85 sm:text-xl"
        >
          Compare listed contractors, estimate project costs, explore home-design tools, and get practical construction guidance in one place.
        </p>

        {/* Call to Actions */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/contractors"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-[#d4af37] px-8 py-4 text-base font-semibold text-[#0a0a0a] shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:bg-[#c5a043] transition duration-300 hover:shadow-[0_10px_40px_rgba(212,175,55,0.5)] transform hover:-translate-y-0.5"
          >
            Find Contractors <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/ai-cost-estimator"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-[#f5f5f0]/40 bg-[#f5f5f0]/5 px-8 py-4 text-base font-semibold text-[#f5f5f0] hover:bg-[#f5f5f0]/10 hover:border-[#f5f5f0] transition duration-300"
          >
            Get Cost Estimate
          </Link>
        </div>
      </div>
    </section>
  );
}
