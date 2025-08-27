// Usage examples:
// fetchPosts() - First 10 posts, all categories
// fetchPosts("sport") - First 10 posts from general-news category
// fetchPosts("general-news", 2) - Posts 11-20 from general-news category
// fetchPosts(undefined, 3) - Posts 21-30 from all categories

import { PostProps } from "../_types/post-types";

export async function fetchPosts(
  categorySlug?: string,
  page: number = 1
): Promise<PostProps[]> {
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

    const posts: PostProps[] = await response.json();
    const publishedPosts = posts.filter((post) => post.status === "publish");
    return publishedPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
