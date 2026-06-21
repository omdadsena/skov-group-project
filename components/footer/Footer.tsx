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
          <p className="text-sm text-[#f5f5f0]/60 leading-relaxed">
            Construction planning tools, local contractor listings, and project consultation across Chhattisgarh.
          </p>
          {/* WhatsApp Direct CTA */}
          <div className="pt-2">
            <a
              href="https://wa.me/9131800113"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/40 px-4 py-2 text-xs font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition duration-300"
            >
              <MessageCircle className="h-4 w-4 fill-[#25D366]" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="font-display text-sm font-semibold text-[#d4af37] tracking-wider uppercase mb-5">
            Services
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li>
              <Link href="/ai-bots" className="hover:text-[#d4af37] transition duration-200">
                Construction & Renovation
              </Link>
            </li>
            <li>
              <Link href="/ai-cost-estimator" className="hover:text-[#d4af37] transition duration-200">
                Cost Estimator
              </Link>
            </li>
            <li>
              <Link href="/contractors" className="hover:text-[#d4af37] transition duration-200">
                Interiors & 3D Design
              </Link>
            </li>
            <li>
              <Link href="/consultation" className="hover:text-[#d4af37] transition duration-200">
                Expert Consultation
              </Link>
            </li>
            <li>
              <Link href="/join" className="hover:text-[#d4af37] transition duration-200">
                Become a Contractor
              </Link>
            </li>
          </ul>
        </div>

        {/* Coverage Cities */}
        <div>
          <h4 className="font-display text-sm font-semibold text-[#d4af37] tracking-wider uppercase mb-5">
            Cities
          </h4>
          <ul className="space-y-3.5 text-sm text-[#f5f5f0]/60">
            {[
              ["Raipur", "/contractors-in-raipur"],
              ["Bilaspur", "/contractors-in-bilaspur"],
              ["Baloda Bazar", "/contractors-in-baloda-bazar"],
              ["Bhilai", "/contractors-in-bhilai"],
              ["Durg", "/contractors-in-durg"],
              ["Kawardha", "/contractors-in-kawardha"],
            ].map(([city, href]) => (
              <li key={city}>
                <Link href={href} className="flex items-center gap-2 hover:text-[#d4af37]">
                  <MapPin className="h-4 w-4 text-[#d4af37]" /> {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h4 className="font-display text-sm font-semibold text-[#d4af37] tracking-wider uppercase mb-5">
            Support & Legal
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-center gap-2 text-[#f5f5f0]/70">
              <Phone className="h-4 w-4 text-[#d4af37]" /> +91 91318 00113
            </li>
            <li className="flex items-center gap-2 text-[#f5f5f0]/70">
              <Mail className="h-4 w-4 text-[#d4af37]" /> hello@skovgroup.in
            </li>
            <li className="pt-2 border-t border-neutral-900 mt-4 space-y-2">
              <div>
                <Link href="/privacy" className="text-xs text-[#f5f5f0]/50 hover:text-[#d4af37] transition duration-200">
                  Privacy Policy
                </Link>
              </div>
              <div>
                <Link href="/terms" className="text-xs text-[#f5f5f0]/50 hover:text-[#d4af37] transition duration-200">
                  Terms of Service
                </Link>
              </div>
              <div>
                <Link href="/contact" className="text-xs text-[#f5f5f0]/50 hover:text-[#d4af37] transition duration-200">
                  Contact Us
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Gold Divider Line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

      {/* Bottom Bar */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#f5f5f0]/40">
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
