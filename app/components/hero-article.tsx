import Avatar from './avatar'
import CoverImage from './cover-image'
import { type Author } from '@/interfaces/author'
import Link from 'next/link'
import DateFormatter from './date-formatter'
import { Article } from '@/interfaces/article'

type Props = {
    article: Article
};

export function HeroArticle({ article }: Props) {

    return (
        <section>
            <div className="mb-8 md:mb-16">
                <CoverImage title={article.title} coverImage={article.image || ''} slug={article.slug} />
            </div>
            <div className="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
                <div>
                    <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
                        <Link as={`/articles/${article.slug}`} href="/articles/[slug]" legacyBehavior>
                            <a className="hover:underline">{article.title}</a>
                        </Link>
                    </h3>
                    <div className="mb-4 md:mb-0 text-lg">
                        <DateFormatter dateString={article.updatedAt} />
                    </div>
                </div>
                <p className="text-lg leading-relaxed mb-4">{article.description}</p>
                <Avatar name={article.author?.name} image={article.author?.image} />
            </div>
        </section>
    );
}

export default HeroArticle;