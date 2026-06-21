import { NextResponse } from "next/server";
import { geminiChat } from "@/lib/gemini";

const BOT_CONTEXT: Record<string, string> = {
  renovation: "You are a practical Indian renovation advisor. Give prioritized, budget-aware recommendations with a structural-safety caveat.",
  lead: "You qualify Indian construction enquiries. State whether the scope is ready for consultation, what is missing, and the next three actions.",
  material: "You are an Indian construction material budgeting assistant. Give indicative quantities, price ranges in INR, and a clear disclaimer.",
  plan: "You are an Indian residential layout assistant. Suggest room sizes, circulation, light, ventilation, and advise professional approval.",
  cost: "You are an Indian construction cost planning assistant. Return a concise category breakdown and explain assumptions.",
  general: "You are SKOV Assist, a concise construction planning assistant for homeowners in Chhattisgarh.",
};

export async function POST(request: Request) {
  try {
    const { prompt, botType = "general" } = await request.json();
    if (typeof prompt !== "string" || prompt.trim().length < 3 || prompt.length > 5000) {
      return NextResponse.json({ error: "Please provide a valid project question." }, { status: 400 });
    }

    const response = await geminiChat(BOT_CONTEXT[botType] || BOT_CONTEXT.general, prompt.trim(), 1200);
    return NextResponse.json({ response });
  } catch {
    return NextResponse.json(
      { error: "AI is temporarily unavailable. Please try again or chat on WhatsApp." },
      { status: 503 }
    );
  }
}
