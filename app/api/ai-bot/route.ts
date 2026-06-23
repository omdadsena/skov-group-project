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
  mode?: "plan" | "elevation" | "3d";
  generationId?: string;
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

function createSketchFallback({
  generationId,
  prompt,
  style,
  mode,
  hasImage,
}: {
  generationId: string;
  prompt: string;
  style: string;
  mode: "plan" | "elevation" | "3d";
  hasImage: boolean;
}) {
  const lower = prompt.toLowerCase();
  const seed = [...generationId].reduce((total, character) => total + character.charCodeAt(0), 0);
  const numberMatch = lower.match(/\b([1-6])\s*(?:bed|bedroom|bhk)/);
  const wordNumbers: Record<string, number> = {
    one: 1, two: 2, three: 3, four: 4, five: 5, six: 6,
  };
  const wordMatch = Object.entries(wordNumbers).find(([word]) =>
    new RegExp(`\\b${word}\\s*(?:bed|bedroom)`).test(lower),
  );
  const bedroomCount = Number(numberMatch?.[1] || wordMatch?.[1] || (2 + (seed % 2)));
  const requestedRooms = [
    lower.includes("office") && "Home Office",
    lower.includes("courtyard") && "Courtyard",
    lower.includes("balcony") && "Balcony",
    lower.includes("puja") && "Puja Room",
    lower.includes("parking") && "Parking",
    lower.includes("dining") && "Dining",
  ].filter((room): room is string => Boolean(room));
  const zones = ["public", "service", ...Array.from({ length: bedroomCount }, () => "private")];
  const names = [
    "Living Room",
    "Kitchen",
    ...Array.from({ length: bedroomCount }, (_, index) => `Bedroom ${index + 1}`),
    ...requestedRooms,
  ];
  const rooms = names.map((name, index) => ({
    name,
    zone: zones[index] || (["Courtyard", "Balcony", "Parking"].includes(name) ? "outdoor" : "private"),
    approximateSize: "To be confirmed from measured drawings",
    adjacency:
      name === "Living Room" ? ["Kitchen", names.includes("Dining") ? "Dining" : "Entry"] :
      name === "Kitchen" ? ["Living Room", names.includes("Dining") ? "Dining" : "Service area"] :
      ["Circulation spine"],
    notes: `${name} is positioned as a ${index % 2 === seed % 2 ? "daylight-focused" : "privacy-focused"} zone in this concept.`,
  }));
  const rotation = seed % 3;
  const layoutNotes = [
    rotation === 0
      ? "Use a compact central circulation spine to reduce corridor waste."
      : rotation === 1
        ? "Group private rooms along one edge and keep social areas near the entrance."
        : "Use a staggered room arrangement to improve daylight and cross ventilation.",
    "Confirm plot orientation, setbacks, columns, plumbing shafts, and exact dimensions with an architect.",
  ];
  const disclaimer = "Concept preview only — final 3D design requires architect review.";

  return {
    generationId,
    summary: `${style} ${bedroomCount}-bedroom ${mode === "3d" ? "massing direction" : mode} concept`,
    detectedInput: hasImage
      ? "An image was uploaded, but live visual AI analysis was temporarily unavailable. This fallback uses the written brief and selected options only."
      : "Concept inferred from the written brief and selected options.",
    estimated_room_count: rooms.length,
    rooms,
    layout: {
      orientation: "Confirm north direction and road-facing side before design development.",
      zoning: layoutNotes[0],
      circulation: rotation === 2 ? "Staggered circulation with short connectors." : "Short central circulation spine.",
      daylightVentilation: "Keep opposite or adjacent openings where site conditions permit.",
      entryStrategy: rotation === 0 ? "Direct entry into a sheltered living foyer." : "Recessed entry with a privacy buffer.",
      uncertainties: ["Image details were not analyzed by Gemini.", "Dimensions and structural constraints are unverified."],
    },
    elevation: {
      style,
      massing: rotation === 0 ? "Two clean interlocking volumes." : rotation === 1 ? "Layered facade with a shaded central bay." : "Asymmetric volumes with a recessed entrance.",
      materials: rotation === 2 ? ["Textured plaster", "Stone accent", "Metal screens"] : ["Light plaster", "Warm wood-look accents", "Local stone"],
      openings: "Use shaded windows sized after room orientation and privacy review.",
      roof: rotation === 1 ? "Flat roof with a lightweight entrance canopy." : "Flat parapet composition with concealed drainage.",
      climateResponse: "Prioritize deep shading, ventilated openings, and heat-conscious west-facing treatment.",
    },
    threeDConcepts: [
      {
        title: `${style} layered-volume direction`,
        designIntent: `A ${rotation === 0 ? "calm and balanced" : "bold and shaded"} exterior expression based on the selected style.`,
        form: rotation === 2 ? "Staggered boxes around a recessed entry." : "Interlocking horizontal volumes.",
        materials: ["Textured plaster", "Stone or tile accent", "Powder-coated metal"],
        landscape: names.includes("Courtyard") ? "Use the requested courtyard as the primary green focal point." : "Add a shaded entrance planter and low-maintenance native planting.",
        limitations: "This is a written design direction, not a rendered or measured 3D model.",
      },
    ],
    recommendations: [
      "Add plot dimensions, road direction, north direction, and floor count for a stronger next concept.",
      "Have a local architect verify setbacks, structure, ventilation, and service routing.",
    ],
    layout_notes: layoutNotes,
    suggested_improvements: [
      "Separate public and bedroom circulation where the plot allows.",
      "Align wet areas to simplify plumbing and maintenance.",
    ],
    elevation_idea: `${style} facade with shaded openings and ${rotation === 1 ? "layered" : "interlocking"} massing.`,
    "3d_concept_description": `Develop a ${style.toLowerCase()} composition using ${rotation === 2 ? "staggered" : "interlocking"} volumes, a clearly recessed entry, climate-responsive shading, and a restrained material palette.`,
    warnings: ["Gemini visual analysis was unavailable for this request.", "Do not use this concept as a construction drawing."],
    disclaimer,
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
  const generationId =
    typeof body.generationId === "string" && body.generationId.trim()
      ? body.generationId.trim().slice(0, 100)
      : crypto.randomUUID();
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const noStoreHeaders = {
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    Pragma: "no-cache",
  };

  if (!apiKey) {
    console.error("AI bot configuration error: GEMINI_API_KEY is missing.");
    if (isSketch) {
      const data = createSketchFallback({
        generationId,
        prompt,
        style: body.style || "Modern",
        mode: body.mode || "plan",
        hasImage: Boolean(image),
      });
      return NextResponse.json(
        {
          ok: true,
          fallback: true,
          generationId,
          text: data.summary,
          response: data.summary,
          data,
        },
        { headers: noStoreHeaders },
      );
    }
    return NextResponse.json({
      ok: false,
      fallback: true,
      text: FALLBACK_REPLY,
      response: FALLBACK_REPLY,
    }, { headers: noStoreHeaders });
  }

  const sketchPrompt = `Generation request ID / random seed: ${generationId}.
Analyze ${image ? "the uploaded floor-plan, blueprint, or home sketch" : "the user's written home brief"} and create a distinct ${body.style || "Modern"} concept response.
Primary requested mode: ${body.mode || "plan"}.
User brief: ${prompt || "No additional written brief supplied."}

This is conceptual architectural guidance only. Do not claim to generate an exact 3D model, construction drawing, structural design, or measured survey.
Do not reuse a generic fixed room list. Base rooms and recommendations only on visible or stated information. Clearly list uncertainty when the input is unclear.
Return valid JSON only with this exact shape:
{
  "generationId": "${generationId}",
  "summary": "string",
  "detectedInput": "string",
  "estimated_room_count": 0,
  "rooms": [
    {
      "name": "string",
      "zone": "public|private|service|outdoor|unclear",
      "approximateSize": "string",
      "adjacency": ["string"],
      "notes": "string"
    }
  ],
  "layout": {
    "orientation": "string",
    "zoning": "string",
    "circulation": "string",
    "daylightVentilation": "string",
    "entryStrategy": "string",
    "uncertainties": ["string"]
  },
  "elevation": {
    "style": "string",
    "massing": "string",
    "materials": ["string"],
    "openings": "string",
    "roof": "string",
    "climateResponse": "string"
  },
  "threeDConcepts": [
    {
      "title": "string",
      "designIntent": "string",
      "form": "string",
      "materials": ["string"],
      "landscape": "string",
      "limitations": "string"
    }
  ],
  "recommendations": ["string"],
  "layout_notes": ["string"],
  "suggested_improvements": ["string"],
  "elevation_idea": "string",
  "3d_concept_description": "string",
  "warnings": ["string"],
  "disclaimer": "Concept preview only — final 3D design requires architect review."
}
Return 2 to 4 genuinely different threeDConcepts. If dimensions are unreadable or absent, use "Not reliably determined" instead of inventing measurements.`;

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
      if (
        !data ||
        !Array.isArray(data.rooms) ||
        !data.layout ||
        !data.elevation ||
        !Array.isArray(data.threeDConcepts)
      ) {
        throw new Error("Gemini returned an incomplete concept response.");
      }
      data.generationId = generationId;
      data.estimated_room_count =
        typeof data.estimated_room_count === "number" ? data.estimated_room_count : data.rooms.length;
      data.layout_notes = Array.isArray(data.layout_notes)
        ? data.layout_notes
        : [
            data.layout.orientation,
            data.layout.zoning,
            data.layout.circulation,
            data.layout.daylightVentilation,
          ].filter(Boolean);
      data.suggested_improvements = Array.isArray(data.suggested_improvements)
        ? data.suggested_improvements
        : Array.isArray(data.recommendations) ? data.recommendations : [];
      data.elevation_idea =
        typeof data.elevation_idea === "string"
          ? data.elevation_idea
          : [data.elevation.style, data.elevation.massing].filter(Boolean).join(": ");
      data["3d_concept_description"] =
        typeof data["3d_concept_description"] === "string"
          ? data["3d_concept_description"]
          : data.threeDConcepts[0]?.designIntent || "Concept direction requires architect review.";
      data.warnings = Array.isArray(data.warnings)
        ? data.warnings
        : Array.isArray(data.layout.uncertainties) ? data.layout.uncertainties : [];
      data.disclaimer = "Concept preview only — final 3D design requires architect review.";
      return NextResponse.json(
        { ok: true, fallback: false, generationId, text: result.text, response: result.text, data },
        { headers: noStoreHeaders },
      );
    }

    return NextResponse.json({
      ok: true,
      fallback: false,
      text: result.text,
      response: result.text,
    }, { headers: noStoreHeaders });
  } catch (error) {
    console.error("Gemini AI bot request failed:", error instanceof Error ? error.message : error);
    if (isSketch) {
      const data = createSketchFallback({
        generationId,
        prompt,
        style: body.style || "Modern",
        mode: body.mode || "plan",
        hasImage: Boolean(image),
      });
      return NextResponse.json(
        {
          ok: true,
          fallback: true,
          generationId,
          text: data.summary,
          response: data.summary,
          data,
        },
        { headers: noStoreHeaders },
      );
    }
    return NextResponse.json({
      ok: false,
      fallback: true,
      text: FALLBACK_REPLY,
      response: FALLBACK_REPLY,
    }, { headers: noStoreHeaders });
  }
}
