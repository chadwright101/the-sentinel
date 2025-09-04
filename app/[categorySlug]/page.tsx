import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchPostsWithPagination } from "@/_components/fetch-posts-with-pagination";
import { fetchPosts } from "@/_components/fetch-posts";
import { getCategoryMapping } from "@/_utils/category-mapping";
import PaginationComponent from "@/_components/pagination/pagination-component";
import { PostProps } from "@/_types/post-types";

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
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-14px font-inter">
            <li>
              <Link
                href="/"
                className="text-teal hover:text-dark-brown transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li className="text-beige">/</li>
            <li className="text-black font-bold">{categoryInfo.title}</li>
          </ol>
        </nav>

        <header className="mb-8">
          <h1 className="text-36px font-abril-fatface text-teal mb-4">
            {categoryInfo.title}
          </h1>
          <div className="w-full h-px bg-beige"></div>
        </header>

        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-8 mb-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <a href={`/${categorySlug}/${post.slug}`}>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.jetpack_featured_media_url}
                    alt={post.title.rendered}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h2
                    className="text-18px font-newsreader font-bold text-teal mb-3 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div
                    className="text-14px text-black font-inter line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <div className="mt-4 text-12px text-teal font-inter font-bold">
                    {new Date(post.date).toLocaleDateString("en-AU", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>

        <PaginationComponent
          currentPage={currentPage}
          categorySlug={categorySlug}
          hasMorePosts={hasMore}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}
