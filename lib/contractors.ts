export type Contractor = {
  id: string;
  name: string;
  city: "Raipur" | "Bilaspur";
  specialty: string;
  rating: number;
  projects: number;
  experience: number;
  startingPrice: number; // ₹/sqft
  verified: boolean;
  tags: string[];
};

export const contractors: Contractor[] = [];
