import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.skovgroup.com"),
  title: "SKOV GROUP — Verified Contractors & Construction Services in Chhattisgarh",
  description:
    "Find listed and verified contractors, construction services, interiors, cost estimation, and home planning support across Raipur, Bilaspur, Baloda Bazar, Bhilai, Durg, and Kawardha.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "SKOV GROUP — Verified Contractors & Construction Services in Chhattisgarh",
    description: "Find contractors, estimate construction costs, and plan your project across Chhattisgarh.",
    url: "/",
    siteName: "SKOV GROUP",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "SKOV GROUP" }],
    locale: "en_IN",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-skov-black text-skov-cream min-h-screen flex flex-col overflow-x-hidden w-full max-w-full`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "SKOV GROUP",
              description: "Verified contractors & construction services in Chhattisgarh",
              url: "https://www.skovgroup.com",
              telephone: "+919131800113",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Raipur",
                addressRegion: "Chhattisgarh",
                addressCountry: "IN",
              },
            }),
          }}
        />
        <Navbar />
        <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
