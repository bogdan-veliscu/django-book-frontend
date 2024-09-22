
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import distanceToNow from "@/lib/dateRelative";
import Container from "@/app/components/container";
import { getArticleBySlug, getArticles } from "@/services/article-service";
import markdownToHtml from "@/services/markdownToHtml";
import { Article } from "@/interfaces/article";
import Header from "@/app/components/header";

export default function ArticlePage({
    article, content
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();
    if (!article?.slug) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <Container>
            <Head>
                <title>{article.title} | Conduit blog</title>
            </Head>
            <Header />

            {router.isFallback ? (
                <div>Loading…</div>
            ) : (
                <div>
                    <article className="mb-32">
                        <header>
                            <h1 className="text-4xl font-bold">{article.title}</h1>
                            {article.description ? (
                                <p className="mt-2 text-xl">{article.description}</p>
                            ) : null}
                            <time className="flex mt-2 text-gray-400">
                                {distanceToNow(new Date(article.updatedAt))}
                            </time>
                        </header>

                        <div
                            className="prose mt-10"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </article>

                </div>
            )}
        </Container>
    );
}

type Params = {
    params: {
        slug: string;
    };
};

export async function getStaticProps({ params }: Params) {
    const article = await getArticleBySlug(params.slug);
    const content = await markdownToHtml(article.body || "");

    return {
        props: {
            article: article,
            content: content
        },
    };
}

export async function getStaticPaths() {
    const articles = await getArticles();

    return {
        paths: articles.map(({ slug }) => {
            return {
                params: {
                    slug,
                },
            };
        }),
        fallback: false,
    };
}
