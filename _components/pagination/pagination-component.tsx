import Link from "next/link";

interface PaginationComponentProps {
  currentPage: number;
  categorySlug: string;
  hasMorePosts: boolean;
  totalPages: number;
}

export default function PaginationComponent({
  currentPage,
  categorySlug,
  hasMorePosts,
  totalPages,
}: PaginationComponentProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  const generatePageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 1);
    let endPage = currentPage + 1;
    
    // If we have more posts, we know there's at least one more page
    if (hasMorePosts) {
      endPage = Math.max(endPage, currentPage + 1);
    }
    
    // Always show at least 3 pages when possible
    const minEndPage = Math.max(startPage + 2, endPage);
    
    for (let i = startPage; i <= minEndPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className="flex justify-center items-center space-x-2 mt-12"
      aria-label="Pagination Navigation"
    >
      {!isFirstPage && (
        <Link
          href={`/${categorySlug}`}
          className="px-4 py-3 bg-teal text-white font-inter font-bold text-14px rounded-lg hover:bg-dark-brown transition-colors duration-300"
        >
          First
        </Link>
      )}

      {pageNumbers.map((pageNum) => (
        <Link
          key={pageNum}
          href={`/${categorySlug}${pageNum > 1 ? `?page=${pageNum}` : ""}`}
          className={`px-4 py-3 font-inter font-bold text-14px rounded-lg transition-colors duration-300 ${
            pageNum === currentPage
              ? "bg-beige text-teal"
              : "bg-white text-teal border border-beige hover:bg-beige"
          }`}
        >
          {pageNum}
        </Link>
      ))}

      {!isLastPage && (
        <Link
          href={`/${categorySlug}?page=${totalPages}`}
          className="px-4 py-3 bg-teal text-white font-inter font-bold text-14px rounded-lg hover:bg-dark-brown transition-colors duration-300"
        >
          Last
        </Link>
      )}
    </nav>
  );
}
