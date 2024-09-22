import Avatar from './avatar';
import DateFormatter from './date-formatter';
import CoverImage from './cover-image';
import { ArticleTitle } from "@/app/components/article-title";
import { Author } from '@/interfaces/author';

type Props = {
    title: string;
    coverImage: string;
    date: string;
    description: string;
    author: Author;
};

export function ArticleHeader({ title, coverImage, date, author }: Props) {
    return (
        <>
            <ArticleTitle title={title} />
            <div className="hidden md:block md:mb-12">
                <CoverImage title={title} coverImage={coverImage} />
            </div>
            <div className="max-w-2xl mx-auto">
                <div className="block md:hidden mb-6">
                    <Avatar name={author.name} image={author.image} />
                </div>
                <div className="mb-6 text-lg">
                    <DateFormatter dateString={date} />
                </div>
            </div>

        </>
    );
}