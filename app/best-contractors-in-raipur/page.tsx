import SeoArticlePage from "@/components/SeoArticlePage";
import { articleSeo } from "@/lib/seo-content";
const article = articleSeo["best-contractors-in-raipur"];
export const metadata = { title: article.title, description: article.description, alternates: { canonical: "/best-contractors-in-raipur" } };
export default function Page() { return <SeoArticlePage slug="best-contractors-in-raipur" />; }
