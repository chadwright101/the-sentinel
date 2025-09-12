import Link from "next/link";
import classNames from "classnames";
import PostGridProps from "@/_types/post-grid-props";
import PostGridImage from "@/_lib/utils/posts/post-grid-image";
import PostGridTitle from "@/_lib/utils/posts/post-grid-title";
import PostGridExcerpt from "@/_lib/utils/posts/post-grid-excerpt";

const RelatedPostsComponent = ({
  posts,
  hoveredIndex,
  setHoveredIndex,
}: PostGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 items-start tablet:grid-cols-2 desktop:gap-[50px] desktop:grid-cols-3">
      {posts.map((post, index) => {
        return (
          <article
            key={post.id}
            className={classNames("desktop:grid", {
              "desktop:col-start-2 desktop:row-start-1": index === 1,
            })}
          >
            <Link
              href={`/news/latest-news/${post.slug}`}
              className="grid gap-4 mb-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <PostGridImage
                post={post}
                index={index}
                hoveredIndex={hoveredIndex}
              />
              <PostGridTitle
                post={post}
                index={index}
                hoveredIndex={hoveredIndex}
              />
              <PostGridExcerpt post={post} maxLength={150} />
            </Link>
          </article>
        );
      })}
    </div>
  );
};

export default RelatedPostsComponent;
