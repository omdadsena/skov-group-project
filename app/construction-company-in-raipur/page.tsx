import Link from "next/link";

export const metadata = {
  title: "Construction Company in Raipur — Planning & Contractor Support",
  description: "Plan residential construction in Raipur with contractor discovery, cost estimation, home planning tools, and project consultation from SKOV GROUP.",
  alternates: { canonical: "/construction-company-in-raipur" },
};

const faqs = [
  { question: "Does SKOV GROUP directly construct homes in Raipur?", answer: "SKOV GROUP provides contractor discovery, planning tools, estimates, and consultation. The final construction agreement is made with the selected service provider." },
  { question: "What should I prepare before requesting a construction quote?", answer: "Prepare plot information, approved drawings where available, built-up area, floor count, specification level, budget, and expected timeline." },
];

export default function Page() {
  return (
    <article className="content-shell max-w-5xl py-28 md:py-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skovgroup.com" },
            { "@type": "ListItem", position: 2, name: "Construction Company in Raipur", item: "https://www.skovgroup.com/construction-company-in-raipur" },
          ] },
          { "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
        ],
      }) }} />
      <p className="eyebrow">Raipur construction planning</p>
      <h1 className="section-title">Construction Company Support in Raipur</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-skov-cream/80">
        SKOV GROUP helps homeowners move from early budget and layout questions to contractor discovery, comparison, and a documented project scope.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {["Construction cost estimation", "Contractor discovery", "House plan assistance", "Renovation and interior planning"].map((service) => (
          <div key={service} className="card-dark p-6"><h2 className="font-display text-xl">{service}</h2></div>
        ))}
      </div>
      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link href="/contractors-in-raipur" className="btn-gold">Find contractors in Raipur</Link>
        <Link href="/consultation" className="btn-outline-gold">Request consultation</Link>
      </div>
      <section className="mt-16">
        <h2 className="font-display text-3xl">Frequently asked questions</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq) => <details key={faq.question} className="card-dark p-5"><summary className="min-h-11 cursor-pointer font-semibold">{faq.question}</summary><p className="mt-3 text-skov-cream/80">{faq.answer}</p></details>)}
        </div>
      </section>
    </article>
  );
}
