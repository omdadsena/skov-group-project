"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Shield, Users, Hammer, IndianRupee, TrendingUp, LogOut, BadgeCheck } from "lucide-react";
import { contractors } from "@/lib/contractors";

const ADMIN_PASSWORD = "skov2025";

const kpis = [
  { icon: Users, label: "Leads (30d)", value: "1,284", change: "+18%" },
  { icon: Hammer, label: "Active Contractors", value: contractors.length.toString(), change: "+3" },
  { icon: IndianRupee, label: "GMV Tracked", value: "₹4.2 Cr", change: "+22%" },
  { icon: TrendingUp, label: "Conversion", value: "12.4%", change: "+1.6%" },
];

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");

  if (!auth) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-5">
        <motion.form
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          onSubmit={(e) => { e.preventDefault(); if (pwd === ADMIN_PASSWORD) setAuth(true); else setErr("Incorrect password"); }}
          className="card-dark w-full p-8"
        >
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-skov-gold/10 text-skov-gold">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="mt-5 font-display text-2xl">Admin Access</h1>
          <p className="mt-1 text-sm text-skov-cream/60">Enter the admin password to continue.</p>
          <input
            type="password" value={pwd} onChange={(e) => { setPwd(e.target.value); setErr(""); }}
            className="input-dark mt-6" placeholder="Password"
          />
          {err && <p className="mt-2 text-sm text-red-400">{err}</p>}
          <button type="submit" className="btn-gold mt-5 w-full">Unlock Dashboard</button>
          <p className="mt-4 text-center text-xs text-skov-cream/40">Demo password: <span className="text-skov-gold">skov2025</span></p>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-skov-gold">
            <Shield className="h-3 w-3" /> Admin Dashboard
          </div>
          <h1 className="mt-2 font-display text-3xl md:text-4xl">Welcome back, SKOV team.</h1>
        </div>
        <button onClick={() => setAuth(false)} className="btn-outline-gold !py-2 !px-4 text-sm">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <motion.div key={k.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="card-dark p-6">
            <div className="flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-skov-gold/10 text-skov-gold">
                <k.icon className="h-5 w-5" />
              </div>
              <span className="text-xs text-skov-gold">{k.change}</span>
            </div>
            <div className="mt-4 font-display text-3xl">{k.value}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-skov-cream/55">{k.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 card-dark overflow-hidden">
        <div className="flex items-center justify-between border-b border-skov-gold/15 p-5">
          <h2 className="font-display text-xl">Verified contractors</h2>
          <span className="text-xs text-skov-cream/55">{contractors.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-skov-cream/55">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">City</th>
                <th className="px-5 py-3">Specialty</th>
                <th className="px-5 py-3">Projects</th>
                <th className="px-5 py-3">Rating</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {contractors.map((c) => (
                <tr key={c.id} className="border-t border-skov-gold/10 hover:bg-skov-gold/5">
                  <td className="px-5 py-3 font-medium">{c.name}</td>
                  <td className="px-5 py-3 text-skov-cream/70">{c.city}</td>
                  <td className="px-5 py-3 text-skov-cream/70">{c.specialty}</td>
                  <td className="px-5 py-3">{c.projects}</td>
                  <td className="px-5 py-3 text-skov-gold">★ {c.rating.toFixed(1)}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-skov-gold/15 px-2.5 py-1 text-xs text-skov-gold">
                      <BadgeCheck className="h-3 w-3" /> Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
