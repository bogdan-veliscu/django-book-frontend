import Container from "@/components/container";
import { HeroArticle } from "@/components/hero-article";
// import { Intro } from "@/components/intro";
import { MoreArticles } from "@/components/more-articles";
import { fetchArticles } from "./api/apiClient";

export default async function Index() {
  const articles = await fetchArticles();

  const article = articles[0];

  const moreArticles = articles.slice(1);

  console.log("$$$ -> ", articles.length, typeof articles[0]);

  return (
    <main>
      <Container>
        {/* <Intro /> */}
        <HeroArticle
          title={article.title}
          image={article.image}
          date={article.createdAt}
          author={article.author}
          slug={article.slug}
          description={article.description}
        />
        {moreArticles.length > 0 && <MoreArticles articles={moreArticles} />}
      </Container>
    </main>
  );
}
