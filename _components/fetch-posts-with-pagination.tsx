import { PostProps } from "@/_types/post-types";

interface PostsWithPagination {
  posts: PostProps[];
  hasMore: boolean;
  totalPages: number;
  categoryFound: boolean;
}

const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_BASE_URL;

export async function fetchPostsWithPagination(
  categorySlug?: string,
  page: number = 1
): Promise<PostsWithPagination> {
  try {
    if (!baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_WORDPRESS_REST_API_BASE_URL environment variable is not set"
      );
    }

    // For latest-news, enforce max 2 pages
    const isLatestNews = categorySlug === "latest-news";
    if (isLatestNews && page > 2) {
      return { posts: [], hasMore: false, totalPages: 2, categoryFound: true };
    }

    let url = `${baseUrl}posts?per_page=12&page=${page}&_embed=author&orderby=date&order=desc`;
    let categoryFound = true;

    if (categorySlug) {
      const categoryIds: number[] = [];

      if (categorySlug === "latest-news") {
        // latest-news shows all posts, no category filtering
        // Skip adding any categories to the URL
      } else {
        const categoriesResponse = await fetch(
          `${baseUrl}categories?slug=${categorySlug}&per_page=100`,
          { next: { revalidate: 300 } }
        );

        if (categoriesResponse.ok) {
          const categories = await categoriesResponse.json();
          if (categories.length > 0) {
            categoryIds.push(categories[0].id);
          } else {
            categoryFound = false;
          }
        } else {
          categoryFound = false;
        }
      }

      if (categoryIds.length > 0) {
        url += `&categories=${categoryIds.join(",")}`;
      }
    }

    const response = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const allPosts: PostProps[] = await response.json();
    const totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "1");

    const publishedPosts = allPosts
      .filter((post) => post.status === "publish")
      .filter((post) => post.jetpack_featured_media_url)
      .filter((post) => post.title && post.content?.rendered);

    // For latest-news, cap totalPages at 2 and hasMore accordingly
    let finalTotalPages = totalPages;
    let hasMore = publishedPosts.length > 9;

    if (isLatestNews) {
      finalTotalPages = Math.min(totalPages, 2);
      hasMore = page < 2 && publishedPosts.length > 9;
    }

    const posts = publishedPosts.slice(0, 9);

    return { posts, hasMore, totalPages: finalTotalPages, categoryFound };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], hasMore: false, totalPages: 1, categoryFound: true };
  }
}
