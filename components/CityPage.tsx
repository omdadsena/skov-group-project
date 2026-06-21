import Link from "next/link";
import ContractorCard from "@/components/ContractorCard";
import { directoryContractors } from "@/lib/site-data";

export default function CityPage({ city }: { city: string }) {
  const exact = directoryContractors.filter((contractor) => contractor.city === city);
  const listings = (exact.length >= 3 ? exact : [...exact, ...directoryContractors.filter((c) => c.city !== city)]).slice(0, 4);

  return (
    <div className="content-shell py-28 md:py-36">
      <p className="eyebrow">Chhattisgarh Contractor Directory</p>
      <h1 className="max-w-4xl break-words font-display text-4xl leading-tight sm:text-5xl">
        Contractors in {city} — SKOV GROUP
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-skov-cream/70 sm:text-lg">
        Find listed contractors in {city} for construction, renovation, interiors, civil work, and project planning. Verification badges are shown only after approval.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {listings.map((contractor) => <ContractorCard key={contractor.id} contractor={contractor} />)}
      </div>
      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link href="/join" className="btn-gold">Become a Verified Contractor in {city}</Link>
        <Link href="/" className="btn-outline-gold">Back to homepage</Link>
      </div>
    </div>
  );
}
