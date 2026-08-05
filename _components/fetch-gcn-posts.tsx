import { PostProps } from "@/_types/post-types";
import { GCN_WP_API_BASE_URL } from "@/_lib/utils/gcn-site-config";

export type GcnPost = PostProps & { link: string };

interface GcnApiPost extends Omit<PostProps, "jetpack_featured_media_url"> {
  link: string;
  featured_media: number;
}

interface GcnMedia {
  id: number;
  source_url: string;
}

const POST_FIELDS =
  "id,slug,link,title,excerpt,date,modified,status,content,class_list,featured_media";

async function resolveFeaturedImages(
  posts: GcnApiPost[]
): Promise<Map<number, string>> {
  const ids = [...new Set(posts.map((post) => post.featured_media))];

  if (ids.length === 0) {
    return new Map();
  }

  const response = await fetch(
    `${GCN_WP_API_BASE_URL}media?include=${ids.join(
      ","
    )}&per_page=100&_fields=id,source_url`,
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    console.error(`GCN media API error: ${response.status}`);
    return new Map();
  }

  const media: GcnMedia[] = await response.json();

  if (!Array.isArray(media)) {
    return new Map();
  }

  return new Map(
    media
      .filter((item) => item.source_url)
      .map((item) => [item.id, item.source_url])
  );
}

async function normaliseGcnPosts(posts: GcnApiPost[]): Promise<GcnPost[]> {
  if (!Array.isArray(posts)) {
    return [];
  }

  const candidates = posts.filter(
    (post) =>
      post.status === "publish" &&
      post.link &&
      post.title?.rendered &&
      post.content?.rendered &&
      post.featured_media
  );

  if (candidates.length === 0) {
    return [];
  }

  const images = await resolveFeaturedImages(candidates);

  return candidates.reduce<GcnPost[]>((accumulator, post) => {
    const imageUrl = images.get(post.featured_media);

    if (!imageUrl) {
      return accumulator;
    }

    return [...accumulator, { ...post, jetpack_featured_media_url: imageUrl }];
  }, []);
}

export async function fetchGcnPostsBySchedule(
  scheduleSlug: string,
  perPage: number = 3
): Promise<GcnPost[]> {
  try {
    const categoriesResponse = await fetch(
      `${GCN_WP_API_BASE_URL}categories?slug=${scheduleSlug}&_fields=id`,
      { next: { revalidate: 300 } }
    );

    if (!categoriesResponse.ok) {
      console.error(`GCN categories API error: ${categoriesResponse.status}`);
      return [];
    }

    const categories = await categoriesResponse.json();

    if (!Array.isArray(categories) || categories.length === 0) {
      console.log(`No GCN schedule category found for slug: ${scheduleSlug}`);
      return [];
    }

    const response = await fetch(
      `${GCN_WP_API_BASE_URL}posts?categories=${categories[0].id}&per_page=${perPage}&_fields=${POST_FIELDS}&orderby=modified&order=desc`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await normaliseGcnPosts(await response.json());
  } catch (error) {
    console.error("Error fetching GCN posts by schedule:", error);
    return [];
  }
}

export async function fetchGcnPosts(perPage: number = 12): Promise<GcnPost[]> {
  try {
    const response = await fetch(
      `${GCN_WP_API_BASE_URL}posts?per_page=${perPage}&_fields=${POST_FIELDS}&orderby=date&order=desc`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await normaliseGcnPosts(await response.json());
  } catch (error) {
    console.error("Error fetching GCN posts:", error);
    return [];
  }
}
