import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Services from "@/components/home/Services";
import ContractorDirectory from "@/components/home/ContractorDirectory";
import {
  CityLinksSection,
  ConsultationBanner,
  HomeFaq,
  PartnerCta,
  ProcessSection,
  ToolsSection,
  homeFaqs,
} from "@/components/home/HomeStaticSections";

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.skovgroup.com/#organization",
      name: "SKOV GROUP",
      url: "https://www.skovgroup.com",
      logo: "https://www.skovgroup.com/og-image.svg",
      contactPoint: { "@type": "ContactPoint", telephone: "+919131800113", contactType: "customer service", areaServed: "IN" },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.skovgroup.com/#website",
      url: "https://www.skovgroup.com",
      name: "SKOV GROUP",
      publisher: { "@id": "https://www.skovgroup.com/#organization" },
    },
    {
      "@type": "Service",
      serviceType: "Construction contractor discovery and planning",
      provider: { "@id": "https://www.skovgroup.com/#organization" },
      areaServed: ["Raipur", "Bilaspur", "Baloda Bazar", "Bhilai", "Durg", "Kawardha"],
    },
    {
      "@type": "FAQPage",
      mainEntity: homeFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#0a0a0a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <Hero />
      <TrustStrip />
      <Services />
      <ContractorDirectory />
      <ToolsSection />
      <ProcessSection />
      <CityLinksSection />
      <PartnerCta />
      <ConsultationBanner />
      <HomeFaq />
    </div>
  );
}
