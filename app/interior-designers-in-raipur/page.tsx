import SeoArticlePage from "@/components/SeoArticlePage";
import { articleSeo } from "@/lib/seo-content";
const article = articleSeo["interior-designers-in-raipur"];
export const metadata = { title: article.title, description: article.description, alternates: { canonical: "/interior-designers-in-raipur" } };
export default function Page() { return <SeoArticlePage slug="interior-designers-in-raipur" />; }
