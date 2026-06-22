export const AI_FALLBACK_REPLY =
  "SKOV AI is temporarily unavailable. Please try again in a moment or chat with our team on WhatsApp at +91 91318 00113.";

export type AiBotPayload = {
  botType: string;
  prompt?: string;
  messages?: Array<{ role: string; text: string }>;
  image?: string;
  style?: string;
};

export type AiBotResult<T = unknown> = {
  text: string;
  data?: T;
  fallback: boolean;
};

export async function requestAiBot<T = unknown>(payload: AiBotPayload): Promise<AiBotResult<T>> {
  const response = await fetch("/api/ai-bot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.error || AI_FALLBACK_REPLY);
  }

  const text =
    (typeof body?.text === "string" && body.text.trim()) ||
    (typeof body?.response === "string" && body.response.trim()) ||
    AI_FALLBACK_REPLY;

  return {
    text,
    data: body?.data as T | undefined,
    fallback: Boolean(body?.fallback),
  };
}
