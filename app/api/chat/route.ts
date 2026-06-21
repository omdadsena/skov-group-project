import { NextRequest, NextResponse } from "next/server";
import { geminiChat } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { messages, context } = await request.json();
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    // Build the conversation as a single user message for simplicity
    const lastUserMsg = [...messages].reverse().find((m: any) => m.role === "user");
    const userText = lastUserMsg?.text || messages[messages.length - 1]?.text || "";

    const systemInstruction =
      context ||
      "You are SKOV Assist, a premium civil engineering and construction AI advisor for SKOV GROUP. Provide concise, professional Vastu, costing, and contractor matching guidance for Indian homeowners in Raipur and Bilaspur. Use a warm, authoritative tone.";

    const text = await geminiChat(systemInstruction, userText, 800);
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error in chat api route:", error);
    return NextResponse.json({
      text: "AI is temporarily unavailable. Please try again or chat with SKOV GROUP on WhatsApp.",
    }, { status: 503 });
  }
}
