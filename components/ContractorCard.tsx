import { BadgeCheck, BriefcaseBusiness, MapPin, Phone } from "lucide-react";
import type { DirectoryContractor } from "@/lib/site-data";

export default function ContractorCard({ contractor }: { contractor: DirectoryContractor }) {
  const message = encodeURIComponent(
    `Hi SKOV GROUP, I want to enquire about ${contractor.company} in ${contractor.city}.`
  );

  return (
    <article className="card-dark flex min-w-0 max-w-full flex-col p-5 sm:p-6">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="break-words font-display text-xl text-skov-cream">{contractor.company}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-skov-cream/60">
            <MapPin className="h-4 w-4 shrink-0 text-skov-gold" />
            {contractor.city}, {contractor.state}
          </p>
        </div>
        <span
          className={`inline-flex w-fit shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs ${
            contractor.isVerified
              ? "border-skov-gold/50 bg-skov-gold/15 text-skov-gold"
              : "border-white/15 bg-white/5 text-skov-cream/60"
          }`}
        >
          {contractor.isVerified && <BadgeCheck className="h-3.5 w-3.5" />}
          {contractor.isVerified ? "Verified Contractor" : "Listed Contractor"}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {contractor.services.map((service) => (
          <span key={service} className="rounded-full border border-skov-gold/20 px-3 py-1 text-xs text-skov-cream/70">
            {service}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-skov-cream/70">
        <BriefcaseBusiness className="h-4 w-4 text-skov-gold" />
        {contractor.experience} years of experience
      </div>

      <a
        href={`https://wa.me/91${contractor.phone}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline-gold mt-6 w-full"
      >
        <Phone className="h-4 w-4" /> Enquire via SKOV
      </a>
    </article>
  );
}
