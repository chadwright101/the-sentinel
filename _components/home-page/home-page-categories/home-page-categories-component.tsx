"use client";

import { useState, useEffect } from "react";
import { fetchPosts } from "../../fetch-posts";
import { fetchAdData } from "../../fetch-ad-data";
import { PostProps } from "@/_types/post-types";
import { AdData } from "@/_types/ad-types";
import LoadingAnimation from "@/_lib/utils/loading-animation";
import Link from "next/link";
import HomePageNewsGrid from "./home-page-news-grid";
import AdSpaceSquare from "@/_components/ad-spaces/ad-space-square";
import classNames from "classnames";

interface HomePageCategoryLatestProps {
  categorySlug?: string;
  adData?: AdData | null;
}

const HomePageCategoryComponent = ({
  categorySlug,
  adData: adDataProp,
}: HomePageCategoryLatestProps) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [adData, setAdData] = useState<AdData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const fetchedPosts = await fetchPosts(categorySlug);
      const fetchedAdData =
        adDataProp !== undefined ? adDataProp : await fetchAdData();
      setPosts(fetchedPosts.slice(0, 3));
      setAdData(fetchedAdData);
      setLoading(false);
    };

    loadData();
  }, [categorySlug, adDataProp]);

  const formatCategoryTitle = (slug: string) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (!loading && posts.length < 3) {
    return null;
  }

  return (
    <main className="pt-5 space-y-5 desktop:pt-10">
      <h3 className="desktop:text-center">
        <Link
          href={categorySlug ? `/${categorySlug}` : "/latest-news"}
          aria-label={`View our latest ${categorySlug} articles`}
          className="font-inter p-2 -m-2 text-24px text-black font-bold desktop:text-36px desktop:hover:text-teal desktop:p-0 desktop:m-0"
        >
          {categorySlug === "time-out"
            ? "Entertainment"
            : categorySlug
            ? formatCategoryTitle(categorySlug)
            : "Latest News"}
        </Link>
      </h3>
      {loading ? (
        <div className="min-h-[150px] flex items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : (
        <>
          {!categorySlug && (
            <HomePageNewsGrid
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          )}
          {categorySlug === "sport" && (
            <HomePageNewsGrid
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          )}
          {categorySlug === "time-out" && (
            <HomePageNewsGrid
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              adData={adData}
              categorySlug={categorySlug}
            />
          )}
          {categorySlug === "community" && (
            <HomePageNewsGrid
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              adData={adData}
              categorySlug={categorySlug}
            />
          )}
          {categorySlug === "real-estate" && (
            <HomePageNewsGrid
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          )}
        </>
      )}
    </main>
  );
};

export default HomePageCategoryComponent;
