import { PostProps } from "@/_types/post-types";
import { fetchPosts } from "@/_components/fetch-posts";
import { fetchPostsBySchedule } from "@/_components/fetch-posts-by-schedule";
import { buildShowcasePanelFeed } from "@/_lib/utils/build-showcase-panel-feed";
import { getShowcasePeriod, getShowcaseSlug } from "@/_lib/utils/showcase-day";
import { SITE_NAME } from "@/_lib/utils/site-config";

const PANEL_SIZE = 3;
const FEED_PATH = "/api/rss/showcase";
const PANEL_TITLE = "The Sentinel Rundown";

function respond(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=300, s-maxage=300, stale-while-revalidate=600",
    },
  });
}

export async function buildShowcasePanelResponse(): Promise<Response> {
  const period = getShowcasePeriod();
  const feedTitle = `${SITE_NAME} — News Showcase`;
  const panelName = `Sentinel Rundown (${period.toUpperCase()})`;

  try {
    const scheduled = await fetchPostsBySchedule(
      getShowcaseSlug(period),
      PANEL_SIZE
    );

    let posts: PostProps[] = scheduled.slice(0, PANEL_SIZE);

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

    if (posts.length < PANEL_SIZE) {
      return respond(
        buildShowcasePanelFeed([], FEED_PATH, feedTitle, panelName, PANEL_TITLE)
      );
    }

    return respond(
      buildShowcasePanelFeed(posts, FEED_PATH, feedTitle, panelName, PANEL_TITLE)
    );
  } catch (error) {
    console.error("Error building showcase panel feed:", error);
    return respond(
      buildShowcasePanelFeed([], FEED_PATH, feedTitle, panelName, PANEL_TITLE)
    );
  }
}
