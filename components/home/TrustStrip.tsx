import { ShieldCheck, Calendar, MapPin, BadgeCheck } from "lucide-react";

export default function TrustStrip() {
  return (
    <section className="relative z-10 border-y border-[#d4af37]/20 bg-[#080808]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-[#d4af37]/15">
          {/* Trust Element 1 */}
          <div className="flex items-center gap-3.5 pb-4 sm:pb-0 sm:pr-4 md:px-6">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#d4af37]/10 text-[#d4af37]">
              <ShieldCheck className="h-5.5 w-5.5" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#d4af37]/80 font-semibold">
                Verification-First
              </h4>
              <p className="text-sm text-[#f5f5f0]/75 mt-0.5 font-medium">
                Contractors audited locally
              </p>
            </div>
          </div>

          {/* Trust Element 2 */}
          <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:pl-4 md:px-6">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#d4af37]/10 text-[#d4af37]">
              <BadgeCheck className="h-5.5 w-5.5" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#d4af37]/80 font-semibold">
                Transparent Estimates
              </h4>
              <p className="text-sm text-[#f5f5f0]/75 mt-0.5 font-medium">
                Exact cost breakdown
              </p>
            </div>
          </div>

          {/* Trust Element 3 */}
          <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:px-6">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#d4af37]/10 text-[#d4af37]">
              <MapPin className="h-5.5 w-5.5" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#d4af37]/80 font-semibold">
                Pilot Network
              </h4>
              <p className="text-sm text-[#f5f5f0]/75 mt-0.5 font-medium">
                Expanding in Chhattisgarh
              </p>
            </div>
          </div>

          {/* Trust Element 4 */}
          <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:pl-6">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[#d4af37]/10 text-[#d4af37]">
              <Calendar className="h-5.5 w-5.5" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#d4af37]/80 font-semibold">
                Early Access On
              </h4>
              <p className="text-sm text-[#f5f5f0]/75 mt-0.5 font-medium">
                Join early, book free calls
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
