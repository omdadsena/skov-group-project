import SeoArticlePage from "@/components/SeoArticlePage";
import { articleSeo } from "@/lib/seo-content";
const article = articleSeo["construction-cost-in-raipur"];
export const metadata = { title: article.title, description: article.description, alternates: { canonical: "/construction-cost-in-raipur" } };
export default function Page() { return <SeoArticlePage slug="construction-cost-in-raipur" />; }
