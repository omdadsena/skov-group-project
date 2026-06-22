import CityPage from "@/components/CityPage";
import { citySeo } from "@/lib/seo-content";
export const metadata = { title: citySeo.Bilaspur.title, description: citySeo.Bilaspur.description, alternates: { canonical: "/contractors-in-bilaspur" } };
export default function Page() { return <CityPage city="Bilaspur" />; }
