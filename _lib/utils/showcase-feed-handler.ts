import { PostProps } from "@/_types/post-types";
import { fetchPosts } from "@/_components/fetch-posts";
import { fetchPostsBySchedule } from "@/_components/fetch-posts-by-schedule";
import { buildShowcaseRss } from "@/_lib/utils/build-showcase-rss";
import { getShowcaseSlug, ShowcasePeriod } from "@/_lib/utils/showcase-day";
import { SITE_NAME } from "@/_lib/utils/site-config";

const PANEL_SIZE = 3;

function respond(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=300, s-maxage=300, stale-while-revalidate=600",
    },
  });
}

export async function buildShowcaseResponse(
  period: ShowcasePeriod
): Promise<Response> {
  const feedPath = `/api/rss/showcase-${period}`;
  const feedTitle = `${SITE_NAME} — News Showcase (${period.toUpperCase()})`;

  try {
    const scheduleSlug = getShowcaseSlug(period);
    const scheduled = await fetchPostsBySchedule(scheduleSlug, PANEL_SIZE);

    let posts: PostProps[] = scheduled;

    if (posts.length < PANEL_SIZE) {
      const seen = new Set(posts.map((post) => post.id));
      const latest = await fetchPosts(undefined, { perPage: 12 });

      for (const post of latest) {
        if (posts.length >= PANEL_SIZE) break;
        if (seen.has(post.id)) continue;
        seen.add(post.id);
        posts = [...posts, post];
      }
    }

    return respond(
      buildShowcaseRss(posts.slice(0, PANEL_SIZE), feedPath, feedTitle)
    );
  } catch (error) {
    console.error("Error building showcase feed:", error);
    return respond(buildShowcaseRss([], feedPath, feedTitle));
  }
}
