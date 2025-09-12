import { fetchSinglePost } from "@/_components/fetch-single-post";
import { getCategoryMapping } from "./category-mapping";

const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_BASE_URL;

export function extractSlugFromWordPressUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/').filter(segment => segment);
    return pathSegments[pathSegments.length - 1] || null;
  } catch {
    return null;
  }
}

export async function getCategorySlugFromPost(postSlug: string): Promise<string | null> {
  try {
    if (!baseUrl) {
      return null;
    }

    const post = await fetchSinglePost(postSlug);
    if (!post) {
      return null;
    }

    const categoriesResponse = await fetch(
      `${baseUrl}posts/${post.id}?_embed=wp:term`,
      { cache: "no-store" }
    );

    if (!categoriesResponse.ok) {
      return null;
    }

    const postWithCategories = await categoriesResponse.json();
    const categories = postWithCategories._embedded?.['wp:term']?.[0] || [];

    for (const category of categories) {
      const categoryMapping = getCategoryMapping(category.slug);
      if (categoryMapping) {
        return category.slug;
      }
    }

    return null;
  } catch {
    return null;
  }
}