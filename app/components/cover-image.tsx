import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
    title: string;
    coverImage: string;
    slug?: string;
};

const CoverImage = ({ title, coverImage, slug }: Props) => {
    const image = (
        coverImage &&
        <Image
            src={coverImage}
            alt={`Cover Image for ${title}`}
            className={cn("shadow-small", {
                "hover:shadow-medium transition-shadow duration-200": slug,
            })}

            width={1240}
            height={540}
        />
    );
    return (
        <div className="sm:mx-0">
            {slug ? (
                <Link as={`/articles/${slug}`} href="/articles/[slug]" legacyBehavior>
                    <a aria-label={title}>{image}</a>
                </Link>
            ) : (
                image
            )}
        </div>
    );
}

export default CoverImage;