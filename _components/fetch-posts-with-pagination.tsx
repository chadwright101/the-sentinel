import { PostProps } from "@/_types/post-types";

interface PostsWithPagination {
  posts: PostProps[];
  hasMore: boolean;
  totalPages: number;
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
    let url = `${baseUrl}posts?per_page=10&page=${page}&_embed=author`;

    if (categorySlug) {
      const categoryIds: number[] = [];

      if (categorySlug === "latest-news") {
        // latest-news shows all posts, no category filtering
        // Skip adding any categories to the URL
      } else if (categorySlug === "news") {
        const newsAndUncategorizedResponse = await fetch(
          `${baseUrl}categories?slug=${categorySlug},uncategorized`,
          { next: { revalidate: 300 } }
        );

        if (newsAndUncategorizedResponse.ok) {
          const categories = await newsAndUncategorizedResponse.json();
          categoryIds.push(...categories.map((cat: any) => cat.id));
        }
      } else {
        const categoriesResponse = await fetch(
          `${baseUrl}categories?slug=${categorySlug}`,
          { next: { revalidate: 300 } }
        );

        if (categoriesResponse.ok) {
          const categories = await categoriesResponse.json();
          if (categories.length > 0) {
            categoryIds.push(categories[0].id);
          } else {
            console.log(`No categories found for slug: ${categorySlug}`);
          }
        } else {
          console.error(`Categories API error: ${categoriesResponse.status}`);
        }
      }

      if (categoryIds.length > 0) {
        url += `&categories=${categoryIds.join(',')}`;
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
      .filter(
        (post) => post.title && post.excerpt?.rendered && post.content?.rendered
      );

    const hasMore = publishedPosts.length > 9;
    const posts = publishedPosts.slice(0, 9);

    return { posts, hasMore, totalPages };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], hasMore: false, totalPages: 1 };
  }
}
