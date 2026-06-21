import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ContractorCard from "@/components/ContractorCard";
import { directoryContractors } from "@/lib/site-data";

export default function ContractorDirectory() {
  return (
    <section id="contractors" className="section-shell bg-[#0a0a0a]">
      <div className="content-shell">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Local Directory</p>
            <h2 className="section-title">Contractors serving Chhattisgarh</h2>
            <p className="section-copy">
              Directory listings are not verification endorsements. A gold badge appears only after SKOV approval.
            </p>
          </div>
          <Link href="/contractors" className="btn-outline-gold w-full md:w-auto">
            View directory <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {directoryContractors.slice(0, 6).map((contractor) => (
            <ContractorCard key={contractor.id} contractor={contractor} />
          ))}
        </div>
      </div>
    </section>
  );
}
