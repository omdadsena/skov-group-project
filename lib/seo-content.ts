export const citySeo: Record<string, {
  slug: string;
  title: string;
  description: string;
  intro: string;
  services: string[];
  faqs: { question: string; answer: string }[];
}> = {
  Raipur: {
    slug: "contractors-in-raipur",
    title: "Contractors in Raipur — Construction & Renovation | SKOV GROUP",
    description: "Find listed and verified contractors in Raipur for home construction, renovation, interiors, cost estimation, and project planning.",
    intro: "Compare local construction professionals serving Raipur for new homes, turnkey work, renovation, interiors, civil work, and planning support.",
    services: ["Turnkey home construction", "Renovation and waterproofing", "Interior execution", "Cost and material planning"],
    faqs: [
      { question: "How much does house construction cost in Raipur?", answer: "Early planning ranges commonly vary by specifications, structure, finishes, soil, and supplier quotations. Use the SKOV estimator before requesting itemised contractor quotes." },
      { question: "How do I compare contractors in Raipur?", answer: "Compare written scope, material brands, milestones, past projects, references, warranty terms, and whether the profile is merely listed or has completed verification." },
    ],
  },
  Bilaspur: {
    slug: "contractors-in-bilaspur",
    title: "Contractors in Bilaspur — Home Construction | SKOV GROUP",
    description: "Explore contractors in Bilaspur for residential construction, renovation, interiors, civil work, and transparent project estimates.",
    intro: "Find local professionals serving Bilaspur and compare service categories, experience, enquiry options, and verification status.",
    services: ["Residential construction", "Home renovation", "Interior work", "Civil and structural coordination"],
    faqs: [
      { question: "Can SKOV help plan a home in Bilaspur?", answer: "Yes. SKOV provides early cost planning, contractor discovery, layout tools, and consultation support for Bilaspur projects." },
      { question: "Are all Bilaspur listings verified?", answer: "No. Listings are clearly marked. Only profiles that complete the review process display a Verified Contractor badge." },
    ],
  },
  "Baloda Bazar": {
    slug: "contractors-in-baloda-bazar",
    title: "Contractors in Baloda Bazar | SKOV GROUP",
    description: "Find contractors in Baloda Bazar for house construction, renovation, civil work, plumbing, and local project planning.",
    intro: "Explore construction support in Baloda Bazar for residential builds, extensions, repairs, and material planning.",
    services: ["Residential construction", "Extensions and repairs", "Plumbing coordination", "Material budgeting"],
    faqs: [
      { question: "Does SKOV cover projects outside central Baloda Bazar?", answer: "Coverage depends on contractor service radius. Share the project location during enquiry so travel and supervision expectations are clear." },
      { question: "What should a local quotation include?", answer: "Request quantities, brands, labour scope, exclusions, payment milestones, timeline, taxes, transport, and warranty terms in writing." },
    ],
  },
  Bhilai: {
    slug: "contractors-in-bhilai",
    title: "Contractors in Bhilai — Civil & Structural Work | SKOV GROUP",
    description: "Compare contractors in Bhilai for home construction, structural work, renovation, interiors, and project consultation.",
    intro: "Discover Bhilai construction professionals for residential, structural, renovation, and interior requirements.",
    services: ["Home construction", "Structural and civil work", "Renovation", "Interior execution"],
    faqs: [
      { question: "Can I find structural contractors in Bhilai?", answer: "SKOV listings include service tags, but structural designs and modifications must still be approved by a qualified structural engineer." },
      { question: "How should contractor payments be scheduled?", answer: "Tie payments to measurable milestones and documented material delivery rather than paying a large unprotected advance." },
    ],
  },
  Durg: {
    slug: "contractors-in-durg",
    title: "Contractors in Durg — Renovation & Interiors | SKOV GROUP",
    description: "Find contractors in Durg for construction, renovation, interiors, repairs, cost planning, and consultation.",
    intro: "Compare Durg contractors and planning resources for new construction, renovation, interiors, and repair work.",
    services: ["New home construction", "Renovation", "Interior work", "Repair and waterproofing"],
    faqs: [
      { question: "How can I reduce renovation risk in Durg?", answer: "Start with a measured scope, identify structural work, document existing defects, and compare itemised quotations before demolition." },
      { question: "Does a listed contractor carry a SKOV endorsement?", answer: "No. Listed Contractor indicates directory presence only. Verification is shown separately after review." },
    ],
  },
  Kawardha: {
    slug: "contractors-in-kawardha",
    title: "Contractors in Kawardha — Residential Construction | SKOV GROUP",
    description: "Explore residential contractors in Kawardha for home construction, civil work, plumbing, renovation, and cost planning.",
    intro: "Find construction support in Kawardha for residential builds, civil work, plumbing coordination, and renovation.",
    services: ["Residential construction", "Civil work", "Plumbing coordination", "Renovation"],
    faqs: [
      { question: "Can SKOV estimate a Kawardha construction project?", answer: "Yes. Use the early cost tools and then validate transport, labour, and local supplier rates through written quotations." },
      { question: "What documents should I prepare before construction?", answer: "Prepare ownership documents, approved drawings, structural plans, permissions, scope, budget, and a written contractor agreement." },
    ],
  },
};

export const articleSeo = {
  "construction-cost-in-raipur": {
    title: "Construction Cost in Raipur: 2026 Planning Guide",
    description: "Understand house construction cost factors in Raipur, including structure, finishes, materials, labour, and quotation planning.",
    h1: "Construction Cost in Raipur: A Practical Planning Guide",
    intro: "Construction cost in Raipur depends on built-up area, structural design, soil, specifications, brands, labour, access, and project management scope.",
    sections: [
      ["What changes the per-square-foot cost?", "Foundation requirements, floor count, room spans, elevation complexity, bathroom and kitchen specifications, electrical load, waterproofing, and finish quality all affect the final rate."],
      ["How to compare estimates", "Ask every contractor to quote against the same drawings, material brands, quantities, inclusions, exclusions, taxes, transport, and milestone schedule."],
      ["Plan a contingency", "Keep a sensible contingency for design changes, soil surprises, price movement, approval requirements, and owner-selected upgrades."],
    ],
  },
  "best-contractors-in-raipur": {
    title: "How to Choose the Best Contractors in Raipur",
    description: "A homeowner checklist for comparing contractors in Raipur using scope, references, documentation, milestones, and verification status.",
    h1: "How to Choose the Best Contractor in Raipur",
    intro: "The best contractor is the one whose experience, systems, pricing, and communication fit your specific project—not simply the lowest quote.",
    sections: [
      ["Review comparable work", "Ask for completed projects similar in size, structure, finish level, and location. Speak directly with past clients."],
      ["Demand a written scope", "The agreement should define materials, responsibilities, exclusions, timeline, billing milestones, defect correction, and change-order handling."],
      ["Understand verification labels", "A Listed Contractor is a directory entry. A Verified Contractor has completed the defined SKOV review process."],
    ],
  },
  "house-construction-cost-in-chhattisgarh": {
    title: "House Construction Cost in Chhattisgarh",
    description: "Plan house construction costs across Chhattisgarh with practical guidance on materials, labour, design, location, and contractor scope.",
    h1: "House Construction Cost in Chhattisgarh",
    intro: "Costs vary between cities and towns because labour availability, transport, material access, soil, approvals, and supervision requirements differ.",
    sections: [
      ["City and transport effects", "Raipur, Bilaspur, Bhilai, Durg, Baloda Bazar, and Kawardha can have different labour and transport assumptions."],
      ["Separate structure from finishes", "Track foundation and RCC, masonry, plumbing and electrical, waterproofing, flooring, doors, paint, and interiors separately."],
      ["Validate before signing", "Use planning estimates to set expectations, then obtain site-specific drawings and itemised local quotations."],
    ],
  },
  "verified-contractors-in-chhattisgarh": {
    title: "Verified Contractors in Chhattisgarh",
    description: "Learn what contractor verification means and how to compare listed and verified contractors across Chhattisgarh.",
    h1: "Verified Contractors in Chhattisgarh",
    intro: "Verification should be a documented trust signal, not a decorative badge. Homeowners should still perform project-specific due diligence.",
    sections: [
      ["What verification can cover", "Identity, business documents, past-work evidence, references, service area, and review notes can form part of verification."],
      ["What it cannot guarantee", "Verification cannot guarantee future workmanship, pricing, timelines, or dispute-free delivery."],
      ["Your homeowner checklist", "Use drawings, a written agreement, milestone payments, inspection records, invoices, and change-order documentation."],
    ],
  },
  "interior-designers-in-raipur": {
    title: "Interior Designers in Raipur: Selection Guide",
    description: "Compare interior designers in Raipur using scope, layouts, materials, budgets, timelines, warranties, and execution responsibility.",
    h1: "How to Compare Interior Designers in Raipur",
    intro: "A good interior engagement balances layout, storage, materials, lighting, budget, execution quality, and maintainability.",
    sections: [
      ["Define the design scope", "Clarify whether the quote includes design only, modular work, civil changes, electrical, lighting, loose furniture, appliances, and site supervision."],
      ["Compare materials properly", "Check board grade, laminate or veneer, hardware brand, edge treatment, finishes, countertop, warranty, and installation method."],
      ["Protect the timeline", "Approve drawings and samples before manufacturing, record revisions, and tie payments to measurable deliverables."],
    ],
  },
} as const;
