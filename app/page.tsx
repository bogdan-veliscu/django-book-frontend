import Container from "@/app/components/container";

import { MoreArticles } from "./components/more-articles";

import { getArticles } from "@/services/article-service";
import HeroArticle from "./components/hero-article";


export default async function Index() {

    const allArticles = await getArticles();
    const heroArticle = allArticles[0];
    // const moreArticles = allArticles.slice(1);

    return (
        <main>
            <Container>
                <HeroArticle article={heroArticle} />
                <MoreArticles articles={allArticles} />
            </Container>
        </main>
    );
}