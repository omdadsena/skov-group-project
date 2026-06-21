import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="content-shell py-28 md:py-36">
      <p className="eyebrow">Contact SKOV GROUP</p>
      <h1 className="section-title">Tell us what you’re planning to build</h1>
      <p className="section-copy">For contractor discovery, construction estimates, design support, or partnership enquiries, reach our Raipur team.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href="https://wa.me/919131800113" className="btn-gold">WhatsApp +91 91318 00113</a>
        <Link href="/consultation" className="btn-outline-gold">Request consultation</Link>
      </div>
    </div>
  );
}
