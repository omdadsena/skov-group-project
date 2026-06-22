import { ShieldCheck, MapPin, BadgeCheck } from "lucide-react";

export default function TrustStrip() {
  return (
    <section className="relative z-10 border-y border-[#d4af37]/20 bg-[#080808]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:divide-x sm:divide-[#d4af37]/15">
          {/* Trust Element 1 */}
          <div className="flex items-center gap-3.5 pb-4 sm:pb-0 sm:pr-4 md:px-6">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#d4af37]/10 text-[#d4af37]">
              <ShieldCheck className="h-5.5 w-5.5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#e2bd58] font-semibold">
                Verified Contractors
              </p>
              <p className="text-sm text-[#f5f5f0]/75 mt-0.5 font-medium">
                Gold badge only after approval
              </p>
            </div>
          </div>

          {/* Trust Element 2 */}
          <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:pl-4 md:px-6">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#d4af37]/10 text-[#d4af37]">
              <BadgeCheck className="h-5.5 w-5.5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#e2bd58] font-semibold">
                Transparent Estimates
              </p>
              <p className="text-sm text-[#f5f5f0]/75 mt-0.5 font-medium">
                Clear planning breakdowns
              </p>
            </div>
          </div>

          {/* Trust Element 3 */}
          <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:px-6">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#d4af37]/10 text-[#d4af37]">
              <MapPin className="h-5.5 w-5.5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#e2bd58] font-semibold">
                City-Wise Service
              </p>
              <p className="text-sm text-[#f5f5f0]/75 mt-0.5 font-medium">
                Local Chhattisgarh coverage
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
