import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatbotButton from "@/components/ChatbotButton";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "SKOV GROUP — India's Trust Layer for Construction",
  description:
    "Verified contractors, AI cost estimates, and expert consultations for building your dream home across India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-skov-black text-skov-cream min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ChatbotButton />
        <Analytics />
      </body>
    </html>
  );
}
