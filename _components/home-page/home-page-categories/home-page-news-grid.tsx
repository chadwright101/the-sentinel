import Link from "next/link";
import classNames from "classnames";
import {
  GridBaseProps,
  GridImage,
  GridTitle,
  GridExcerpt,
  ReadMoreLink,
  AdSpaceTall,
  AdSpaceSquare,
} from "./home-page-grid-base";

const HomePageNewsGrid = ({
  posts,
  hoveredIndex,
  setHoveredIndex,
}: GridBaseProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:gap-[50px] desktop:grid-cols-3">
      {posts.map((post, index) => {
        const isFirstPost = index === 0;

        return (
          <article
            key={post.id}
            className={classNames("desktop:grid", {
              "desktop:row-span-2 desktop:gap-[50px]": isFirstPost,
              "desktop:order-last": !isFirstPost,
              "grid-cols-2 desktop:col-span-2": isFirstPost,
            })}
          >
            <Link
              href={`/news/${post.slug}`}
              className={classNames("grid gap-4 mb-2", {
                "grid-cols-[1fr_1.75fr] tablet:grid-cols-1": !isFirstPost,
                "desktop:h-full": isFirstPost,
              })}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <GridImage
                post={post}
                index={index}
                hoveredIndex={hoveredIndex}
                cssClasses={classNames({
                  "aspect-[5/3]": isFirstPost,
                  "aspect-[1.2/1] tablet:aspect-[5/3]": !isFirstPost,
                  "desktop:h-full desktop:min-h-[600px]": isFirstPost,
                })}
              />
              <GridTitle
                post={post}
                index={index}
                hoveredIndex={hoveredIndex}
                cssClasses={classNames({
                  "place-self-center justify-self-start": !isFirstPost,
                  "desktop:hidden": isFirstPost,
                })}
              />
              <GridExcerpt
                post={post}
                maxLength={150}
                cssClasses={classNames({
                  hidden: !isFirstPost,
                  "block tablet:hidden": isFirstPost,
                })}
              />
            </Link>
            <div className="flex flex-col gap-4">
              <GridTitle
                post={post}
                index={index}
                hoveredIndex={hoveredIndex}
                cssClasses={classNames("hidden", {
                  "desktop:block": isFirstPost,
                })}
              />
              <GridExcerpt
                post={post}
                maxLength={500}
                cssClasses={classNames("hidden", {
                  "desktop:block": isFirstPost,
                })}
              />
              <ReadMoreLink
                post={post}
                categorySlug="news"
                className={classNames({
                  hidden: !isFirstPost,
                  "inline-block tablet:hidden desktop:block": isFirstPost,
                })}
              />
            </div>
          </article>
        );
      })}
      <AdSpaceTall
        src="/images/placeholders/ads/tall-ad.png"
        alt="#"
        url="#"
        cssClasses="hidden desktop:block row-span-2 place-self-center"
      />
      <AdSpaceSquare
        src="/images/placeholders/ads/square-ad.png"
        alt="#"
        url="#"
        cssClasses="my-5 w-full max-w-[500px] justify-self-center tablet:col-span-2 desktop:hidden"
      />
    </div>
  );
};

export default HomePageNewsGrid;
