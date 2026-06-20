"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Hammer, CheckCircle2, BadgeCheck, Shield, TrendingUp } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const perks = [
  { icon: TrendingUp, title: "Early Partner Access", desc: "Be among the first contractors considered for the Chhattisgarh launch." },
  { icon: Shield, title: "Verification Profile", desc: "Complete the review process before your profile goes live." },
  { icon: BadgeCheck, title: "Zero Joining Fee", desc: "Only pay a small fee when you win a project." },
];

export default function JoinPage() {
  const [done, setDone] = useState(false);
  const [f, setF] = useState({
    company: "", contact: "", phone: "", email: "", city: "Raipur",
    specialty: "Residential", experience: "5", gst: "", portfolio: "",
  });
  const u = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12 w-full max-w-full">
      <SectionHeading
        eyebrow="For contractors"
        title="Join SKOV as an early partner"
        subtitle="Apply for onboarding and help shape a more transparent construction network."
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

        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="card-dark p-5 sm:p-7">
          {done ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-skov-gold/15 text-skov-gold">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-5 font-display text-2xl">Application received</h3>
              <p className="mt-2 text-skov-cream/65">Our partnerships team will reach out within 48 hours after verification.</p>
            </motion.div>
          ) : (
            <>
              <div className="mb-5 flex items-center gap-3">
                <Hammer className="h-5 w-5 text-skov-gold" />
                <h3 className="font-display text-xl">Contractor onboarding</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="label-gold">Company name</label>
                  <input required value={f.company} onChange={(e) => u("company", e.target.value)} className="input-dark" />
                </div>
                <div>
                  <label className="label-gold">Contact person</label>
                  <input required value={f.contact} onChange={(e) => u("contact", e.target.value)} className="input-dark" />
                </div>
                <div>
                  <label className="label-gold">Phone</label>
                  <input required value={f.phone} onChange={(e) => u("phone", e.target.value)} className="input-dark" />
                </div>
                <div>
                  <label className="label-gold">Email</label>
                  <input type="email" required value={f.email} onChange={(e) => u("email", e.target.value)} className="input-dark" />
                </div>
                <div>
                  <label className="label-gold">Primary city</label>
                  <select value={f.city} onChange={(e) => u("city", e.target.value)} className="input-dark">
                    {["Raipur","Bilaspur","Bhilai","Korba","Other"].map((c) => <option key={c} className="bg-skov-black">{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-gold">Specialty</label>
                  <select value={f.specialty} onChange={(e) => u("specialty", e.target.value)} className="input-dark">
                    {["Residential","Villas","Commercial","Renovation","Interiors","Heritage"].map((c) => <option key={c} className="bg-skov-black">{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-gold">Years of experience</label>
                  <input type="number" min={0} value={f.experience} onChange={(e) => u("experience", e.target.value)} className="input-dark" />
                </div>
                <div>
                  <label className="label-gold">GST number</label>
                  <input value={f.gst} onChange={(e) => u("gst", e.target.value)} className="input-dark" placeholder="22ABCDE1234F1Z5" />
                </div>
                <div className="md:col-span-2">
                  <label className="label-gold">Portfolio link (Drive / Website)</label>
                  <input value={f.portfolio} onChange={(e) => u("portfolio", e.target.value)} className="input-dark" placeholder="https://…" />
                </div>
              </div>
              <button type="submit" className="btn-gold mt-6 w-full">Apply for Verification</button>
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
