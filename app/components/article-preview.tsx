import { type Author } from "@/interfaces/author";

import Link from 'next/link'
import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import { Article } from "@/interfaces/article";

type Props = {
    article: Article
};

export function ArticlePreview({
    article
}: Props) {


    return (
        <div>
            <div className="mb-5">
                {article?.image && <CoverImage title={article.title} coverImage={article.image} slug={article.slug} />}
            </div>
            <h3 className="text-3xl mb-3 leading-snug">
                <Link as={`/articles/${article.slug}`} href="/articles/[slug]" legacyBehavior>
                    <a className="hover:underline">
                        {article.title}
                    </a>
                </Link>
            </h3>
            <div className="text-lg mb-4">
                <DateFormatter dateString={article.updatedAt} />
            </div>
            <p className="text-lg leading-relaxed mb-4">{article.description}</p>
            <Avatar name={article.author.name} image={article.author.image} />
        </div>
    );
}