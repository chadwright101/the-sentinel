import { Metadata } from "next";
import AdSpaceBillboard from "@/_components/ad-spaces/ad-space-billboard";
import HomePageCategoryComponent from "@/_components/home-page/home-page-categories/home-page-categories-component";
import TopStoriesComponent from "@/_components/home-page/top-stories/top-stories-component";
import NewsletterSubscriptionComponent from "@/_lib/utils/newsletter-subscription-component";
import PageWrapper from "@/_lib/utils/page-wrapper";
import { fetchAdData } from "@/_components/fetch-ad-data";

export const metadata: Metadata = {
  title: "The Sentinel - Local News",
  description:
    "Read the latest local news from The Sentinel. We provide independent coverage of news and events across Clarence Town NSW and surrounding areas.",
};

export default async function HomePage() {
  const adData = await fetchAdData();

  return (
    <PageWrapper>
      <TopStoriesComponent />
      {/* latest news */}
      <HomePageCategoryComponent />
      {/* categories */}
      <HomePageCategoryComponent categorySlug="news" />
      <div className="my-10">
        <AdSpaceBillboard
          src={
            adData?.image_billboard || "/images/placeholders/ads/wide-ad.png"
          }
          alt={adData?.company_name_billboard || "Advertisement"}
          url={adData?.link_billboard || "#"}
        />
      </div>
      <HomePageCategoryComponent categorySlug="sport" />
      <HomePageCategoryComponent categorySlug="entertainment" />
      <NewsletterSubscriptionComponent />
      <HomePageCategoryComponent categorySlug="community" />
      <HomePageCategoryComponent categorySlug="real-estate" />
    </PageWrapper>
  );
}
