import SeoArticlePage from "@/components/SeoArticlePage";
import { articleSeo } from "@/lib/seo-content";
const article = articleSeo["verified-contractors-in-chhattisgarh"];
export const metadata = { title: article.title, description: article.description, alternates: { canonical: "/verified-contractors-in-chhattisgarh" } };
export default function Page() { return <SeoArticlePage slug="verified-contractors-in-chhattisgarh" />; }
