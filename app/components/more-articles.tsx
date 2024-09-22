import { Article } from '@/interfaces/article'
import { Author } from '@/interfaces/author';
import { ArticlePreview } from './article-preview'

type Props = {
    articles: Article[];
};

export function MoreArticles({ articles }: Props) {
    // console.log("articles", articles)
    return (
        articles?.length === 0 ? null :
            <section className="flex flex-col items-center mt-16">
                <h2 className="text-3xl font-bold">More Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {articles.map((article) => (
                        <ArticlePreview
                            key={article.slug}
                            article={article}
                        />
                    ))}
                </div>
            </section>
    );
}