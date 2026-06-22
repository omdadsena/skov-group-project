import CityPage from "@/components/CityPage";
import { citySeo } from "@/lib/seo-content";
export const metadata = { title: citySeo.Kawardha.title, description: citySeo.Kawardha.description, alternates: { canonical: "/contractors-in-kawardha" } };
export default function Page() { return <CityPage city="Kawardha" />; }
