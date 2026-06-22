import Link from "next/link";
import { ShieldCheck, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#d4af37]/20 bg-[#060606] text-[#f5f5f0]/85 overflow-hidden">
      {/* Subtle gold radial background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand Column */}
        <div className="space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-full border border-[#d4af37]/50 bg-[#d4af37]/15">
              <ShieldCheck className="h-5 w-5 text-[#d4af37]" />
            </div>
            <span className="font-display text-lg font-bold tracking-wider text-[#f5f5f0]">
              SKOV <span className="text-[#d4af37]">GROUP</span>
            </span>
          </div>
          <p className="text-sm text-[#f5f5f0]/75 leading-relaxed">
            Construction planning tools, local contractor listings, and project consultation across Chhattisgarh.
          </p>
          {/* WhatsApp Direct CTA */}
          <div className="pt-2">
            <a
              href="https://wa.me/9131800113"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#128C4A]/15 border border-[#25D366]/50 px-4 py-2 text-sm font-semibold text-[#52e58c] hover:bg-[#128C4A]/25 transition duration-300"
            >
              <MessageCircle className="h-4 w-4 fill-[#25D366]" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h2 className="font-display text-sm font-semibold text-[#e2bd58] tracking-wider uppercase mb-5">
            Services
          </h2>
          <ul className="space-y-3.5 text-sm">
            <li>
              <Link href="/ai-bots" className="flex min-h-11 items-center hover:text-[#d4af37] transition duration-200">
                Construction & Renovation
              </Link>
            </li>
            <li>
              <Link href="/ai-cost-estimator" className="flex min-h-11 items-center hover:text-[#d4af37] transition duration-200">
                Cost Estimator
              </Link>
            </li>
            <li>
              <Link href="/contractors" className="flex min-h-11 items-center hover:text-[#d4af37] transition duration-200">
                Interiors & 3D Design
              </Link>
            </li>
            <li>
              <Link href="/consultation" className="flex min-h-11 items-center hover:text-[#d4af37] transition duration-200">
                Expert Consultation
              </Link>
            </li>
            <li>
              <Link href="/join" className="flex min-h-11 items-center hover:text-[#d4af37] transition duration-200">
                Become a Contractor
              </Link>
            </li>
          </ul>
        </div>

        {/* Coverage Cities */}
        <div>
          <h2 className="font-display text-sm font-semibold text-[#e2bd58] tracking-wider uppercase mb-5">
            Cities
          </h2>
          <ul className="space-y-3.5 text-sm text-[#f5f5f0]/75">
            {[
              ["Raipur", "/contractors-in-raipur"],
              ["Bilaspur", "/contractors-in-bilaspur"],
              ["Baloda Bazar", "/contractors-in-baloda-bazar"],
              ["Bhilai", "/contractors-in-bhilai"],
              ["Durg", "/contractors-in-durg"],
              ["Kawardha", "/contractors-in-kawardha"],
            ].map(([city, href]) => (
              <li key={city}>
                <Link href={href} className="flex min-h-11 items-center gap-2 hover:text-[#d4af37]">
                  <MapPin className="h-4 w-4 text-[#d4af37]" /> {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h2 className="font-display text-sm font-semibold text-[#e2bd58] tracking-wider uppercase mb-5">
            Support & Legal
          </h2>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-center gap-2 text-[#f5f5f0]/70">
              <Phone className="h-4 w-4 text-[#d4af37]" /> +91 91318 00113
            </li>
            <li className="flex items-center gap-2 text-[#f5f5f0]/70">
              <Mail className="h-4 w-4 text-[#d4af37]" /> hello@skovgroup.in
            </li>
            <li className="pt-2 border-t border-neutral-900 mt-4 space-y-2">
              <div>
                <Link href="/privacy" className="inline-flex min-h-11 items-center text-sm text-[#f5f5f0]/75 hover:text-[#d4af37] transition duration-200">
                  Privacy Policy
                </Link>
              </div>
              <div>
                <Link href="/terms" className="inline-flex min-h-11 items-center text-sm text-[#f5f5f0]/75 hover:text-[#d4af37] transition duration-200">
                  Terms of Service
                </Link>
              </div>
              <div>
                <Link href="/contact" className="inline-flex min-h-11 items-center text-sm text-[#f5f5f0]/75 hover:text-[#d4af37] transition duration-200">
                  Contact Us
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <nav aria-label="Construction guides" className="mx-auto max-w-7xl px-4 pb-10 md:px-8">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-[#e2bd58]">Popular construction guides</h2>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-skov-cream/75">
          <Link href="/construction-cost-in-raipur" className="min-h-11 py-3 hover:text-skov-gold">Construction cost in Raipur</Link>
          <Link href="/best-contractors-in-raipur" className="min-h-11 py-3 hover:text-skov-gold">Best contractors in Raipur</Link>
          <Link href="/house-construction-cost-in-chhattisgarh" className="min-h-11 py-3 hover:text-skov-gold">House construction cost in Chhattisgarh</Link>
          <Link href="/verified-contractors-in-chhattisgarh" className="min-h-11 py-3 hover:text-skov-gold">Verified contractors in Chhattisgarh</Link>
          <Link href="/interior-designers-in-raipur" className="min-h-11 py-3 hover:text-skov-gold">Interior designers in Raipur</Link>
        </div>
      </nav>

      {/* Gold Divider Line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

      {/* Bottom Bar */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#f5f5f0]/70">
        <div>
          © {new Date().getFullYear()} SKOV Group. All rights reserved. Registered trademark.
        </div>
        <div className="flex gap-6">
          <span>Local expertise • Transparent planning</span>
          <span>Made in India</span>
        </div>
      </div>
    </footer>
  );
}
