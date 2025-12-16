import { fetchPosts } from "@/_components/fetch-posts";
import { AdData } from "@/_types/ad-types";
import HomePageCategoryClient from "./home-page-categories-client";

interface Props {
  categorySlug?: string;
  adData?: AdData | null;
}

export default async function HomePageCategoryServer({
  categorySlug,
  adData,
}: Props) {
  const posts = await fetchPosts(categorySlug);

  if (posts.length < 3) return null;

  return (
    <HomePageCategoryClient
      categorySlug={categorySlug}
      posts={posts.slice(0, 3)}
      adData={adData}
    />
  );
}
