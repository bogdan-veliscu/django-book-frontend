import { Metadata } from "next";
import { notFound } from "next/navigation";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/components/container";
import { ArticleBody } from "@/components/article-body";
import { ArticleHeader } from "@/components/article-header";
import { fetchArticle } from "@/services/articleService";
import { fetchArticles } from "@/api/apiClient";
import Header from "@/components/header";
import { type Article } from "@/interfaces/article";

export default async function Post({ params }: Params) {
    console.log("$$$ -> ", params.slug);
    const articleObj = await fetchArticle(params.slug);

    if (!articleObj) {
        return notFound();
    }
    console.log("$$$ -> ", articleObj);
    const content = await markdownToHtml(articleObj.body || "");

    return (
        <main>
            <Container>
                <Header />
                <article className="mb-32">
                    <ArticleHeader
                        title={articleObj.title}
                        image={articleObj.image}
                        date={articleObj.createdAt}
                        author={articleObj.author}
                    />
                    <ArticleBody body={content} />
                </article>
            </Container>
        </main>
    );
}

type Params = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const article = await fetchArticle(params.slug);

    if (!article) {
        return notFound();
    }

    const title = `${article.title} | Next.js Blog Example`;

    return {
        title,
        openGraph: {
            title,
            images: [article.image],
        },
    };
}

export async function generateStaticParams() {
    const articles: Article[] = await fetchArticles();

    return articles.map((article) => ({
        slug: article.slug,
    }));
}
