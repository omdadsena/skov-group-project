export type DirectoryContractor = {
  id: string;
  company: string;
  city: string;
  state: string;
  services: string[];
  experience: number;
  phone: string;
  isVerified: boolean;
};

export const directoryContractors: DirectoryContractor[] = [
  {
    id: "raipur-buildworks",
    company: "Raipur Buildworks",
    city: "Raipur",
    state: "Chhattisgarh",
    services: ["Home Construction", "Renovation"],
    experience: 12,
    phone: "9131800113",
    isVerified: false,
  },
  {
    id: "capital-civil-projects",
    company: "Capital Civil Projects",
    city: "Raipur",
    state: "Chhattisgarh",
    services: ["Civil Work", "Commercial"],
    experience: 9,
    phone: "9131800113",
    isVerified: false,
  },
  {
    id: "bilaspur-homecraft",
    company: "Bilaspur Homecraft",
    city: "Bilaspur",
    state: "Chhattisgarh",
    services: ["Construction", "Interiors"],
    experience: 11,
    phone: "9131800113",
    isVerified: false,
  },
  {
    id: "baloda-build-solutions",
    company: "Baloda Build Solutions",
    city: "Baloda Bazar",
    state: "Chhattisgarh",
    services: ["Residential", "Renovation"],
    experience: 8,
    phone: "9131800113",
    isVerified: false,
  },
  {
    id: "steel-city-contracting",
    company: "Steel City Contracting",
    city: "Bhilai",
    state: "Chhattisgarh",
    services: ["Construction", "Structural Work"],
    experience: 14,
    phone: "9131800113",
    isVerified: false,
  },
  {
    id: "durg-renovation-studio",
    company: "Durg Renovation Studio",
    city: "Durg",
    state: "Chhattisgarh",
    services: ["Renovation", "Interiors"],
    experience: 7,
    phone: "9131800113",
    isVerified: false,
  },
  {
    id: "kawardha-construction-co",
    company: "Kawardha Construction Co.",
    city: "Kawardha",
    state: "Chhattisgarh",
    services: ["Home Construction", "Plumbing"],
    experience: 10,
    phone: "9131800113",
    isVerified: false,
  },
  {
    id: "mahanadi-design-build",
    company: "Mahanadi Design & Build",
    city: "Raipur",
    state: "Chhattisgarh",
    services: ["3D Design", "Turnkey Construction"],
    experience: 6,
    phone: "9131800113",
    isVerified: false,
  },
];

export const cityRoutes = [
  { city: "Raipur", href: "/contractors-in-raipur" },
  { city: "Bilaspur", href: "/contractors-in-bilaspur" },
  { city: "Baloda Bazar", href: "/contractors-in-baloda-bazar" },
  { city: "Bhilai", href: "/contractors-in-bhilai" },
  { city: "Durg", href: "/contractors-in-durg" },
  { city: "Kawardha", href: "/contractors-in-kawardha" },
];
