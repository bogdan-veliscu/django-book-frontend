import Link from "next/link";
import Image from "next/image";

type Props = {
    title: string;
    src: string;
    slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
    const image = src ? (
        <Image
            src={src}
            alt={`Cover Image for ${title}`}
            className={`shadow-sm w-full ${slug ? "hover:shadow-lg transition-shadow duration-200" : ""}`}
            width={1300}
            height={630}
        />
    ) : null;
    return (
        <div className="sm:mx-0">
            {slug ? (
                <Link href={`/posts/${slug}`} aria-label={title}>
                    {image}
                </Link>
            ) : (
                image
            )}
        </div>
    );
};

export default CoverImage;
