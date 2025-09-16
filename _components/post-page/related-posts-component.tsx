"use client";

import Link from "next/link";
import classNames from "classnames";
import PostGridProps from "@/_types/post-grid-props";
import PostGridImage from "@/_lib/utils/posts/post-grid-image";
import PostGridTitle from "@/_lib/utils/posts/post-grid-title";
import PostGridExcerpt from "@/_lib/utils/posts/post-grid-excerpt";
import { useState } from "react";
import { PostProps } from "@/_types/post-types";

interface RelatedPostProps {
  posts: PostProps[];
  categorySlug: string;
  cssClasses?: string;
  currentPostSlug: string;
}

const RelatedPostsComponent = ({
  posts,
  categorySlug,
  cssClasses,
  currentPostSlug,
}: RelatedPostProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div
      className={classNames(
        "grid grid-cols-1 gap-5 items-start tablet:grid-cols-3 desktop:gap-x-10",
        cssClasses
      )}
    >
      <h3 className="text-24px font-bold font-newsreader mb-2 tablet:col-span-3 desktop:text-36px">
        Related News
      </h3>
      {posts
        .filter((post) => post.slug !== currentPostSlug)
        .slice(0, 3)
        .map((post, index) => {
          return (
            <article key={post.id}>
              <Link
                href={`/${categorySlug}/${post.slug}`}
                className="grid grid-cols-[1fr_2fr] gap-5 mb-2 tablet:grid-cols-1"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <PostGridImage
                  post={post}
                  index={index}
                  hoveredIndex={hoveredIndex}
                  cssClasses="aspect-square tablet:aspect-video"
                />
                <div className="space-y-5">
                  <PostGridTitle
                    post={post}
                    index={index}
                    hoveredIndex={hoveredIndex}
                  />
                  <PostGridExcerpt post={post} maxLength={150} />
                </div>
              </Link>
            </article>
          );
        })}
    </div>
  );
};

export default RelatedPostsComponent;
