import Link from "next/link";
import classNames from "classnames";
import {
  GridBaseProps,
  GridImage,
  GridTitle,
  GridExcerpt,
  AdSpaceSquare,
  AdSpaceBillboard,
} from "./home-page-grid-base";

const HomePageLatestNewsGrid = ({
  posts,
  hoveredIndex,
  setHoveredIndex,
}: GridBaseProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 items-start tablet:grid-cols-2 desktop:gap-[50px] desktop:grid-cols-3">
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
              href={`/news/latest-news/${post.slug}`}
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
                })}
              />
              <GridTitle
                post={post}
                index={index}
                hoveredIndex={hoveredIndex}
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
          </article>
        );
      })}
      <AdSpaceSquare
        src="/images/placeholders/ads/square-ad.png"
        alt="#"
        url="#"
        cssClasses="hidden desktop:block col-start-3 row-start-1"
      />
      <AdSpaceSquare
        src="/images/placeholders/ads/square-ad.png"
        alt="#"
        url="#"
        cssClasses="hidden desktop:block"
      />
      <AdSpaceBillboard
        src="/images/placeholders/ads/wide-ad.png"
        alt="#"
        url="#"
        cssClasses="my-5 place-self-center tablet:col-span-2 desktop:col-span-3"
      />
    </div>
  );
};

export default HomePageLatestNewsGrid;
