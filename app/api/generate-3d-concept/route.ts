import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return NextResponse.json(
      { error: "Gemini API key not configured." },
      { status: 400 }
    );
  }

  try {
    const { image, style } = await request.json();
    if (!image) {
      return NextResponse.json(
        { error: "No image uploaded." },
        { status: 400 }
      );
    }

    // Extract base64 details from Data URL
    // e.g. "data:image/png;base64,iVBORw0KGgoAAAANS..."
    const match = image.match(/^data:(image\/[a-zA-Z0-9.-]+);base64,(.+)$/);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid image format. Please upload a PNG or JPEG." },
        { status: 400 }
      );
    }
    const mimeType = match[1];
    const base64Data = match[2];

    const promptText = `
You are an expert civil engineer, architect, and Vastu consultant.
Analyze the uploaded floor plan sketch, blueprint image, or home layout design.
Provide a complete professional architectural and structural feasibility analysis.
You must respond with a JSON object matching this schema:
{
  "layoutAnalysis": [
    { "area": "string", "observation": "string", "improvement": "string" }
  ],
  "roomWallUnderstanding": "string",
  "designConceptNotes": "string",
  "estimatedBuiltUpArea": "string",
  "roughCostRange": "string",
  "conceptDirections": [
    { "name": "string", "desc": "string", "vastuCompatibility": "string" }
  ]
}

Style theme requested by user: ${style}.
Ensure all feedback, measurements, and cost estimations are professional, realistic, and tailored for residential home building projects in India.
Do not wrap your response in markdown code blocks like \`\`\`json. Return only raw, valid JSON.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: promptText },
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: base64Data,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API connection error:", errText);
      return NextResponse.json(
        { error: "Gemini API failed to process the request." },
        { status: 500 }
      );
    }

    const resData = await response.json();
    const resultText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!resultText) {
      return NextResponse.json(
        { error: "No response text received from Gemini." },
        { status: 500 }
      );
    }

    try {
      const parsedJson = JSON.parse(resultText.trim());
      return NextResponse.json(parsedJson);
    } catch (parseError) {
      console.error("Failed to parse JSON from Gemini:", resultText);
      return NextResponse.json(
        { error: "Invalid JSON structure returned by Gemini API." },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error("Error in generate-3d-concept route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate design concepts." },
      { status: 500 }
    );
  }
}
