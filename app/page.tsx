import HomePageCategoryComponent from "@/_components/home-page/home-page-categories/home-page-categories-component";
import TopStoriesComponent from "@/_components/home-page/top-stories/top-stories-component";
import NewsletterSubscriptionComponent from "@/_lib/utils/newsletter-subscription-component";

export default async function HomePage() {
  return (
    <div className="px-5 max-w-[1100px] mx-auto desktop:px-10">
      <TopStoriesComponent />
      {/* latest news */}
      <HomePageCategoryComponent />
      {/* categories */}
      <HomePageCategoryComponent categorySlug="news" />
      <HomePageCategoryComponent categorySlug="sport" />
      <NewsletterSubscriptionComponent cssClasses="desktop:hidden" />
      <HomePageCategoryComponent categorySlug="entertainment" />
      <NewsletterSubscriptionComponent cssClasses="hidden desktop:grid" />
      <HomePageCategoryComponent categorySlug="lifestyle" />
      <HomePageCategoryComponent categorySlug="real-estate" />
    </div>
  );
}
