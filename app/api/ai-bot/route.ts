import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const FALLBACK_REPLY =
  "SKOV AI is temporarily unavailable. Please try again in a moment, use the planning tools on this page, or chat with our team on WhatsApp at +91 91318 00113.";

const BOT_PROMPTS: Record<string, string> = {
  general:
    "You are SKOV Assist, a concise construction planning assistant for homeowners in Chhattisgarh. Give practical India-specific guidance and clearly label estimates as indicative.",
  contractor_finder:
    "You are SKOV GROUP's contractor matching advisor. Recommend the suitable contractor type, checks, written scope, payment milestones, red flags, and realistic next steps. Never promise guaranteed leads or outcomes.",
  renovation_advisor:
    "You are an Indian renovation advisor. Give prioritized recommendations, indicative INR ranges, practical materials, timeline guidance, and a structural-safety warning where relevant.",
  lead_qualifier:
    "You qualify Indian construction enquiries. Summarize readiness, missing information, budget feasibility, risks, and the next three actions.",
  plan_assistant:
    "You are an Indian residential layout assistant. Suggest room sizes, circulation, ventilation, daylight, practical Vastu preferences, and state that final drawings require qualified professional approval.",
  material_budget:
    "You are an Indian construction material budgeting assistant. Give indicative quantities, INR price ranges, wastage allowances, brand-selection guidance, and require live local quotations for final pricing.",
  progress_tracker:
    "You are a construction site quality assistant. Give a phase-specific inspection checklist, common mistakes, documentation steps, safety warnings, and next-phase readiness criteria. Never certify structural safety remotely.",
  interior_design:
    "You are an Indian interior planning assistant. Suggest layout, materials, lighting, palette, indicative INR budget categories, maintainability, and practical brand-selection criteria.",
  qa_bot:
    "You are SKOV GROUP's contractor and construction Q&A assistant. Reply in English or natural Hinglish matching the user. Be concise, transparent, and never promise guaranteed leads.",
  sketch_3d:
    "You are an Indian architect and home-planning assistant. Analyze the supplied sketch as a concept only. Do not claim structural certification or produce execution-ready drawings.",
};

type AiBotRequest = {
  botType?: string;
  prompt?: string;
  message?: string;
  messages?: Array<{ role?: string; text?: string }>;
  image?: string;
  style?: string;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
    finishReason?: string;
  }>;
  error?: { message?: string; code?: number };
};

function extractPrompt(body: AiBotRequest) {
  if (typeof body.prompt === "string") return body.prompt.trim();
  if (typeof body.message === "string") return body.message.trim();
  if (Array.isArray(body.messages)) {
    return [...body.messages]
      .reverse()
      .find((item) => item.role === "user" && typeof item.text === "string")
      ?.text?.trim() || "";
  }
  return "";
}

function parseDataUrl(image: string) {
  const match = image.match(/^data:(image\/(?:png|jpeg|jpg|webp));base64,([A-Za-z0-9+/=]+)$/);
  if (!match) return null;
  return { mimeType: match[1] === "image/jpg" ? "image/jpeg" : match[1], data: match[2] };
}

function extractText(payload: GeminiResponse) {
  return payload.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim() || "";
}

function parseJsonText(text: string) {
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  return JSON.parse(cleaned);
}

function sketchFallback() {
  return {
    layoutAnalysis: [
      {
        area: "Uploaded plan",
        observation: "The AI image review is temporarily unavailable.",
        improvement: "Please retry with a clear, straight, well-lit image showing dimensions.",
      },
    ],
    roomWallUnderstanding: FALLBACK_REPLY,
    designConceptNotes:
      "Keep room names, dimensions, doors, windows, north direction, and plot boundaries visible. A qualified architect must prepare final drawings.",
    estimatedBuiltUpArea: "Requires readable dimensions",
    roughCostRange: "Use the SKOV cost estimator after confirming area",
    conceptDirections: [
      {
        name: "Practical concept",
        desc: "Prioritize circulation, daylight, ventilation, and a simple structural grid.",
        vastuCompatibility: "Review orientation with the final site plan.",
      },
    ],
  };
}

async function callGemini({
  apiKey,
  systemInstruction,
  prompt,
  image,
  jsonMode,
}: {
  apiKey: string;
  systemInstruction: string;
  prompt: string;
  image?: { mimeType: string; data: string };
  jsonMode: boolean;
}) {
  const models = [
    process.env.GEMINI_MODEL,
    "gemini-3.5-flash",
    "gemini-2.5-flash",
  ].filter((model, index, values): model is string => Boolean(model) && values.indexOf(model) === index);

  let lastError = "Gemini request failed.";

  for (const model of models) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45_000);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          signal: controller.signal,
          cache: "no-store",
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemInstruction }] },
            contents: [
              {
                role: "user",
                parts: [
                  { text: prompt },
                  ...(image ? [{ inline_data: image }] : []),
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: jsonMode ? 1800 : 1200,
              temperature: 0.5,
              ...(jsonMode ? { responseMimeType: "application/json" } : {}),
            },
          }),
        },
      );

      const payload = (await response.json().catch(() => ({}))) as GeminiResponse;
      const text = extractText(payload);

      if (response.ok && text) return { text, model };

      lastError = payload.error?.message || `Gemini returned HTTP ${response.status}.`;
      if (![404, 429, 503].includes(response.status)) break;
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Gemini network request failed.";
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error(lastError);
}

export async function POST(request: Request) {
  let body: AiBotRequest;

  try {
    body = (await request.json()) as AiBotRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const botType = body.botType || "general";
  const prompt = extractPrompt(body);
  const image = body.image ? parseDataUrl(body.image) || undefined : undefined;

  if (!prompt && !image) {
    return NextResponse.json({ error: "Please enter a question or upload an image." }, { status: 400 });
  }
  if (prompt.length > 8_000) {
    return NextResponse.json({ error: "Please shorten your request." }, { status: 400 });
  }
  if (body.image && !image) {
    return NextResponse.json({ error: "Upload a PNG, JPEG, or WebP image." }, { status: 400 });
  }

  const isSketch = botType === "sketch_3d";
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    console.error("AI bot configuration error: GEMINI_API_KEY is missing.");
    const data = isSketch ? sketchFallback() : undefined;
    return NextResponse.json({
      ok: false,
      fallback: true,
      text: FALLBACK_REPLY,
      response: FALLBACK_REPLY,
      ...(data ? { data } : {}),
    });
  }

  const sketchPrompt = `Analyze this uploaded floor-plan or home sketch in a ${body.style || "Modern"} style.
Return valid JSON only with this exact shape:
{
  "layoutAnalysis": [{"area":"string","observation":"string","improvement":"string"}],
  "roomWallUnderstanding":"string",
  "designConceptNotes":"string",
  "estimatedBuiltUpArea":"string",
  "roughCostRange":"string",
  "conceptDirections":[{"name":"string","desc":"string","vastuCompatibility":"string"}]
}
Use cautious language. If dimensions are unreadable, say so instead of inventing them.`;

  try {
    const result = await callGemini({
      apiKey,
      systemInstruction: BOT_PROMPTS[botType] || BOT_PROMPTS.general,
      prompt: isSketch ? sketchPrompt : prompt,
      image,
      jsonMode: isSketch,
    });

    if (isSketch) {
      const data = parseJsonText(result.text);
      return NextResponse.json({ ok: true, fallback: false, text: result.text, response: result.text, data });
    }

    return NextResponse.json({
      ok: true,
      fallback: false,
      text: result.text,
      response: result.text,
    });
  } catch (error) {
    console.error("Gemini AI bot request failed:", error instanceof Error ? error.message : error);
    const data = isSketch ? sketchFallback() : undefined;
    return NextResponse.json({
      ok: false,
      fallback: true,
      text: FALLBACK_REPLY,
      response: FALLBACK_REPLY,
      ...(data ? { data } : {}),
    });
  }
}
