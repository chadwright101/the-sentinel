"use client";

import { useState } from "react";
import Link from "next/link";
import PostGridDate from "@/_lib/utils/posts/post-grid-date";
import PostGridImage from "@/_lib/utils/posts/post-grid-image";
import PostGridTitle from "@/_lib/utils/posts/post-grid-title";
import PostGridExcerpt from "@/_lib/utils/posts/post-grid-excerpt";

interface Post {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  jetpack_featured_media_url: string;
  date: string;
}

interface CategoryGridProps {
  posts: Post[];
  categorySlug: string;
}

export default function CategoryGrid({
  posts,
  categorySlug,
}: CategoryGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-5 tablet:grid-cols-2 desktop:grid-cols-3">
      {posts.map((post, index) => (
        <div key={post.id}>
          <article>
            <Link
              href={`/${categorySlug}/${post.slug}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="grid gap-4 mb-2"
            >
              <PostGridImage
                post={post as any}
                index={index}
                hoveredIndex={hoveredIndex}
                cssClasses="aspect-video"
              />
              <div className="grid gap-4">
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
      ))}
    </div>
  );
}
