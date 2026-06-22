import CityPage from "@/components/CityPage";
import { citySeo } from "@/lib/seo-content";
export const metadata = { title: citySeo.Bhilai.title, description: citySeo.Bhilai.description, alternates: { canonical: "/contractors-in-bhilai" } };
export default function Page() { return <CityPage city="Bhilai" />; }
