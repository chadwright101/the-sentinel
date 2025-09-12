"use client";

import { useState, useEffect } from "react";
import { fetchPosts } from "../../fetch-posts";
import { fetchAdData } from "../../fetch-ad-data";
import { PostProps } from "@/_types/post-types";
import { AdData } from "@/_types/ad-types";
import HomePageLatestNewsGrid from "./home-page-latest-news-grid";
import HomePageNewsGrid from "./home-page-news-grid";
import HomePageSportGrid from "./home-page-sport-grid";
import HomePageEntertainmentGrid from "./home-page-entertainment-grid";
import HomePageLifestyleGrid from "./home-page-lifestyle-grid";
import HomePageRealEstateGrid from "./home-page-real-estate-grid";
import LoadingAnimation from "@/_lib/utils/loading-animation";

interface HomePageCategoryLatestProps {
  categorySlug?: string;
}

const HomePageCategoryLatestComponent = ({
  categorySlug,
}: HomePageCategoryLatestProps) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [adData, setAdData] = useState<AdData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [fetchedPosts, fetchedAdData] = await Promise.all([
        fetchPosts(categorySlug),
        fetchAdData(),
      ]);
      setPosts(fetchedPosts.slice(0, 4));
      setAdData(fetchedAdData);
      setLoading(false);
    };

    loadData();
  }, [categorySlug]);

  const formatCategoryTitle = (slug: string) => {
    if (slug === "news") {
      return "News";
    }
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (!loading && posts.length < 4) {
    return null;
  }

  return (
    <main className="pt-5 space-y-5 desktop:pt-[50px]">
      <h3 className="text-24px font-bold desktop:text-36px">
        {categorySlug ? formatCategoryTitle(categorySlug) : "Latest News"}
      </h3>
      {loading ? (
        <div className="min-h-[150px] flex items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : (
        <>
          {!categorySlug && (
            <HomePageLatestNewsGrid
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              adData={adData}
            />
          )}
          {categorySlug === "news" && (
            <HomePageNewsGrid
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              adData={adData}
            />
          )}
          {categorySlug === "sport" && (
            <HomePageSportGrid
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              adData={adData}
            />
          )}
          {categorySlug === "entertainment" && (
            <HomePageEntertainmentGrid
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              adData={adData}
            />
          )}
          {categorySlug === "lifestyle" && (
            <HomePageLifestyleGrid
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              adData={adData}
            />
          )}
          {categorySlug === "real-estate" && (
            <HomePageRealEstateGrid
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              adData={adData}
            />
          )}
        </>
      )}
    </main>
  );
};

export default HomePageCategoryLatestComponent;
