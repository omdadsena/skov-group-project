import { supabase } from "./supabase";

export type Contractor = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  city: string;
  state: string;
  services: string[];
  rating: number;
  reviews_count: number;
  is_verified: boolean;
  portfolio_images: string[];
  license_number: string | null;
  source: string;
  last_updated: string;
  created_at: string;
};

export type ContractorSearchParams = {
  q?: string;
  state?: string;
  services?: string;
  min_rating?: number;
  page?: number;
  limit?: number;
};

export async function searchContractors(params: ContractorSearchParams) {
  let query = supabase.from("contractors").select("*", { count: "exact" });

  if (params.q) {
    query = query.or(
      `name.ilike.%${params.q}%,city.ilike.%${params.q}%,state.ilike.%${params.q}%`
    );
  }
  if (params.state) {
    query = query.eq("state", params.state);
  }
  if (params.services) {
    query = query.contains("services", [params.services]);
  }
  if (params.min_rating) {
    query = query.gte("rating", params.min_rating);
  }

  const page = params.page || 1;
  const limit = params.limit || 20;
  const from = (page - 1) * limit;

  query = query
    .order("rating", { ascending: false })
    .range(from, from + limit - 1);

  const { data, count, error } = await query;

  if (error) {
    console.error("Contractor search error:", error);
    return { contractors: [], total: 0, page, totalPages: 0 };
  }

  return {
    contractors: (data || []) as Contractor[],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

export async function getContractorById(id: string) {
  const { data, error } = await supabase
    .from("contractors")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as Contractor;
}
