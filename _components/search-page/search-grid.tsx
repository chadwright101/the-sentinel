"use client";

import { useState } from "react";
import Link from "next/link";
import PostGridDate from "@/_lib/utils/posts/post-grid-date";
import PostGridImage from "@/_lib/utils/posts/post-grid-image";
import PostGridTitle from "@/_lib/utils/posts/post-grid-title";
import PostGridExcerpt from "@/_lib/utils/posts/post-grid-excerpt";
import { getCategoryMapping, getAllCategorySlugs } from "@/_lib/utils/category-mapping";

interface Post {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  jetpack_featured_media_url: string;
  date: string;
  class_list: string[];
}

interface SearchGridProps {
  posts: Post[];
}

function extractCategorySlug(post: Post): string {
  const allSlugs = getAllCategorySlugs();

  for (const className of post.class_list) {
    const match = className.match(/^category-(.+)$/);
    if (match) {
      const slug = match[1];
      if (allSlugs.includes(slug)) {
        return slug;
      }
    }
  }

  return "latest-news";
}

export default function SearchGrid({ posts }: SearchGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-5 tablet:grid-cols-2 desktop:grid-cols-3">
      {posts.map((post, index) => {
        const categorySlug = extractCategorySlug(post);

        return (
          <div key={post.id}>
            <article>
              <Link
                href={`/${categorySlug}/${post.slug}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="grid gap-5 mb-2"
              >
                <PostGridImage
                  post={post as any}
                  index={index}
                  hoveredIndex={hoveredIndex}
                  cssClasses="aspect-video"
                />
                <div className="grid gap-5">
                  <PostGridDate date={post.date} />
                  <PostGridTitle
                    post={post as any}
                    index={index}
                    hoveredIndex={hoveredIndex}
                  />
                  <PostGridExcerpt
                    post={post as any}
                    maxLength={250}
                    cssClasses="text-12px font-normal"
                  />
                </div>
              </Link>
            </article>
            {index !== posts.length - 1 && (
              <hr className="text-black/25 mt-10 tablet:hidden" />
            )}
          </div>
        );
      })}
    </div>
  );
}
