import Link from "next/link";
import classNames from "classnames";
import PostGridProps from "@/_types/post-grid-props";
import PostGridImage from "@/_lib/utils/posts/post-grid-image";
import PostGridTitle from "@/_lib/utils/posts/post-grid-title";
import PostGridExcerpt from "@/_lib/utils/posts/post-grid-excerpt";
import AdSpaceSquare from "@/_components/ad-spaces/ad-space-square";

const HomePageNewsGrid = ({
  posts,
  hoveredIndex,
  categorySlug,
  setHoveredIndex,
  adData,
}: PostGridProps) => {
  return (
    <div
      className={classNames(
        "grid grid-cols-1 gap-5 items-start tablet:grid-cols-2 desktop:gap-10 desktop:grid-cols-3",
        {
          "desktop:grid-cols-4":
            categorySlug === "time-out" || categorySlug === "community",
        }
      )}
    >
      {posts.map((post, index) => {
        const isFirstPost = index === 0;

        return (
          <article
            key={post.id}
            className={classNames("desktop:grid", {
              "desktop:col-start-2 desktop:row-start-1": index === 1,
            })}
          >
            <Link
              href={`/latest-news/${post.slug}`}
              className={classNames("grid gap-5 mb-2", {
                "grid-cols-[1fr_1.75fr] tablet:grid-cols-1": !isFirstPost,
                "desktop:h-full": isFirstPost,
              })}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <PostGridImage
                post={post}
                index={index}
                hoveredIndex={hoveredIndex}
                cssClasses={classNames({
                  "aspect-[5/3]": isFirstPost,
                  "aspect-[1.2/1] tablet:aspect-[5/3]": !isFirstPost,
                })}
              />
              <PostGridTitle
                post={post}
                index={index}
                hoveredIndex={hoveredIndex}
              />
              <PostGridExcerpt
                post={post}
                maxLength={150}
                cssClasses={classNames({
                  hidden: !isFirstPost,
                  "block tablet:hidden": isFirstPost,
                })}
              />
            </Link>
          </article>
        );
      })}
      {(categorySlug === "time-out" || categorySlug === "community") && (
        <AdSpaceSquare
          src={
            categorySlug === "time-out"
              ? adData?.image_home_page_entertainment || ""
              : categorySlug === "community"
              ? adData?.image_home_page_community || ""
              : ""
          }
          alt={
            categorySlug === "time-out"
              ? adData?.company_name_home_page_entertainment || "Advertisement"
              : categorySlug === "community"
              ? adData?.company_name_home_page_community || "Advertisement"
              : "Advertisement"
          }
          url={
            categorySlug === "time-out"
              ? adData?.link_home_page_entertainment || "#"
              : categorySlug === "community"
              ? adData?.link_home_page_community || "#"
              : "#"
          }
        />
      )}
    </div>
  );
};

export default HomePageNewsGrid;
