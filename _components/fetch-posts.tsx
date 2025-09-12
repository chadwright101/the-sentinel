// Usage examples:
// fetchPosts() - First 9 posts, all categories, filtered by image, title, excerpt, and content
// fetchPosts("sport") - First 9 posts from news category, filtered by image, title, excerpt, and content
// fetchPosts("news", 2) - Posts 10-18 from news category, filtered by image, title, excerpt, and content
// fetchPosts(undefined, 3) - Posts 19-27 from all categories, filtered by image, title, excerpt, and content

import { PostProps } from "../_types/post-types";

const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_BASE_URL;

export async function fetchPosts(
  categorySlug?: string,
  page: number = 1
): Promise<PostProps[]> {
  try {
    if (!baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_WORDPRESS_REST_API_BASE_URL environment variable is not set"
      );
    }
    let url = `${baseUrl}posts?per_page=9&page=${page}`;

    if (categorySlug) {
      const categoriesResponse = await fetch(
        `${baseUrl}categories?slug=${categorySlug}`,
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
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts: PostProps[] = await response.json();
    const publishedPosts = posts.filter((post) => post.status === "publish");
    return publishedPosts
      .filter((post) => post.jetpack_featured_media_url)
      .filter(
        (post) => post.title && post.excerpt?.rendered && post.content?.rendered
      );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
