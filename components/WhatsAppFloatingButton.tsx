"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppFloatingButton() {
  return (
    <motion.a
      href="https://wa.me/9131800113?text=Hi%20SKOV%20Group%2C%20I%20want%20to%20build%20my%20dream%20home."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.6, type: "spring" }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.55)] transition duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5 md:h-6 md:w-6 fill-white text-[#25D366]" />
      <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-[#25D366]" />
      </span>
    </motion.a>
  );
}
