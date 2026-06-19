import Link from "next/link";
import { ShieldCheck, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-skov-gold/15 bg-black/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full border border-skov-gold/50 bg-skov-gold/10">
              <ShieldCheck className="h-5 w-5 text-skov-gold" />
            </div>
            <div className="font-display text-xl gold-text">SKOV GROUP</div>
          </div>
          <p className="mt-4 text-sm text-skov-cream/60">
            India&apos;s trust layer for construction. Verified contractors, transparent pricing, and AI-powered planning.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-skov-gold">Explore</h4>
          <ul className="space-y-2 text-sm text-skov-cream/70">
            <li><Link href="/ai-bots" className="hover:text-skov-gold">AI Bot Hub</Link></li>
            <li><Link href="/ai-bots" className="hover:text-skov-gold">SKOV Coins Rewards</Link></li>
            <li><Link href="/contractors" className="hover:text-skov-gold">Contractors</Link></li>
            <li><Link href="/ai-cost-estimator" className="hover:text-skov-gold">AI Cost Estimator</Link></li>
            <li><Link href="/consultation" className="hover:text-skov-gold">Consultation</Link></li>
            <li><Link href="/join-as-contractor" className="hover:text-skov-gold">Join as Contractor</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-skov-gold">City Coverage</h4>
          <ul className="space-y-2 text-sm text-skov-cream/70">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-skov-gold" /> Raipur, Chhattisgarh</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-skov-gold" /> Bilaspur, Chhattisgarh</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-skov-gold" /> Bhilai (Coming Soon)</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-skov-gold" /> Korba (Coming Soon)</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-skov-gold">Contact</h4>
          <ul className="space-y-2 text-sm text-skov-cream/70">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-skov-gold" /> +91 91318 00113</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-skov-gold" /> hello@skovgroup.in</li>
          </ul>
        </div>
      </div>
      <div className="gold-divider opacity-40" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-skov-cream/50 md:flex-row">
        <p>© {new Date().getFullYear()} SKOV Group. All rights reserved.</p>
        <p>Built with trust • Made in India</p>
      </div>
    </footer>
  );
}
