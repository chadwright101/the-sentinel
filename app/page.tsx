import HomePageCategoryLatestComponent from "@/_components/home-page/home-page-category-latest/home-page-category-latest-component";
import TopStoriesComponent from "@/_components/home-page/top-stories/top-stories-component";

export default async function HomePage() {
  return (
    <div className="px-5 max-w-[1100px] mx-auto desktop:px-10">
      <TopStoriesComponent />
      {/* latest news */}
      <HomePageCategoryLatestComponent />
      {/* categories */}
      <HomePageCategoryLatestComponent categorySlug="general-news" />
      <HomePageCategoryLatestComponent categorySlug="sport" />
      <HomePageCategoryLatestComponent categorySlug="entertainment" />
      <HomePageCategoryLatestComponent categorySlug="lifestyle" />
      <HomePageCategoryLatestComponent categorySlug="real-estate" />
    </div>
  );
}
