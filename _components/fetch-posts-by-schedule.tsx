import { PostProps } from "@/_types/post-types";

const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_BASE_URL;

const POST_FIELDS =
  "id,slug,title,excerpt,date,modified,jetpack_featured_media_url,status,content,class_list";

export async function fetchPostsBySchedule(
  scheduleSlug: string,
  perPage: number = 3
): Promise<PostProps[]> {
  try {
    if (!baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_WORDPRESS_REST_API_BASE_URL environment variable is not set"
      );
    }

    const categoriesResponse = await fetch(
      `${baseUrl}categories?slug=${scheduleSlug}`,
      { next: { revalidate: 300 } }
    );

    if (!categoriesResponse.ok) {
      console.error(`Categories API error: ${categoriesResponse.status}`);
      return [];
    }

    const categories = await categoriesResponse.json();

    if (!Array.isArray(categories) || categories.length === 0) {
      console.log(`No schedule category found for slug: ${scheduleSlug}`);
      return [];
    }

    const response = await fetch(
      `${baseUrl}posts?categories=${categories[0].id}&per_page=${perPage}&_fields=${POST_FIELDS}&orderby=modified&order=desc`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts: PostProps[] = await response.json();

    return posts
      .filter((post) => post.status === "publish")
      .filter((post) => post.jetpack_featured_media_url)
      .filter((post) => post.title && post.content?.rendered);
  } catch (error) {
    console.error("Error fetching posts by schedule:", error);
    return [];
  }
}
