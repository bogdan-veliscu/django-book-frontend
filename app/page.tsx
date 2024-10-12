"use client";

import Container from "@/components/container";
import { HeroArticle } from "@/components/hero-article";
// import { Intro } from "@/components/intro";
import { MoreArticles } from "@/components/more-articles";
import { useArticles } from "./hooks/useArticles";

export default function Index() {
  const { articles, loading, error } = useArticles();

  const article = articles[0];

  const moreArticles = articles.slice(1);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

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
