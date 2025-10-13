import { notFound } from "next/navigation";
import { fetchPostsWithPagination } from "@/_components/fetch-posts-with-pagination";
import { fetchPosts } from "@/_components/fetch-posts";
import { getCategoryMapping } from "@/_lib/utils/category-mapping";
import PaginationComponent from "@/_lib/utils/pagination-component";
import BreadcrumbComponent from "@/_lib/utils/breadcrumb-component";
import CategoryGrid from "@/_components/category-page/category-grid";
import PageWrapper from "@/_lib/utils/page-wrapper";

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { categorySlug } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const categoryInfo = getCategoryMapping(categorySlug);
  if (!categoryInfo) {
    notFound();
  }

  let posts, hasMore, totalPages;

  if (categorySlug === "latest-news") {
    posts = await fetchPosts();
    hasMore = false;
    totalPages = 1;
  } else {
    const paginatedResults = await fetchPostsWithPagination(
      categorySlug,
      currentPage
    );
    posts = paginatedResults.posts;
    hasMore = paginatedResults.hasMore;
    totalPages = paginatedResults.totalPages;
  }

  if (posts.length === 0 && currentPage === 1) {
    return (
      <PageWrapper cssClasses="my-10">
        <main className="grid gap-5">
          <div>
            <BreadcrumbComponent
              items={[
                { label: "Home", href: "/" },
                { label: categoryInfo.title },
              ]}
            />
          </div>
          <h1 className="text-36px font-inter font-bold">
            {categoryInfo.title}
          </h1>
          <div className="text-center py-32">
            <h2 className="text-36px font-inter mb-2 zoom">Coming Soon</h2>
            <p className="font-inter">
              Check back again soon for the latest{" "}
              {categoryInfo.title.toLowerCase()} news.
            </p>
          </div>
        </main>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper cssClasses="my-10">
      <main className="grid gap-5">
        <div>
          <BreadcrumbComponent
            items={[
              { label: "Home", href: "/" },
              { label: categoryInfo.title },
            ]}
          />
        </div>

        <h1 className="text-36px font-inter font-bold">{categoryInfo.title}</h1>

        <CategoryGrid posts={posts} categorySlug={categorySlug} />

        <PaginationComponent
          currentPage={currentPage}
          categorySlug={categorySlug}
          hasMorePosts={hasMore}
          totalPages={totalPages}
        />
      </main>
    </PageWrapper>
  );
}
