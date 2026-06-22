import { MessageCircle } from "lucide-react";

export default function WhatsAppFloatingButton() {
  return (
    <a
      href="https://wa.me/9131800113?text=Hi%20SKOV%20Group%2C%20I%20want%20to%20build%20my%20dream%20home."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#128C4A] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition hover:bg-[#0f7a40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:bottom-6 md:right-6 md:h-14 md:w-14"
      aria-label="Chat with SKOV GROUP on WhatsApp"
    >
      <MessageCircle className="h-5 w-5 md:h-6 md:w-6 fill-white text-[#25D366]" />
      <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
        <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
      </span>
    </a>
  );
}
