"use client";

import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import ToolsGrid from "@/components/home/ToolsGrid";
import HowItWorks from "@/components/home/HowItWorks";
import VerifiedContractors from "@/components/home/VerifiedContractors";
import AICostEstimator from "@/components/home/AICostEstimator";
import ThreeDHomeDesign from "@/components/home/3DHomeDesign";
import ProjectsGallery from "@/components/home/ProjectsGallery";
import CityCoverage from "@/components/home/CityCoverage";
import WhySKOV from "@/components/home/WhySKOV";
import ContractorCTA from "@/components/home/ContractorCTA";
import ConsultationCTA from "@/components/home/ConsultationCTA";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#0a0a0a]">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Truststrip */}
      <TrustStrip />

      {/* 3. SKOV Tools Suite */}
      <ToolsGrid />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Verified Contractors Process */}
      <VerifiedContractors />

      {/* 6. AI Cost Estimator Interactive Preview */}
      <AICostEstimator />

      {/* 7. 3D Home Design Mockup Preview */}
      <ThreeDHomeDesign />

      {/* 8. Projects Gallery */}
      <ProjectsGallery />

      {/* 9. City Coverage Footprint */}
      <CityCoverage />

      {/* 10. Core Value Grid (Why SKOV) */}
      <WhySKOV />

      {/* 11. Contractor Recruitment CTA */}
      <ContractorCTA />

      {/* 12. Consultation Request Callback Form */}
      <ConsultationCTA />

      {/* 13. Help Center FAQs */}
      <FAQ />
    </div>
  );
}
