import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  // Protect with CRON_SECRET if configured
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const { contractors } = await request.json();
    if (!Array.isArray(contractors) || contractors.length === 0) {
      return NextResponse.json(
        { error: "No contractor data provided." },
        { status: 400 }
      );
    }

    let updated = 0;
    let newCount = 0;
    const errors: string[] = [];

    for (const c of contractors) {
      try {
        const { data: existing } = await supabase
          .from("contractors")
          .select("id")
          .eq("phone", c.phone)
          .maybeSingle();

        if (existing) {
          await supabase
            .from("contractors")
            .update({
              name: c.name,
              city: c.city,
              state: c.state,
              services: c.services || [],
              rating: c.rating || 0,
              reviews_count: c.reviews_count || 0,
              last_updated: new Date().toISOString(),
            })
            .eq("id", existing.id);
          updated++;
        } else {
          await supabase.from("contractors").insert({
            name: c.name,
            phone: c.phone,
            city: c.city,
            state: c.state,
            services: c.services || [],
            rating: c.rating || 0,
            reviews_count: c.reviews_count || 0,
            source: c.source || "google_places",
            last_updated: new Date().toISOString(),
          });
          newCount++;
        }
      } catch (err: any) {
        errors.push(`${c.name}: ${err.message}`);
      }
    }

    return NextResponse.json({
      updated,
      new: newCount,
      errors,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Update failed." },
      { status: 500 }
    );
  }
}
