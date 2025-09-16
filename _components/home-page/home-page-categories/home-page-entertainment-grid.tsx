import Link from "next/link";
import classNames from "classnames";
import PostGridProps from "@/_types/post-grid-props";
import PostGridImage from "@/_lib/utils/posts/post-grid-image";
import PostGridTitle from "@/_lib/utils/posts/post-grid-title";
import PostGridExcerpt from "@/_lib/utils/posts/post-grid-excerpt";
import ReadMoreLink from "../../ui/buttons/read-more-link";
import AdSpaceSquare from "@/_components/ad-spaces/ad-space-square";

const HomePageEntertainmentGrid = ({
  posts,
  hoveredIndex,
  setHoveredIndex,
  adData,
}: PostGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:gap-10 desktop:grid-cols-3">
      {posts.map((post, index) => {
        const isFirstPost = index === 0;

        return (
          <article
            key={post.id}
            className={classNames("desktop:grid", {
              "desktop:row-span-2 desktop:gap-10": isFirstPost,
              "desktop:order-last": !isFirstPost,
              "grid-cols-3 desktop:col-span-3": isFirstPost,
            })}
          >
            <Link
              href={`/entertainment/${post.slug}`}
              className={classNames("grid gap-5 mb-2", {
                "grid-cols-[1fr_1.75fr] tablet:grid-cols-1": !isFirstPost,
                "desktop:h-full": isFirstPost,
                "col-span-2": isFirstPost,
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
                  "desktop:h-full desktop:min-h-[600px]": isFirstPost,
                })}
              />
              <PostGridTitle
                post={post}
                index={index}
                hoveredIndex={hoveredIndex}
                cssClasses={classNames({
                  "place-self-center justify-self-start": !isFirstPost,
                  "desktop:hidden": isFirstPost,
                })}
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
            <div className="flex flex-col gap-5">
              <PostGridTitle
                post={post}
                index={index}
                hoveredIndex={hoveredIndex}
                cssClasses={classNames("hidden", {
                  "desktop:block": isFirstPost,
                })}
              />
              <PostGridExcerpt
                post={post}
                maxLength={500}
                cssClasses={classNames("hidden", {
                  "desktop:block": isFirstPost,
                })}
              />
              <ReadMoreLink
                post={post}
                categorySlug="entertainment"
                className={classNames({
                  hidden: !isFirstPost,
                  "inline-block tablet:hidden desktop:block": isFirstPost,
                })}
              />
            </div>
          </article>
        );
      })}

      {/* Square Primary */}
      <AdSpaceSquare
        src={
          adData?.image_square_primary ||
          "/images/placeholders/ads/square-ad.png"
        }
        alt={adData?.company_name_square_primary || "Advertisement"}
        url={adData?.link_square_primary || "#"}
        cssClasses="my-5 w-full place-self-center max-w-[500px] tablet:col-span-2 desktop:hidden"
      />
    </div>
  );
};

export default HomePageEntertainmentGrid;
