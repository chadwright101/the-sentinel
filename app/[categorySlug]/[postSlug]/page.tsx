import { notFound } from "next/navigation";
import { fetchSinglePost } from "@/_components/fetch-single-post";
import { getCategoryMapping } from "@/_lib/utils/category-mapping";
import Image from "next/image";
import PostContentWithAd from "@/_components/post-page/post-content-with-ad";
import BreadcrumbComponent from "@/_lib/utils/breadcrumb-component";
import {
  AdSpaceSquare,
  AdSpaceTall,
} from "@/_components/home-page/home-page-categories/home-page-grid-base";

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

  const post = await fetchSinglePost(postSlug);
  if (!post) {
    notFound();
  }

  return (
    <main className="mx-5 my-10 desktop:mx-10">
      <article className="max-w-[1100px] mx-auto grid gap-5">
        <BreadcrumbComponent
          items={[
            { label: "Home", href: "/" },
            { label: categoryInfo.title, href: `/${categorySlug}` },
            { label: post.title.rendered.replace(/<[^>]*>/g, "") },
          ]}
        />
        <h1
          className="text-36px font-inter font-bold"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          className="text-14px font-newsreader"
        />
        <time dateTime={post.date} className="text-12px font-medium font-inter">
          {new Date(post.date).toLocaleDateString("en-AU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div className="desktop:grid grid-cols-[1fr_250px] gap-7">
          <div className="grid gap-5">
            <div className="w-full h-[500px]">
              <Image
                src={post.jetpack_featured_media_url}
                alt={post.title.rendered}
                className="w-full h-full object-cover"
                width={1100}
                height={500}
                sizes="(max-width: 1100px) 100vw, 1100px"
              />
            </div>
            <PostContentWithAd content={post.content.rendered} />
          </div>
          <div className="hidden desktop:flex flex-col gap-10">
            <AdSpaceTall
              src="/images/placeholders/ads/tall-ad.png"
              alt="#"
              url="#"
            />
            <div className="sticky top-[180px] flex flex-col gap-10">
              <AdSpaceSquare
                src="/images/placeholders/ads/square-ad.png"
                alt="#"
                url="#"
              />
              <AdSpaceSquare
                src="/images/placeholders/ads/square-ad.png"
                alt="#"
                url="#"
              />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
