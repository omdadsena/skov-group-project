"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, User, Phone, Mail, MapPin, MessageSquare, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "Raipur", date: "", time: "10:00", message: "" });

  const upd = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12 w-full max-w-full">
      <SectionHeading
        eyebrow="Free 20-min consultation"
        title="Book a SKOV expert"
        subtitle="Civil engineers and architects with 10+ years of experience — at your service."
      />

      <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <div className="card-dark p-5 sm:p-7">
          <h3 className="font-display text-xl">What you&apos;ll get</h3>
          <ul className="mt-5 space-y-4 text-sm text-skov-cream/80">
            {[
              "Personalized scope & budget review",
              "Contractor selection guidance",
              "Material cost & vendor recommendations",
              "Approvals & loan checklist",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-none text-skov-gold" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-xl border border-skov-gold/20 bg-skov-gold/5 p-4 text-sm text-skov-cream/75">
            <div className="font-medium text-skov-gold">100% free & no obligation.</div>
            SKOV is currently in its early-access launch phase.
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="card-dark p-5 sm:p-7"
        >
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-skov-gold/15 text-skov-gold">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-5 font-display text-2xl">Consultation booked!</h3>
              <p className="mt-2 text-skov-cream/65">Our team will WhatsApp you within 30 minutes to confirm.</p>
            </motion.div>
          ) : (
            <>
              <div className="mb-5 flex items-center gap-3">
                <CalendarCheck className="h-5 w-5 text-skov-gold" />
                <h3 className="font-display text-xl">Schedule your call</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="label-gold"><User className="inline h-4 w-4 text-skov-gold mr-1"/>Name</label>
                  <input required value={form.name} onChange={(e) => upd("name", e.target.value)} className="input-dark" placeholder="Your full name" />
                </div>
                <div>
                  <label className="label-gold"><Phone className="inline h-4 w-4 text-skov-gold mr-1"/>Phone</label>
                  <input required value={form.phone} onChange={(e) => upd("phone", e.target.value)} className="input-dark" placeholder="+91 90000 00000" />
                </div>
                <div className="md:col-span-2">
                  <label className="label-gold"><Mail className="inline h-4 w-4 text-skov-gold mr-1"/>Email</label>
                  <input type="email" required value={form.email} onChange={(e) => upd("email", e.target.value)} className="input-dark" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="label-gold"><MapPin className="inline h-4 w-4 text-skov-gold mr-1"/>City</label>
                  <select value={form.city} onChange={(e) => upd("city", e.target.value)} className="input-dark">
                    {["Raipur","Bilaspur","Bhilai","Korba","Other"].map((c) => <option key={c} className="bg-skov-black">{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-gold">Preferred date</label>
                  <input type="date" required value={form.date} onChange={(e) => upd("date", e.target.value)} className="input-dark" />
                </div>
                <div className="md:col-span-2">
                  <label className="label-gold">Preferred time</label>
                  <div className="flex flex-wrap gap-2">
                    {["10:00","12:00","15:00","17:00","19:00"].map((t) => (
                      <button type="button" key={t} onClick={() => upd("time", t)}
                        className={`rounded-full border px-4 py-2 text-sm ${form.time === t ? "border-skov-gold bg-skov-gold text-skov-black" : "border-skov-gold/30 hover:border-skov-gold/60"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="label-gold"><MessageSquare className="inline h-4 w-4 text-skov-gold mr-1"/>Tell us about your project</label>
                  <textarea value={form.message} onChange={(e) => upd("message", e.target.value)} rows={4} className="input-dark" placeholder="Plot size, location, budget, timeline…" />
                </div>
              </div>
              <button type="submit" className="btn-gold mt-6 w-full">Confirm Booking</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
