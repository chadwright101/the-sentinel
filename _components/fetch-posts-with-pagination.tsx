import { PostProps } from "@/_types/post-types";

interface PostsWithPagination {
  posts: PostProps[];
  hasMore: boolean;
  totalPages: number;
}

export async function fetchPostsWithPagination(
  categorySlug?: string,
  page: number = 1
): Promise<PostsWithPagination> {
  try {
    let url = `https://sentinelnewscomau.wpcomstaging.com/wp-json/wp/v2/posts?per_page=10&page=${page}`;

    if (categorySlug) {
      const categoriesResponse = await fetch(
        `https://sentinelnewscomau.wpcomstaging.com/wp-json/wp/v2/categories?slug=${categorySlug}`,
        { next: { revalidate: 300 } }
      );

      if (categoriesResponse.ok) {
        const categories = await categoriesResponse.json();
        if (categories.length > 0) {
          url += `&categories=${categories[0].id}`;
        } else {
          console.log(`No categories found for slug: ${categorySlug}`);
        }
      } else {
        console.error(`Categories API error: ${categoriesResponse.status}`);
      }
    }

    const response = await fetch(url, {
      cache: "no-store",
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
