import { PostProps } from "@/_types/post-types";

const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_BASE_URL;

export async function fetchSinglePost(slug: string): Promise<PostProps | null> {
  try {
    if (!baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_WORDPRESS_REST_API_BASE_URL environment variable is not set"
      );
    }
    const response = await fetch(`${baseUrl}posts?slug=${slug}&_embed=author,wp:featuredmedia`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts: PostProps[] = await response.json();

    if (posts.length === 0) {
      return null;
    }

    const post = posts[0];

    if (post.status !== "publish") {
      return null;
    }

    return post;
  } catch (error) {
    console.error("Error fetching single post:", error);
    return null;
  }
}
