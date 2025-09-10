import Link from "next/link";
import classNames from "classnames";
import {
  GridBaseProps,
  GridImage,
  GridTitle,
  GridExcerpt,
  ReadMoreLink,
  AdSpaceSquare,
  AdSpaceBillboard,
} from "./home-page-grid-base";

const HomePageSportGrid = ({
  posts,
  hoveredIndex,
  setHoveredIndex,
  adData,
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
              "grid-cols-2 desktop:col-span-2": isFirstPost,
            })}
          >
            <Link
              href={`/sport/${post.slug}`}
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
                categorySlug="sport"
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
        src={adData?.image_square_primary || "/images/placeholders/ads/square-ad.png"}
        alt={adData?.company_name_square_primary || "Advertisement"}
        url={adData?.link_square_primary || "#"}
        cssClasses="hidden desktop:block row-start-1 col-start-3"
      />
      {/* Square Secondary */}
      <AdSpaceSquare
        src={adData?.image_square_secondary || "/images/placeholders/ads/square-ad.png"}
        alt={adData?.company_name_square_secondary || "Advertisement"}
        url={adData?.link_square_secondary || "#"}
        cssClasses="hidden desktop:block row-start-2 col-start-3"
      />
      <AdSpaceBillboard
        src={adData?.image_billboard || "/images/placeholders/ads/wide-ad.png"}
        alt={adData?.company_name_billboard || "Advertisement"}
        url={adData?.link_billboard || "#"}
        cssClasses="hidden my-5 place-self-center tablet:col-span-2 desktop:block desktop:col-span-3"
      />
    </div>
  );
};

export default HomePageSportGrid;
