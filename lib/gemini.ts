import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key.trim() === "") {
    throw new Error("Gemini API key not configured.");
  }
  if (!genAI) genAI = new GoogleGenerativeAI(key);
  return genAI;
}

export function getGeminiModel(modelName = "gemini-1.5-flash") {
  return getClient().getGenerativeModel({ model: modelName });
}

export async function geminiChat(
  systemPrompt: string,
  userMessage: string,
  maxTokens = 1024
): Promise<string> {
  try {
    const model = getGeminiModel();
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      systemInstruction: { role: "user", parts: [{ text: systemPrompt }] },
      generationConfig: { maxOutputTokens: maxTokens },
    });
    const text = result.response.text();
    if (!text) throw new Error("Empty response from Gemini.");
    return text;
  } catch (err: any) {
    if (err.message?.includes("429") || err.message?.includes("RATE_LIMIT")) {
      throw new Error("Too many requests. Please try again in 1 minute.");
    }
    if (err.message?.includes("API key")) {
      throw new Error("Gemini API key not configured.");
    }
    throw new Error(err.message || "Failed to get AI response.");
  }
}

export async function geminiJSON(
  systemPrompt: string,
  userMessage: string,
  maxTokens = 1500
): Promise<any> {
  try {
    const model = getGeminiModel();
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      systemInstruction: { role: "user", parts: [{ text: systemPrompt }] },
      generationConfig: {
        maxOutputTokens: maxTokens,
        responseMimeType: "application/json",
      },
    });
    const text = result.response.text();
    return JSON.parse(text.trim());
  } catch (err: any) {
    if (err.message?.includes("429") || err.message?.includes("RATE_LIMIT")) {
      throw new Error("Too many requests. Please try again in 1 minute.");
    }
    throw new Error(err.message || "Failed to parse AI response.");
  }
}

export async function geminiVision(
  systemPrompt: string,
  imageBase64: string,
  mimeType: string,
  maxTokens = 1500
): Promise<string> {
  try {
    const model = getGeminiModel();
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: systemPrompt },
            { inlineData: { mimeType, data: imageBase64 } },
          ],
        },
      ],
      generationConfig: { maxOutputTokens: maxTokens },
    });
    const text = result.response.text();
    if (!text) throw new Error("Empty response from Gemini Vision.");
    return text;
  } catch (err: any) {
    if (err.message?.includes("429") || err.message?.includes("RATE_LIMIT")) {
      throw new Error("Too many requests. Please try again in 1 minute.");
    }
    throw new Error(err.message || "Failed to analyze image.");
  }
}
