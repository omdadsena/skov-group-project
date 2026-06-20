import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return NextResponse.json({
      text: "Namaste! I'm SKOV Assist. To chat dynamically, please ensure GEMINI_API_KEY is configured in your .env.local file and restart the Next.js local server.",
    });
  }

  try {
    const { messages, context } = await request.json();
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    // Format message history for Gemini API.
    // Maps role 'bot' -> 'model' and 'user' -> 'user'
    const formattedContents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const systemInstruction =
      context ||
      "You are SKOV Assist, a premium civil engineering and construction AI advisor for SKOV GROUP. Provide concise, professional Vastu, costing, and contractor matching guidance for Indian homeowners in Raipur and Bilaspur. Use a warm, authoritative tone.";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: formattedContents,
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
          generationConfig: {
            maxOutputTokens: 300,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API Chat Error:", errText);
      return NextResponse.json({
        text: "I am experiencing temporary server load. Please try checking back in a few seconds.",
      });
    }

    const resData = await response.json();
    const replyText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!replyText) {
      return NextResponse.json({
        text: "I missed that. Please rephrase your question about construction.",
      });
    }

    return NextResponse.json({ text: replyText });
  } catch (error: any) {
    console.error("Error in chat api route:", error);
    return NextResponse.json({
      text: "An internal processing error occurred. Let's try that again.",
    });
  }
}
