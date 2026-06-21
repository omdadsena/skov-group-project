import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ContractorCard from "@/components/ContractorCard";
import { directoryContractors } from "@/lib/site-data";

export const metadata = {
  title: "Contractors in Chhattisgarh",
  description: "Browse listed construction contractors serving Raipur, Bilaspur, Bhilai, Durg, Baloda Bazar, and Kawardha.",
};

export default function ContractorsPage() {
  return (
    <div className="content-shell py-28 md:py-36">
      <div className="max-w-4xl">
        <p className="eyebrow">Contractor Directory</p>
        <h1 className="section-title">Find construction professionals in Chhattisgarh</h1>
        <p className="section-copy">
          Browse local listings by city and service. “Listed Contractor” means the business is in our directory; it is not a verification endorsement.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {directoryContractors.map((contractor) => (
          <ContractorCard key={contractor.id} contractor={contractor} />
        ))}
      </div>

      <div className="mt-12 rounded-3xl border border-skov-gold/25 bg-skov-gold/5 p-6 sm:p-9">
        <h2 className="font-display text-2xl">Are you a contractor?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-skov-cream/65">
          Apply for document review, city visibility, and eligibility for the SKOV Verified badge.
        </p>
        <Link href="/join" className="btn-gold mt-6">
          Become a Verified Contractor <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
