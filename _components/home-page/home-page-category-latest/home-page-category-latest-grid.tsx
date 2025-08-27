import Link from "next/link";
import Image from "next/image";

import classNames from "classnames";

import { PostProps } from "../../../_types/post-types";

interface HomePageCategoryLatestGridProps {
  posts: PostProps[];
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const HomePageCategoryLatestGrid = ({
  posts,
  hoveredIndex,
  setHoveredIndex,
}: HomePageCategoryLatestGridProps) => {
  const truncateText = (text: string, maxLength: number = 150) => {
    const cleanText = text.replace(/<[^>]*>/g, "");
    return cleanText.length > maxLength
      ? cleanText.substring(0, maxLength) + "..."
      : cleanText;
  };

  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 gap-5">
      {posts.map((post, index) => {
        const isFirstPost = index === 0;

        return (
          <article key={post.id}>
            <Link
              href={`/posts/${post.slug}`}
              className={classNames("grid gap-4 mb-2", {
                "grid-cols-[1fr_1.75fr] tablet:grid-cols-1": !isFirstPost,
              })}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="overflow-hidden">
                <Image
                  src={post.jetpack_featured_media_url}
                  alt={post.title.rendered}
                  width={600}
                  height={400}
                  sizes="(max-width:600px) 100vw, (max-width:1100px) 50vw, 350px"
                  className={classNames("object-cover", {
                    "aspect-[5/3]": isFirstPost,
                    "aspect-[1.2/1] tablet:aspect-[5/3]": !isFirstPost,
                    "desktop:hover:scale-[102%] ease-in-out duration-300 delay-75":
                      hoveredIndex === index,
                  })}
                />
              </div>
              <h3
                className={classNames(
                  "font-inter font-bold text-18px desktop:text-20px ease-in-out duration-300 delay-75",
                  {
                    "place-self-center justify-self-start": !isFirstPost,
                    "desktop:hover:opacity-90": hoveredIndex === index,
                  }
                )}
              >
                {post.title.rendered}
              </h3>
              <p
                className={classNames(
                  "text-12px font-normal font-newsreader tablet:text-16px text-black",
                  {
                    hidden: !isFirstPost,
                    "block tablet:hidden": isFirstPost,
                  }
                )}
              >
                {truncateText(post.excerpt.rendered)}
              </p>
            </Link>
            <Link
              href={`/posts/${post.slug}`}
              className={classNames(
                "text-blue p-2 -m-2 font-newsreader text-12px ease-in-out duration-300 desktop:p-0 desktop:m-0 desktop:hover:text-dark-brown",
                {
                  hidden: !isFirstPost,
                  "inline-block tablet:hidden": isFirstPost,
                }
              )}
            >
              Read More
            </Link>
          </article>
        );
      })}
    </div>
  );
};

export default HomePageCategoryLatestGrid;
