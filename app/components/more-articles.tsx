
import { Article } from "@/interfaces/article";
import { ArticlePreview } from "./article-preview";

type Props = {
    articles: Article[];
};

export function MoreArticles({ articles }: Props) {
    return (
        <section>
            <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                More Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
                {articles.map((article) => (
                    <ArticlePreview
                        key={article.slug}
                        title={article.title}
                        image={article.image}
                        date={article.createdAt}
                        author={article.author}
                        slug={article.slug}
                        description={article.description}

                    />
                ))}
            </div>
        </section>
    );
}
