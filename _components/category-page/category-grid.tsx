"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { truncateText } from "../home-page/home-page-category-latest/home-page-grid-base";

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
    <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 tablet:gap-y-10 desktop:grid-cols-3">
      {posts.map((post, index) => (
        <>
          <article key={post.id}>
            <Link
              href={`/${categorySlug}/${post.slug}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="grid gap-4 mb-2"
            >
              <div className="overflow-hidden aspect-video">
                <Image
                  src={post.jetpack_featured_media_url}
                  alt={post.title.rendered}
                  width={800}
                  height={600}
                  sizes="(max-width:600px) 100vw, (max-width:1100px) 50vw, 500px"
                  className={classNames("object-cover h-full w-full", {
                    "desktop:hover:scale-[102%] ease-in-out duration-300 delay-75":
                      hoveredIndex === index,
                  })}
                />
              </div>
              <div className="grid gap-4">
                <time className="text-12px font-inter">
                  {new Date(post.date).toLocaleDateString("en-AU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2
                  className={classNames(
                    "font-inter font-bold text-18px desktop:text-20px ease-in-out duration-300 delay-75",
                    {
                      "desktop:hover:opacity-90": hoveredIndex === index,
                    }
                  )}
                >
                  {post.title.rendered}
                </h2>
                <div
                  className="text-12px font-normal"
                  dangerouslySetInnerHTML={{
                    __html: truncateText(post.excerpt.rendered, 250),
                  }}
                />
              </div>
            </Link>
          </article>
          {index !== posts.length - 1 && (
            <hr className="text-black/25 my-5 tablet:hidden" />
          )}
        </>
      ))}
    </div>
  );
}
