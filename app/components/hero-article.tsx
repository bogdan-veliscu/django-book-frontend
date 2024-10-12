import Avatar from "@/components/avatar";
import CoverImage from "@/components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
    title: string;
    image: string;
    date: string;
    description: string;
    author: Author;
    slug: string;
};

export function HeroArticle({
    title,
    image,
    date,
    description,
    author,
    slug,
}: Props) {
    return (
        <section>
            <div className="mb-8 md:mb-16">
                {/* <CoverImage title={title} src={image} slug={slug} /> */}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                <div>
                    <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
                        <Link href={`/posts/${slug}`} className="hover:underline">
                            {title}
                        </Link>
                    </h3>
                    <div className="mb-4 md:mb-0 text-lg">
                        <DateFormatter dateString={date} />
                    </div>
                </div>
                <div>
                    <p className="text-lg leading-relaxed mb-4">{description}</p>
                    <Avatar name={author.name} picture={author.image} />
                </div>
            </div>
        </section>
    );
}
