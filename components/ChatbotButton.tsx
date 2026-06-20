"use client";
import { useState } from "react";
import { Bot, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Msg = { role: "user" | "bot"; text: string };

const seed: Msg[] = [
  { role: "bot", text: "Namaste! I'm SKOV Assist. Ask me about contractors, costs, or how we verify trust." },
];

function reply(q: string): string {
  const t = q.toLowerCase();
  if (t.includes("cost") || t.includes("price")) return "Try our AI Cost Estimator — it gives a ₹/sqft breakdown for Raipur & Bilaspur in seconds.";
  if (t.includes("contractor")) return "Our contractor network is currently being onboarded. Visit /contractors for launch updates.";
  if (t.includes("consult")) return "You can book a free 20-min consultation with our experts on /consultation.";
  if (t.includes("trust") || t.includes("verify")) return "SKOV is building a verification process covering business documents, site checks, and past-work review.";
  return "Great question! For specifics, please book a free consultation — our team will help personally.";
}

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const send = async () => {
    if (!input.trim()) return;
    const u = input.trim();
    const currentMessages = [...msgs, { role: "user", text: u } as Msg];
    setMsgs(currentMessages);
    setInput("");
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: currentMessages,
          context: "You are SKOV Assist, a premium construction AI assistant for the SKOV GROUP website. Guide the user regarding house design, contractor verification, costs, or booking consultations. Keep it extremely brief and luxurious."
        })
      });
      const data = await res.json();
      setMsgs([...currentMessages, { role: "bot", text: data.text }]);
    } catch (e) {
      setMsgs([...currentMessages, { role: "bot", text: "Something went wrong. Please check your network connection." }]);
    }
  };
  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        whileHover={{ scale: 1.08 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-skov-gold text-skov-black shadow-gold"
        aria-label="Chatbot"
      >
        <Bot className="h-6 w-6" />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 left-4 w-auto md:left-auto md:right-6 md:w-[340px] md:bottom-24 z-50 flex h-[calc(100vh-120px)] max-h-[460px] flex-col overflow-hidden rounded-2xl border border-skov-gold/30 bg-skov-black/95 shadow-gold backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-skov-gold/20 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-skov-gold/15 text-skov-gold">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-skov-cream">SKOV Assist</div>
                  <div className="text-[10px] text-skov-cream/50">Online • Replies instantly</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-skov-cream/60 hover:text-skov-gold">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      m.role === "user"
                        ? "bg-skov-gold text-skov-black"
                        : "bg-white/5 text-skov-cream border border-skov-gold/15"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-skov-gold/20 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask anything…"
                className="input-dark !py-2 text-sm"
              />
              <button onClick={send} className="grid h-10 w-10 place-items-center rounded-full bg-skov-gold text-skov-black">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
