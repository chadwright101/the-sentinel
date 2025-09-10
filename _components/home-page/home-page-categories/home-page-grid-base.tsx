import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { PostProps } from "../../../_types/post-types";

export interface GridBaseProps {
  posts: PostProps[];
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

export const truncateText = (text: string, maxLength: number) => {
  const cleanText = text.replace(/<[^>]*>/g, "");
  return cleanText.length > maxLength
    ? cleanText.substring(0, maxLength) + "..."
    : cleanText;
};

export const GridImage = ({
  post,
  index,
  hoveredIndex,
  cssClasses,
}: {
  post: PostProps;
  index: number;
  hoveredIndex: number | null;
  cssClasses?: string;
}) => (
  <div className="overflow-hidden place-self-start">
    <Image
      src={post.jetpack_featured_media_url}
      alt={post.title.rendered}
      width={800}
      height={600}
      sizes="(max-width:600px) 100vw, (max-width:1100px) 50vw, 500px"
      className={classNames("object-cover", cssClasses, {
        "desktop:hover:scale-[102%] ease-in-out duration-300 delay-75":
          hoveredIndex === index,
      })}
    />
  </div>
);

export const GridTitle = ({
  post,
  index,
  hoveredIndex,
  cssClasses,
}: {
  post: PostProps;
  index: number;
  hoveredIndex: number | null;
  cssClasses?: string;
}) => (
  <h3
    className={classNames(
      "font-inter font-bold text-18px desktop:text-20px ease-in-out duration-300 delay-75",
      cssClasses,
      {
        "desktop:hover:opacity-90": hoveredIndex === index,
      }
    )}
  >
    {post.title.rendered}
  </h3>
);

export const GridExcerpt = ({
  post,
  maxLength,
  cssClasses,
}: {
  post: PostProps;
  maxLength: number;
  cssClasses?: string;
}) => (
  <p
    className={classNames(
      "text-12px font-normal font-newsreader tablet:text-16px text-black",
      cssClasses
    )}
  >
    {truncateText(post.excerpt.rendered, maxLength)}
  </p>
);

export const ReadMoreLink = ({
  post,
  categorySlug,
  parentCategorySlug,
  className,
}: {
  post: PostProps;
  categorySlug: string;
  parentCategorySlug?: string;
  className?: string;
}) => {
  const href = parentCategorySlug
    ? `/${parentCategorySlug}/${categorySlug}/${post.slug}`
    : `/${categorySlug}/${post.slug}`;

  return (
    <Link
      href={href}
      className={classNames(
        "text-blue p-2 -m-2 font-newsreader text-12px ease-in-out duration-300 desktop:p-0 desktop:m-0 desktop:hover:text-dark-brown",
        className
      )}
    >
      Read More
    </Link>
  );
};

export const AdSpace = ({ className }: { className?: string }) => (
  <p
    className={classNames(
      "w-[250px] flex justify-center items-center bg-beige h-full",
      className
    )}
  >
    Ad space
  </p>
);

interface AdSpaceProps {
  src: string;
  alt: string;
  url: string;
  cssClasses?: string;
}

/* ratio 1:1 */
export const AdSpaceSquare = ({ src, alt, url, cssClasses }: AdSpaceProps) => (
  <Link href={url} target="_blank" aria-label={alt} className={cssClasses}>
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
      className="object-cover aspect-square w-full border-4 border-[#FF5C00]"
    />
  </Link>
);

/* ratio 1:2 */
export const AdSpaceTall = ({ src, alt, url, cssClasses }: AdSpaceProps) => (
  <Link href={url} target="_blank" aria-label={alt} className={cssClasses}>
    <Image
      src={src}
      alt={alt}
      width={300}
      height={600}
      className="object-cover w-full aspect-[1/2] border-4 border-[#FF5C00]"
    />
  </Link>
);

/* ratio 4:1 */
export const AdSpaceBillboard = ({
  src,
  alt,
  url,
  cssClasses,
}: AdSpaceProps) => (
  <Link href={url} target="_blank" aria-label={alt} className={cssClasses}>
    <Image
      src={src}
      alt={alt}
      width={900}
      height={150}
      className="object-cover aspect-[4/1] w-full border-4 border-[#FF5C00]"
    />
  </Link>
);
