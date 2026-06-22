import SeoArticlePage from "@/components/SeoArticlePage";
import { articleSeo } from "@/lib/seo-content";
const article = articleSeo["house-construction-cost-in-chhattisgarh"];
export const metadata = { title: article.title, description: article.description, alternates: { canonical: "/house-construction-cost-in-chhattisgarh" } };
export default function Page() { return <SeoArticlePage slug="house-construction-cost-in-chhattisgarh" />; }
