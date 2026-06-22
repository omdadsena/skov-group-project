import Link from "next/link";
import ContractorCard from "@/components/ContractorCard";
import { directoryContractors } from "@/lib/site-data";
import { citySeo } from "@/lib/seo-content";

export default function CityPage({ city }: { city: string }) {
  const seo = citySeo[city];
  const exact = directoryContractors.filter((contractor) => contractor.city === city);
  const listings = (exact.length >= 3 ? exact : [...exact, ...directoryContractors.filter((c) => c.city !== city)]).slice(0, 4);

  return (
    <div className="content-shell py-28 md:py-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skovgroup.com" },
              { "@type": "ListItem", position: 2, name: `Contractors in ${city}`, item: `https://www.skovgroup.com/${seo.slug}` },
            ],
          },
          {
            "@type": "FAQPage",
            mainEntity: seo.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
          },
        ],
      }) }} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-skov-cream/70">
        <Link href="/" className="underline-offset-4 hover:underline">Home</Link> <span aria-hidden="true">/</span> Contractors in {city}
      </nav>
      <p className="eyebrow">Chhattisgarh Contractor Directory</p>
      <h1 className="max-w-4xl break-words font-display text-4xl leading-tight sm:text-5xl">
        Contractors in {city} — SKOV GROUP
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-skov-cream/70 sm:text-lg">
        {seo.intro} Verification badges are shown only after approval.
      </p>
      <section className="mt-10" aria-labelledby="city-services">
        <h2 id="city-services" className="font-display text-2xl">Popular services in {city}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {seo.services.map((service) => <li key={service} className="card-dark p-4 text-sm text-skov-cream/80">{service}</li>)}
        </ul>
      </section>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {listings.map((contractor) => <ContractorCard key={contractor.id} contractor={contractor} />)}
      </div>
      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link href="/join" className="btn-gold">Become a Verified Contractor in {city}</Link>
        <Link href="/" className="btn-outline-gold">Back to homepage</Link>
      </div>
      <section className="mt-16" aria-labelledby="city-faq">
        <h2 id="city-faq" className="font-display text-3xl">Frequently asked questions about contractors in {city}</h2>
        <div className="mt-6 space-y-4">
          {seo.faqs.map((faq) => (
            <details key={faq.question} className="card-dark p-5">
              <summary className="min-h-11 cursor-pointer font-semibold">{faq.question}</summary>
              <p className="mt-3 text-sm leading-7 text-skov-cream/80">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <p className="mt-12 text-sm text-skov-cream/75">
        Related resources: <Link href="/house-construction-cost-in-chhattisgarh" className="text-skov-gold underline">construction cost in Chhattisgarh</Link>
        {" · "}<Link href="/verified-contractors-in-chhattisgarh" className="text-skov-gold underline">verified contractor guide</Link>
      </p>
    </div>
  );
}
