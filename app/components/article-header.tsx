import { ArticleTitle } from "./article-title";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import { type Author } from "@/interfaces/author";
import DateFormatter from "./date-formatter";

type Props = {
    title: string;
    image: string;
    date: string;
    author: Author;
};

export function ArticleHeader({ title, image, date, author }: Props) {
    return (
        <>
            <ArticleTitle>{title}</ArticleTitle>
            <div className="hidden md:block md:mb-12">
                <Avatar name={author.name} picture={author.image} />
            </div>
            <div className="mb-8 md:mb-16 sm:mx-0">
                <img title={title} src={image} />
            </div>
            <div className="max-w-2xl mx-auto">
                <div className="block md:hidden mb-6">
                    <Avatar name={author.name} picture={author.image} />
                </div>
                <div className="mb-6 text-lg">
                    <DateFormatter dateString={date} />
                </div>
            </div>
        </>
    );
}
