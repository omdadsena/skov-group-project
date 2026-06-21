import Link from "next/link";

export default function NotFound() {
  return (
    <div className="content-shell flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow">404 — Page not found</p>
      <h1 className="section-title">This route needs a new blueprint.</h1>
      <p className="section-copy">The page may have moved, but the main SKOV services are still one click away.</p>
      <Link href="/" className="btn-gold mt-8">Return home</Link>
    </div>
  );
}
