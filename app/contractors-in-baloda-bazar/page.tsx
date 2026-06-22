import CityPage from "@/components/CityPage";
import { citySeo } from "@/lib/seo-content";
export const metadata = { title: citySeo["Baloda Bazar"].title, description: citySeo["Baloda Bazar"].description, alternates: { canonical: "/contractors-in-baloda-bazar" } };
export default function Page() { return <CityPage city="Baloda Bazar" />; }
