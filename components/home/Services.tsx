import { Building2, Calculator, House, Paintbrush, PenTool, Wrench } from "lucide-react";

const services = [
  { icon: Building2, title: "Construction", text: "Residential and commercial construction planning." },
  { icon: Wrench, title: "Renovation", text: "Repairs, extensions, waterproofing, and remodeling." },
  { icon: Paintbrush, title: "Interiors", text: "Practical interior design and execution support." },
  { icon: Calculator, title: "Cost Estimator", text: "City-aware early-stage construction estimates." },
  { icon: House, title: "3D Design", text: "Floor-plan review and elevation concept assistance." },
  { icon: PenTool, title: "Consultation", text: "Project scoping, contractor, and budget guidance." },
];

export default function Services() {
  return (
    <section id="services" className="section-shell bg-[#080808]">
      <div className="content-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">Construction Services</p>
          <h2 className="section-title">Plan, price, design, and build with one local partner</h2>
          <p className="section-copy">
            SKOV GROUP connects Chhattisgarh homeowners with planning tools, listed professionals, and hands-on project guidance.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="card-dark p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-skov-gold/10 text-skov-gold">
                <service.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-skov-cream/60">{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
