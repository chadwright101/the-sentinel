"use client";

import { useState, useEffect } from "react";
import { fetchPosts } from "../../fetch-posts";
import { PostProps } from "../../../_types/post-types";
import HomePageLatestNewsGrid from "./home-page-latest-news-grid";
import HomePageNewsGrid from "./home-page-news-grid";
import HomePageSportGrid from "./home-page-sport-grid";
import HomePageEntertainmentGrid from "./home-page-entertainment-grid";
import HomePageLifestyleGrid from "./home-page-lifestyle-grid";
import HomePageRealEstateGrid from "./home-page-real-estate-grid";

interface HomePageCategoryLatestProps {
  categorySlug?: string;
}

const HomePageCategoryLatestComponent = ({
  categorySlug,
}: HomePageCategoryLatestProps) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const fetchedPosts = await fetchPosts(categorySlug);
      setPosts(fetchedPosts.slice(0, 4));
      setLoading(false);
    };

    loadPosts();
  }, [categorySlug]);

  const formatCategoryTitle = (slug: string) => {
    if (slug === "general-news") {
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
        <div>
          <h3>...loading</h3>
        </div>
      ) : (
        <>
          {!categorySlug && (
          <HomePageLatestNewsGrid
            posts={posts}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        )}
        {categorySlug === "general-news" && (
          <HomePageNewsGrid
            posts={posts}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        )}
        {categorySlug === "sport" && (
          <HomePageSportGrid
            posts={posts}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        )}
        {categorySlug === "entertainment" && (
          <HomePageEntertainmentGrid
            posts={posts}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        )}
        {categorySlug === "lifestyle" && (
          <HomePageLifestyleGrid
            posts={posts}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        )}
        {categorySlug === "real-estate" && (
          <HomePageRealEstateGrid
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

export default HomePageCategoryLatestComponent;
