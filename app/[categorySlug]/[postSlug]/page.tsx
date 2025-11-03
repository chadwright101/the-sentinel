import { notFound } from "next/navigation";
import { fetchSinglePost } from "@/_components/fetch-single-post";
import { getCategoryMapping } from "@/_lib/utils/category-mapping";
import Image from "next/image";
import PostContentWithAd from "@/_components/post-page/post-content-with-ad";
import BreadcrumbComponent from "@/_lib/utils/breadcrumb-component";
import { fetchAdData } from "@/_components/fetch-ad-data";
import { fetchPosts } from "@/_components/fetch-posts";
import RelatedPostsComponent from "@/_components/post-page/related-posts-component";
import NewsletterSubscriptionComponent from "@/_lib/utils/newsletter-subscription-component";
import LatestArticles from "@/_components/post-page/latest-articles";
import PageWrapper from "@/_lib/utils/page-wrapper";

interface PostPageProps {
  params: Promise<{
    categorySlug: string;
    postSlug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { categorySlug, postSlug } = await params;

  const categoryInfo = getCategoryMapping(categorySlug);
  if (!categoryInfo) {
    notFound();
  }

  const [post, adData, posts, sportPosts, timeOutPosts, communityPosts] =
    await Promise.all([
      fetchSinglePost(postSlug),
      fetchAdData(),
      fetchPosts(categorySlug),
      fetchPosts("sport", { perPage: 2 }),
      fetchPosts("time-out", { perPage: 2 }),
      fetchPosts("community", { perPage: 2 }),
    ]);

  if (!post) {
    notFound();
  }

  return (
    <PageWrapper cssClasses="my-10">
      <main>
        <article className="grid gap-5">
          <BreadcrumbComponent
            items={[
              { label: "Home", href: "/" },
              { label: categoryInfo.title, href: `/${categorySlug}` },
              { label: post.title.rendered.replace(/<[^>]*>/g, "") },
            ]}
          />
          <div>
            <h2
              className="text-36px font-inter font-bold"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            {post._embedded?.author && post._embedded.author[0] && (
              <p className="text-14px font-inter">
                Written by {post._embedded.author[0].name}
              </p>
            )}

            <time dateTime={post.date} className="text-12px italic font-inter">
              {new Date(post.date).toLocaleDateString("en-AU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          {/*  <div className="desktop:grid grid-cols-[1fr_250px] gap-7"> */}
          <div>
            <div className="grid gap-5">
              <div className="w-full">
                <Image
                  src={post.jetpack_featured_media_url}
                  alt={post.title.rendered}
                  className="w-full h-full object-cover aspect-[4/3] tablet:aspect-video"
                  width={1100}
                  height={500}
                  sizes="(max-width: 1100px) 100vw, 1100px"
                />
              </div>
              <PostContentWithAd
                content={post.content.rendered}
                adData={adData}
              />
            </div>
            {/* <div className="hidden desktop:flex flex-col gap-10">
              <AdSpaceTower
                src={
                  adData?.image_tower || "/images/placeholders/ads/tall-ad.png"
                }
                alt={adData?.company_name_tower || "Advertisement"}
                url={adData?.link_tower || "#"}
            />
            <div className="sticky top-[180px] flex flex-col gap-10">
                <AdSpaceSquare
                  src={
                    adData?.image_square_primary ||
                    "/images/placeholders/ads/square-ad.png"
                  }
                  alt={adData?.company_name_square_primary || "Advertisement"}
                  url={adData?.link_square_primary || "#"}
                />
                <AdSpaceSquare
                  src={
                    adData?.image_square_secondary ||
                    "/images/placeholders/ads/square-ad.png"
                  }
                  alt={adData?.company_name_square_secondary || "Advertisement"}
                  url={adData?.link_square_secondary || "#"}
                />
              </div>
            </div> */}
          </div>
          <RelatedPostsComponent
            posts={posts}
            currentPostSlug={postSlug}
            categorySlug={categorySlug}
            cssClasses="mt-5 desktop:mt-10"
          />
          <NewsletterSubscriptionComponent />
          <div className="flex flex-col gap-10 mt-5 tablet:mt-10 desktop:gap-10 desktop:mt-10 desktop:flex-row">
            <LatestArticles categorySlug="sport" posts={sportPosts} />
            <LatestArticles categorySlug="time-out" posts={timeOutPosts} />
            <LatestArticles categorySlug="community" posts={communityPosts} />
          </div>
        </article>
      </main>
    </PageWrapper>
  );
}
