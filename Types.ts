import { LucideIcon } from "lucide-react";

export interface Contractor {
  id: string;
  name: string;
  city: string;
  specialty: string;
  rating: number;
  projects: number;
  experience: number;
  startingPrice: number;
  verified: boolean;
  tags: string[];
}

export interface Tool {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  href: string;
  highlight?: boolean;
}

export interface City {
  name: string;
  state: string;
  status: "Active" | "Expanding Soon";
}

export interface Project {
  id: string;
  title: string;
  city: string;
  type: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
