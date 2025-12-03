"use client";

import Link from "next/link";
import Image from "next/image";
import { PostProps } from "@/_types/post-types";
import { getCategoryMapping } from "@/_lib/utils/category-mapping";
import PostGridImage from "@/_lib/utils/posts/post-grid-image";
import PostGridTitle from "@/_lib/utils/posts/post-grid-title";
import { useState } from "react";
import PostGridExcerpt from "@/_lib/utils/posts/post-grid-excerpt";

interface LatestArticlesProps {
  categorySlug: string;
  posts: PostProps[];
}

const LatestArticles = ({ categorySlug, posts }: LatestArticlesProps) => {
  const categoryInfo = getCategoryMapping(categorySlug);
  const latestPosts = posts.slice(0, 2);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!categoryInfo || latestPosts.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5">
      <h4>
        <Link
          href={`/${categorySlug}`}
          className="text-24px p-2 -m-2 text-black font-bold font-newsreader desktop:hover:text-teal transition-colors duration-300 desktop:text-36px desktop:p-0 desktop:m-0"
        >
          {categoryInfo.title}
        </Link>
      </h4>
      <div className="flex flex-col tablet:flex-row desktop:flex-col gap-10">
        {latestPosts.map((post, index) => (
          <article key={index} className="grid gap-2">
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
              <div className="flex flex-col gap-5">
                <PostGridTitle
                  post={post}
                  index={index}
                  hoveredIndex={hoveredIndex}
                  cssClasses="desktop:min-h-12"
                />
                <PostGridExcerpt
                  post={post}
                  maxLength={150}
                  cssClasses="tablet:hidden"
                />
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default LatestArticles;
