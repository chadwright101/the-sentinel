// Usage examples:
// fetchPosts() - first 9 posts (all categories)
// fetchPosts("sport") - first 9 posts in "sport"
// fetchPosts("news", 2) - page 2 in "news" (9 per page)
// fetchPosts(undefined, 3) - page 3 across all categories (9 per page)
// fetchPosts("news", { perPage: 100 }) - up to 100 posts from "news" (single call)
// fetchPosts("news", { page: 2, perPage: 12 }) - page 2 with 12 per page

import { PostProps } from "@/_types/post-types";

const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_BASE_URL;

type FetchPostsOptions = {
  page?: number;
  perPage?: number;
};

export function fetchPosts(
  categorySlug?: string,
  page?: number
): Promise<PostProps[]>;
export function fetchPosts(
  categorySlug?: string,
  options?: FetchPostsOptions
): Promise<PostProps[]>;
export async function fetchPosts(
  categorySlug?: string,
  pageOrOptions: number | FetchPostsOptions = 1
): Promise<PostProps[]> {
  try {
    if (!baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_WORDPRESS_REST_API_BASE_URL environment variable is not set"
      );
    }

    const options: FetchPostsOptions =
      typeof pageOrOptions === "number"
        ? { page: pageOrOptions }
        : pageOrOptions ?? {};

    const page = options.page ?? 1;
    const perPage = Math.max(1, Math.min(100, options.perPage ?? 9));

    let url = `${baseUrl}posts?per_page=${perPage}&page=${page}&_embed=author`;

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

    const posts: PostProps[] = await response.json();
    const publishedPosts = posts.filter((post) => post.status === "publish");
    return publishedPosts
      .filter((post) => post.jetpack_featured_media_url)
      .filter((post) => post.title && post.content?.rendered);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
