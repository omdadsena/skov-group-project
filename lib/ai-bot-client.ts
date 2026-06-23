export const AI_FALLBACK_REPLY =
  "SKOV AI is temporarily unavailable. Please try again in a moment or chat with our team on WhatsApp at +91 91318 00113.";

export type AiBotPayload = {
  botType: string;
  prompt?: string;
  messages?: Array<{ role: string; text: string }>;
  image?: string;
  style?: string;
  mode?: "plan" | "elevation" | "3d";
  generationId?: string;
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
    cache: "no-store",
    body: JSON.stringify(payload),
  });

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    if (response.status === 413) {
      throw new Error("The uploaded image is too large. It will be retried using the written brief.");
    }
    throw new Error(body?.error || `Concept request failed (${response.status}). Please try again.`);
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
