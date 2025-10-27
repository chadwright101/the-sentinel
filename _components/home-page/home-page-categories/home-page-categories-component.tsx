"use client";

import { useState, useEffect } from "react";
import { fetchPosts } from "../../fetch-posts";
import { fetchAdData } from "../../fetch-ad-data";
import { PostProps } from "@/_types/post-types";
import { AdData } from "@/_types/ad-types";
import HomePageLatestNewsGrid from "./with-ads/home-page-latest-news-grid";
import HomePageGeneralNewsGrid from "./with-ads/home-page-general-news-grid";
import HomePageSportGrid from "./with-ads/home-page-sport-grid";
import HomePageEntertainmentGrid from "./with-ads/home-page-entertainment-grid";
import HomePageLifestyleGrid from "./with-ads/home-page-lifestyle-grid";
import HomePageRealEstateGrid from "./with-ads/home-page-real-estate-grid";
import LoadingAnimation from "@/_lib/utils/loading-animation";
import Link from "next/link";
import HomePageNewsGridNoAds from "./home-page-news-grid-no-ads";

interface HomePageCategoryLatestProps {
  categorySlug?: string;
}

const HomePageCategoryComponent = ({
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
      setPosts(fetchedPosts.slice(0, 3));
      setAdData(fetchedAdData);
      setLoading(false);
    };

    loadData();
  }, [categorySlug]);

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
          {categorySlug ? formatCategoryTitle(categorySlug) : "Latest News"}
        </Link>
      </h3>
      {loading ? (
        <div className="min-h-[150px] flex items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : (
        <>
          {!categorySlug && (
            <HomePageNewsGridNoAds
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              adData={adData}
            />
          )}
          {categorySlug === "news" && (
            <HomePageNewsGridNoAds
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              adData={adData}
            />
          )}
          {categorySlug === "sport" && (
            <HomePageNewsGridNoAds
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              adData={adData}
            />
          )}
          {categorySlug === "entertainment" && (
            <HomePageNewsGridNoAds
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              adData={adData}
            />
          )}
          {categorySlug === "lifestyle" && (
            <HomePageNewsGridNoAds
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              adData={adData}
            />
          )}
          {categorySlug === "real-estate" && (
            <HomePageNewsGridNoAds
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              adData={adData}
            />
          )}
          {/* {!categorySlug && (
            <HomePageLatestNewsGrid
              posts={posts}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              adData={adData}
            />
          )}
          {categorySlug === "news" && (
            <HomePageGeneralNewsGrid
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
          )} */}
        </>
      )}
    </main>
  );
};

export default HomePageCategoryComponent;
