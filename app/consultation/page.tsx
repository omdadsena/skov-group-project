"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Phone } from "lucide-react";
import { supabase } from "@/lib/supabase";

const phonePattern = /^[6-9]\d{9}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ConsultationPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "Home Construction",
    city: "Raipur",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!phonePattern.test(form.phone)) {
      setError("Enter a valid 10-digit Indian phone number.");
      return;
    }
    if (form.email && !emailPattern.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const { error: insertError } = await supabase.from("leads").insert({
        name: form.name.trim(),
        phone: form.phone,
        email: form.email.trim() || null,
        service_type: form.serviceType,
        city: form.city.trim(),
        message: form.message.trim() || null,
      });
      if (insertError) throw insertError;
      setSubmitted(true);
    } catch {
      setError("Failed to submit. Try again or chat on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-shell py-28 md:py-36">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="eyebrow">Construction Consultation</p>
          <h1 className="section-title">Get clarity before you commit</h1>
          <p className="section-copy">
            Share your project scope and our team will follow up about budget planning, contractor discovery, design, or renovation.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-skov-cream/75">
            {["Project scope and budget review", "Contractor selection guidance", "Material and timeline planning", "Clear next-step checklist"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-skov-gold" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-dark p-5 sm:p-8">
          {submitted ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-skov-gold" />
              <h2 className="mt-5 font-display text-2xl">Consultation request received</h2>
              <p className="mt-2 text-sm text-skov-cream/65">We’ll contact you shortly to understand the project.</p>
              <a
                href="https://wa.me/919131800113?text=Hi%20SKOV%20GROUP%2C%20I%20submitted%20a%20consultation%20request."
                className="btn-gold mt-7"
              >
                <Phone className="h-4 w-4" /> Continue on WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="consultation-name" className="label-gold">Name *</label>
                <input id="consultation-name" autoComplete="name" required className="input-dark" value={form.name} onChange={(e) => update("name", e.target.value)} />
              </div>
              <div>
                <label htmlFor="consultation-phone" className="label-gold">Phone *</label>
                <input id="consultation-phone" autoComplete="tel" aria-describedby={error ? "consultation-error" : undefined} required inputMode="numeric" maxLength={10} className="input-dark" value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))} />
              </div>
              <div>
                <label htmlFor="consultation-email" className="label-gold">Email</label>
                <input id="consultation-email" autoComplete="email" type="email" className="input-dark" value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
              <div>
                <label htmlFor="consultation-city" className="label-gold">City *</label>
                <input id="consultation-city" autoComplete="address-level2" required className="input-dark" value={form.city} onChange={(e) => update("city", e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="consultation-service" className="label-gold">Service needed *</label>
                <select id="consultation-service" className="input-dark" value={form.serviceType} onChange={(e) => update("serviceType", e.target.value)}>
                  {["Home Construction", "Renovation", "Interiors", "Cost Estimate", "3D Design", "Contractor Matching"].map((service) => (
                    <option key={service} className="bg-skov-black">{service}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="consultation-details" className="label-gold">Project details</label>
                <textarea id="consultation-details" rows={5} className="input-dark resize-none" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Plot size, budget, timeline, and what you need help with…" />
              </div>
              {error && <p id="consultation-error" role="alert" aria-live="polite" className="sm:col-span-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
              <button disabled={loading} className="btn-gold sm:col-span-2 w-full disabled:opacity-60">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : "Request Consultation"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
