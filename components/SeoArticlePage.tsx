import Link from "next/link";
import { articleSeo } from "@/lib/seo-content";

export default function SeoArticlePage({ slug }: { slug: keyof typeof articleSeo }) {
  const article = articleSeo[slug];
  const url = `https://www.skovgroup.com/${slug}`;
  return (
    <article className="content-shell max-w-4xl py-28 md:py-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.skovgroup.com" },
          { "@type": "ListItem", position: 2, name: article.h1, item: url },
        ],
      }) }} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-skov-cream/70">
        <Link href="/" className="underline-offset-4 hover:underline">Home</Link> <span aria-hidden="true">/</span> Guides
      </nav>
      <p className="eyebrow">SKOV construction guide</p>
      <h1 className="section-title">{article.h1}</h1>
      <p className="mt-6 text-lg leading-8 text-skov-cream/80">{article.intro}</p>
      <div className="mt-12 space-y-10">
        {article.sections.map(([heading, text]) => (
          <section key={heading}>
            <h2 className="font-display text-2xl">{heading}</h2>
            <p className="mt-3 leading-8 text-skov-cream/80">{text}</p>
          </section>
        ))}
      </div>
      <div className="mt-12 rounded-2xl border border-skov-gold/30 bg-skov-gold/5 p-6">
        <h2 className="font-display text-2xl">Plan your next step</h2>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/ai-cost-estimator" className="btn-gold">Use cost estimator</Link>
          <Link href="/contractors-in-raipur" className="btn-outline-gold">Explore Raipur contractors</Link>
        </div>
      </div>
    </article>
  );
}
