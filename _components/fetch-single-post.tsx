import { PostProps } from "@/_types/post-types";

export async function fetchSinglePost(slug: string): Promise<PostProps | null> {
  try {
    const response = await fetch(
      `https://sentinelnewscomau.wpcomstaging.com/wp-json/wp/v2/posts?slug=${slug}`,
      { cache: "no-store" }
    );

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