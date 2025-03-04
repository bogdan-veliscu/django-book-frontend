import { Metadata } from "next";
import { notFound } from "next/navigation";
import markdownToHtml from "../../lib/markdownToHtml";
import Container from "../../components/container";
import { ArticleBody } from "../../components/article-body";
import { ArticleHeader } from "../../components/article-header";
import { fetchArticle, fetchArticles } from "../../services/articleService";
import Header from "../../components/header";
import { type Article } from "../../interfaces/article";

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
                <article className="mb-32">
                    <ArticleHeader
                        title={articleObj.title}
                        image={articleObj.image || ""}
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
    try {
        const article = await fetchArticle(params.slug);

        if (!article) {
            return {
                title: 'Article Not Found',
                description: 'The article you are looking for does not exist.',
            };
        }

        return {
            title: article.title || 'Article',
            description: article.description || 'Article description',
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Article',
            description: 'Article description',
        };
    }
}

export async function generateStaticParams() {
    try {
        const articles = await fetchArticles();
        return articles.map((article) => ({
            slug: article.slug,
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        // Return an empty array if we can't fetch articles during build
        return [];
    }
}
