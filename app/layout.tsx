import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import ChatbotButton from "@/components/ChatbotButton";

export const metadata: Metadata = {
  title: "SKOV GROUP | Free AI Construction Tools + Verified Contractors India",
  description:
    "Verified contractors, AI cost estimates, 3D designs, and expert consultations for building your dream home across Raipur, Bilaspur, Bhilai, and Chhattisgarh.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-skov-black text-skov-cream min-h-screen flex flex-col overflow-x-hidden w-full max-w-full">
        <Navbar />
        <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
        <ChatbotButton />
      </body>
    </html>
  );
}
