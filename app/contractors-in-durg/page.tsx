import CityPage from "@/components/CityPage";
import { citySeo } from "@/lib/seo-content";
export const metadata = { title: citySeo.Durg.title, description: citySeo.Durg.description, alternates: { canonical: "/contractors-in-durg" } };
export default function Page() { return <CityPage city="Durg" />; }
