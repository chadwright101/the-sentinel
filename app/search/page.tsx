import { fetchSearchResults } from "@/_components/fetch-search-results";
import SearchGrid from "@/_components/search-page/search-grid";
import PaginationComponent from "@/_lib/utils/pagination-component";
import BreadcrumbComponent from "@/_lib/utils/breadcrumb-component";
import PageWrapper from "@/_lib/utils/page-wrapper";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page } = await searchParams;
  const searchQuery = q ? decodeURIComponent(q) : "";
  const currentPage = Number(page) || 1;

  const { posts, hasMore, totalPages, totalResults } = await fetchSearchResults(
    searchQuery,
    currentPage
  );

  const noResults = searchQuery && totalResults === 0;
  const emptySearch = !searchQuery;

  return (
    <PageWrapper cssClasses="my-10">
      <main className="grid gap-5">
        <div>
          <BreadcrumbComponent
            items={[{ label: "Home", href: "/" }, { label: "Search" }]}
          />
        </div>

        <h2 className="text-36px font-inter font-bold">Search Results</h2>

        {searchQuery && (
          <p className="text-16px font-inter">
            {totalResults === 0 ? (
              <span>
                No results found for{" "}
                <span className="font-semibold">&quot;{searchQuery}&quot;</span>
              </span>
            ) : (
              <span>
                Showing <span className="font-semibold">{posts.length}</span> of{" "}
                <span className="font-semibold">{totalResults}</span> results
                for{" "}
                <span className="font-semibold">&quot;{searchQuery}&quot;</span>
              </span>
            )}
          </p>
        )}

        {emptySearch && (
          <div className="text-center py-20">
            <p className="text-16px font-inter">
              Use the search bar above to find articles
            </p>
          </div>
        )}

        {noResults && (
          <div className="text-center py-20">
            <h3 className="text-24px font-inter font-bold mb-3">
              No articles found
            </h3>
            <p className="text-16px font-inter mb-5">
              Try different keywords or browse our categories
            </p>
          </div>
        )}

        {posts.length > 0 && <SearchGrid posts={posts} />}

        {posts.length > 0 && (
          <PaginationComponent
            currentPage={currentPage}
            categorySlug="search"
            hasMorePosts={hasMore}
            totalPages={totalPages}
            baseQuery={`?q=${encodeURIComponent(searchQuery)}`}
          />
        )}
      </main>
    </PageWrapper>
  );
}
