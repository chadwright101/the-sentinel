import { PostProps } from "@/_types/post-types";

interface SearchResultsWithPagination {
  posts: PostProps[];
  hasMore: boolean;
  totalPages: number;
  totalResults: number;
}

const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_BASE_URL;

export async function fetchSearchResults(
  searchQuery: string,
  page: number = 1
): Promise<SearchResultsWithPagination> {
  try {
    if (!baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_WORDPRESS_REST_API_BASE_URL environment variable is not set"
      );
    }

    if (!searchQuery || searchQuery.trim() === "") {
      return { posts: [], hasMore: false, totalPages: 1, totalResults: 0 };
    }

    const encodedQuery = encodeURIComponent(searchQuery.trim());
    const url = `${baseUrl}posts?search=${encodedQuery}&per_page=10&page=${page}&_embed=author`;

    const response = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const allPosts: PostProps[] = await response.json();
    const totalResults = parseInt(response.headers.get("X-WP-Total") || "0");
    const totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "1");

    const publishedPosts = allPosts
      .filter((post) => post.status === "publish")
      .filter((post) => post.jetpack_featured_media_url)
      .filter((post) => post.title && post.content?.rendered);

    const hasMore = publishedPosts.length > 9;
    const posts = publishedPosts.slice(0, 9);

    return { posts, hasMore, totalPages, totalResults };
  } catch (error) {
    console.error("Error fetching search results:", error);
    return { posts: [], hasMore: false, totalPages: 1, totalResults: 0 };
  }
}
