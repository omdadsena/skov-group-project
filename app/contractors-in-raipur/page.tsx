import CityPage from "@/components/CityPage";
import { citySeo } from "@/lib/seo-content";
export const metadata = { title: citySeo.Raipur.title, description: citySeo.Raipur.description, alternates: { canonical: "/contractors-in-raipur" } };
export default function Page() { return <CityPage city="Raipur" />; }
