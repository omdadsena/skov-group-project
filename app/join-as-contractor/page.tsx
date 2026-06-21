"use client";
import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Hammer, CheckCircle2, BadgeCheck, Shield, TrendingUp, Phone, Star, ArrowRight, Loader2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const perks = [
  { icon: BadgeCheck, title: "Verified Badge", desc: "Get the SKOV Verified trust mark on your profile." },
  { icon: TrendingUp, title: "Priority Listing", desc: "Appear first in client searches across your city." },
  { icon: Phone, title: "Direct Client Access", desc: "Get client phone numbers & project details directly." },
  { icon: Star, title: "Early Network Visibility", desc: "Build a complete profile before the public directory launches." },
  { icon: Shield, title: "Zero Joining Fee", desc: "Apply for free, pay only when you win projects." },
];

const SERVICE_OPTIONS = [
  "Construction", "Renovation", "Interior Design", "Electrical",
  "Plumbing", "Painting", "Carpentry", "Architectural", "Commercial",
];

const STATES = [
  "Chhattisgarh", "Maharashtra", "Delhi", "Karnataka", "Telangana",
  "Tamil Nadu", "Gujarat", "Rajasthan", "Uttar Pradesh", "West Bengal",
  "Madhya Pradesh", "Kerala", "Punjab", "Haryana", "Bihar",
  "Jharkhand", "Odisha", "Andhra Pradesh", "Goa", "Uttarakhand",
];

export default function JoinPage() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [f, setF] = useState({
    company: "", contact: "", phone: "", email: "", city: "Raipur",
    state: "Chhattisgarh", specialty: "Residential", experience: "5",
    gst: "", portfolio: "", license: "",
  });
  const u = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  const toggleService = (s: string) => {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validatePhone(f.phone)) {
      setError("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    if (f.email && !validateEmail(f.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (selectedServices.length === 0) {
      setError("Please select at least one service type.");
      return;
    }

    setSubmitting(true);
    try {
      const { error: dbError } = await supabase.from("contractor_applications").insert({
        name: f.contact,
        company_name: f.company,
        phone: f.phone,
        email: f.email || null,
        city: f.city,
        state: f.state,
        services: selectedServices,
        license_number: f.license || null,
        gst_number: f.gst || null,
        experience_years: parseInt(f.experience) || 0,
        portfolio_urls: f.portfolio ? [f.portfolio] : [],
      });
      if (dbError) throw dbError;
      setDone(true);
    } catch (err: any) {
      const missingTable =
        err?.code === "PGRST205" ||
        err?.message?.includes("contractor_applications");
      setError(missingTable
        ? "Applications are temporarily unavailable. Try again or chat on WhatsApp."
        : "Failed to submit. Try again or chat on WhatsApp.");
    }
    setSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12 w-full max-w-full">
      <SectionHeading
        eyebrow="For contractors"
        title="Join SKOV as an Early Partner"
        subtitle="Apply for review and build a more trustworthy contractor profile."
      />

      <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1.5fr]">
        <div className="space-y-5">
          {perks.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="card-dark flex gap-4 p-4 sm:p-5">
              <div className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-skov-gold/10 text-skov-gold">
                <p.icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display text-lg">{p.title}</h4>
                <p className="text-sm text-skov-cream/65">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="card-dark p-5 sm:p-7">
          {done ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center space-y-5">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-skov-gold/15 text-skov-gold">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-display text-2xl">Application Submitted!</h3>
              <p className="text-skov-cream/65">We&apos;ll verify your details in 2-3 business days and get back to you.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/919131800113?text=Hi%20SKOV%20GROUP%2C%20I%20just%20submitted%20my%20contractor%20application.%20Please%20help%20with%20faster%20verification."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  <Phone className="h-4 w-4" /> Chat on WhatsApp for Faster Approval
                </a>
                <Link href="/" className="btn-outline-gold">Back to Home</Link>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="mb-5 flex items-center gap-3">
                <Hammer className="h-5 w-5 text-skov-gold" />
                <h3 className="font-display text-xl">Contractor Verification Application</h3>
              </div>

              {error && (
                <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                  {error}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="label-gold">Company name *</label>
                  <input required value={f.company} onChange={(e) => u("company", e.target.value)} className="input-dark" />
                </div>
                <div>
                  <label className="label-gold">Contact person *</label>
                  <input required value={f.contact} onChange={(e) => u("contact", e.target.value)} className="input-dark" />
                </div>
                <div>
                  <label className="label-gold">Phone (10 digits) *</label>
                  <input required value={f.phone} onChange={(e) => u("phone", e.target.value)} className="input-dark" placeholder="9131800113" maxLength={10} />
                </div>
                <div>
                  <label className="label-gold">Email</label>
                  <input type="email" value={f.email} onChange={(e) => u("email", e.target.value)} className="input-dark" />
                </div>
                <div>
                  <label className="label-gold">City *</label>
                  <input required value={f.city} onChange={(e) => u("city", e.target.value)} className="input-dark" />
                </div>
                <div>
                  <label className="label-gold">State *</label>
                  <select value={f.state} onChange={(e) => u("state", e.target.value)} className="input-dark">
                    {STATES.map((s) => <option key={s} className="bg-skov-black">{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-gold">Years of experience</label>
                  <input type="number" min={0} value={f.experience} onChange={(e) => u("experience", e.target.value)} className="input-dark" />
                </div>
                <div>
                  <label className="label-gold">License / Registration number</label>
                  <input value={f.license} onChange={(e) => u("license", e.target.value)} className="input-dark" placeholder="Optional" />
                </div>
                <div>
                  <label className="label-gold">GST number</label>
                  <input value={f.gst} onChange={(e) => u("gst", e.target.value)} className="input-dark" placeholder="22ABCDE1234F1Z5" />
                </div>
                <div>
                  <label className="label-gold">Portfolio link (Drive / Website)</label>
                  <input value={f.portfolio} onChange={(e) => u("portfolio", e.target.value)} className="input-dark" placeholder="https://…" />
                </div>
              </div>

              {/* Services Multi-select */}
              <div className="mt-5">
                <label className="label-gold">Services offered (select all that apply) *</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {SERVICE_OPTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleService(s)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${
                        selectedServices.includes(s)
                          ? "border-skov-gold bg-skov-gold/15 text-skov-gold font-medium"
                          : "border-skov-gold/20 text-skov-cream/60 hover:border-skov-gold/40"
                      }`}
                    >
                      {selectedServices.includes(s) && <CheckCircle2 className="inline h-3 w-3 mr-1" />}
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={submitting} className="btn-gold mt-6 w-full disabled:opacity-60">
                {submitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
                ) : (
                  <>Apply for Verification <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
              <p className="mt-3 text-center text-xs text-skov-cream/50">
                By applying, you agree to SKOV&apos;s partner terms and on-site verification visit.
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
