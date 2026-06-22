import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Hammer,
  House,
  MapPin,
  Package,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";
import { cityRoutes } from "@/lib/site-data";

export const homeFaqs = [
  {
    question: "How does SKOV GROUP verify contractors?",
    answer: "A gold verification badge is added only after document, identity, past-work, and reference checks are completed. Ordinary directory entries remain labelled Listed Contractor.",
  },
  {
    question: "Which Chhattisgarh cities does SKOV GROUP serve?",
    answer: "Current city pages cover Raipur, Bilaspur, Baloda Bazar, Bhilai, Durg, and Kawardha, with project consultation available for nearby locations.",
  },
  {
    question: "Are SKOV construction cost estimates final quotations?",
    answer: "No. Estimates are early planning ranges based on area, quality, and city assumptions. Final pricing requires site conditions, drawings, brands, and live supplier quotations.",
  },
  {
    question: "Can contractors apply for a verified listing?",
    answer: "Yes. Contractors can submit their business details, services, experience, and portfolio through the contractor application page for review.",
  },
];

const tools = [
  { icon: Calculator, title: "Construction Cost Bot", text: "Estimate city-wise project ranges.", href: "/ai-cost-estimator" },
  { icon: Wrench, title: "Renovation Advisor", text: "Prioritize repairs against your budget.", href: "/ai-bots" },
  { icon: Users, title: "Lead Qualification", text: "Turn an enquiry into a usable scope.", href: "/ai-bots" },
  { icon: Package, title: "Material Budget", text: "Plan cement, steel, tiles, and labour.", href: "/ai-bots" },
  { icon: House, title: "House Plan Assistant", text: "Explore room sizing and circulation.", href: "/ai-bots" },
  { icon: Camera, title: "Sketch to 3D", text: "Review a sketch-to-concept workflow.", href: "/ai-bots" },
];

const steps = [
  { icon: ClipboardCheck, title: "Share your requirement", text: "Tell us the city, service, area, budget, and timeline." },
  { icon: Calculator, title: "Plan the budget", text: "Use transparent early-stage cost and material estimates." },
  { icon: ShieldCheck, title: "Compare professionals", text: "Review listed contractors and clearly marked verification status." },
  { icon: Hammer, title: "Start with clarity", text: "Confirm scope, quotations, milestones, and responsibilities." },
];

export function ToolsSection() {
  return (
    <section className="below-fold section-shell bg-[#080808]" aria-labelledby="tools-title">
      <div className="content-shell">
        <p className="eyebrow">Construction planning tools</p>
        <h2 id="tools-title" className="section-title">Useful answers without loading a heavy app on the homepage</h2>
        <p className="section-copy">Each interactive tool opens on its dedicated page, keeping this page fast on mobile connections.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <article key={tool.title} className="card-dark p-6">
              <tool.icon aria-hidden="true" className="h-6 w-6 text-skov-gold" />
              <h3 className="mt-5 font-display text-xl">{tool.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-skov-cream/75">{tool.text}</p>
              <Link href={tool.href} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-skov-gold underline-offset-4 hover:underline">
                Open tool <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="below-fold section-shell bg-[#060606]" aria-labelledby="process-title">
      <div className="content-shell">
        <p className="eyebrow">How SKOV works</p>
        <h2 id="process-title" className="section-title">A clearer path from idea to execution</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.title} className="card-dark p-6">
              <span className="text-sm font-bold text-skov-gold">0{index + 1}</span>
              <step.icon aria-hidden="true" className="mt-5 h-6 w-6 text-skov-gold" />
              <h3 className="mt-4 font-display text-lg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-skov-cream/75">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CityLinksSection() {
  return (
    <section id="cities" className="below-fold section-shell bg-[#0a0a0a]" aria-labelledby="cities-title">
      <div className="content-shell">
        <p className="eyebrow">Local coverage</p>
        <h2 id="cities-title" className="section-title">Construction services across Chhattisgarh</h2>
        <p className="section-copy">Explore city-specific contractor listings, services, cost context, FAQs, and internal resources.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cityRoutes.map((city) => (
            <Link key={city.city} href={city.href} className="card-dark flex min-h-24 items-center gap-4 p-5 transition hover:border-skov-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skov-gold">
              <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-skov-gold" />
              <span className="font-display text-lg">Contractors in {city.city}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerCta() {
  return (
    <section className="below-fold section-shell bg-[#060606]" aria-labelledby="partner-title">
      <div className="content-shell">
        <div className="rounded-3xl border border-skov-gold/30 bg-[#11100d] p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow">For contractors</p>
              <h2 id="partner-title" className="section-title">Build trust with a clearer local profile</h2>
              <p className="section-copy">Apply for city visibility and eligibility for the SKOV Verified badge.</p>
              <Link href="/join" className="btn-gold mt-7">Apply for verification <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
            <ul className="space-y-4 text-sm text-skov-cream/80">
              {["Clear listed or verified status", "City and service visibility", "Direct project enquiries", "No false guaranteed-lead claims"].map((benefit) => (
                <li key={benefit} className="flex gap-3">
                  <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-skov-gold" /> {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeFaq() {
  return (
    <section className="below-fold section-shell bg-[#0a0a0a]" aria-labelledby="faq-title">
      <div className="mx-auto w-full max-w-4xl px-4 md:px-8">
        <p className="eyebrow">Frequently asked questions</p>
        <h2 id="faq-title" className="section-title">Straight answers for homeowners and contractors</h2>
        <div className="mt-10 space-y-4">
          {homeFaqs.map((item) => (
            <details key={item.question} className="card-dark group p-5">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-skov-cream focus-visible:outline-none">
                {item.question}
                <Sparkles aria-hidden="true" className="h-4 w-4 shrink-0 text-skov-gold" />
              </summary>
              <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-skov-cream/75">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConsultationBanner() {
  return (
    <section className="below-fold section-shell bg-[#080808]" aria-labelledby="consultation-title">
      <div className="content-shell text-center">
        <Paintbrush aria-hidden="true" className="mx-auto h-7 w-7 text-skov-gold" />
        <h2 id="consultation-title" className="section-title mx-auto mt-4 max-w-3xl">Need help with cost, design, renovation, or contractor selection?</h2>
        <p className="section-copy mx-auto">Submit your project details and continue the conversation with the SKOV GROUP team.</p>
        <Link href="/consultation" className="btn-gold mt-7">Request consultation <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
