import { NextRequest, NextResponse } from "next/server";
import { searchContractors } from "@/lib/contractors";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const result = await searchContractors({
      q: searchParams.get("q") || undefined,
      state: searchParams.get("state") || undefined,
      services: searchParams.get("services") || undefined,
      min_rating: searchParams.get("min_rating")
        ? parseFloat(searchParams.get("min_rating")!)
        : undefined,
      page: searchParams.get("page")
        ? parseInt(searchParams.get("page")!)
        : 1,
      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit")!)
        : 20,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Contractor search API error:", error);
    return NextResponse.json(
      {
        contractors: [],
        total: 0,
        page: 1,
        totalPages: 0,
        info: "Search is temporarily unavailable. Please try again.",
      },
      { status: 500 }
    );
  }
}
