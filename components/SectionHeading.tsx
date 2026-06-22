export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`w-full max-w-3xl ${center ? "text-center mx-auto" : ""}`}>
      {eyebrow && (
        <div
          className="mb-3 inline-block rounded-full border border-skov-gold/30 bg-skov-gold/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-skov-gold"
        >
          {eyebrow}
        </div>
      )}
      <h1
        className="font-display text-2xl sm:text-3xl md:text-5xl leading-tight"
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className="mt-4 text-skov-cream/80"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
