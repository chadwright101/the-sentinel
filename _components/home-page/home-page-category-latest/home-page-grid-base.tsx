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
  className,
}: {
  post: PostProps;
  index: number;
  hoveredIndex: number | null;
  className?: string;
}) => (
  <div className="overflow-hidden">
    <Image
      src={post.jetpack_featured_media_url}
      alt={post.title.rendered}
      width={800}
      height={600}
      sizes="(max-width:600px) 100vw, (max-width:1100px) 50vw, 500px"
      className={classNames("object-cover", className, {
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
  className,
}: {
  post: PostProps;
  index: number;
  hoveredIndex: number | null;
  className?: string;
}) => (
  <h3
    className={classNames(
      "font-inter font-bold text-18px desktop:text-20px ease-in-out duration-300 delay-75",
      className,
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
  className,
}: {
  post: PostProps;
  maxLength: number;
  className?: string;
}) => (
  <p
    className={classNames(
      "text-12px font-normal font-newsreader tablet:text-16px text-black",
      className
    )}
  >
    {truncateText(post.excerpt.rendered, maxLength)}
  </p>
);

export const ReadMoreLink = ({
  post,
  className,
}: {
  post: PostProps;
  className?: string;
}) => (
  <Link
    href={`/posts/${post.slug}`}
    className={classNames(
      "text-blue p-2 -m-2 font-newsreader text-12px ease-in-out duration-300 desktop:p-0 desktop:m-0 desktop:hover:text-dark-brown",
      className
    )}
  >
    Read More
  </Link>
);

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
      width={800}
      height={800}
      className="object-cover h-full w-full border-4 border-[#FF5C00]"
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
      className="object-cover h-full w-full border-4 border-[#FF5C00]"
    />
  </Link>
);

/* ratio 4:1 */
export const AdSpaceWide = ({ src, alt, url, cssClasses }: AdSpaceProps) => (
  <Link href={url} target="_blank" aria-label={alt} className={cssClasses}>
    <Image
      src={src}
      alt={alt}
      width={900}
      height={225}
      className="object-cover h-full w-full border-4 border-[#FF5C00]"
    />
  </Link>
);
