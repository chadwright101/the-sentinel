import {
  GcnPost,
  fetchGcnPosts,
  fetchGcnPostsBySchedule,
} from "@/_components/fetch-gcn-posts";
import { buildGcnShowcasePanelFeed } from "@/_lib/utils/build-gcn-showcase-panel-feed";
import {
  getBriefingLabel,
  getShowcasePeriod,
  getShowcaseSlug,
} from "@/_lib/utils/showcase-day";
import { GCN_SITE_NAME } from "@/_lib/utils/gcn-site-config";

const PANEL_SIZE = 3;
const FEED_PATH = "/api/rss/gcn-showcase";
const PANEL_TITLE_PREFIX = "GCN";

function respond(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=300, s-maxage=300, stale-while-revalidate=600",
    },
  });
}

export async function buildGcnShowcasePanelResponse(): Promise<Response> {
  const period = getShowcasePeriod();
  const feedTitle = `${GCN_SITE_NAME} — News Showcase`;
  const panelName = `GCN Rundown (${period.toUpperCase()})`;
  const panelTitle = `${PANEL_TITLE_PREFIX} ${getBriefingLabel(period)}`;

  try {
    const scheduled = await fetchGcnPostsBySchedule(
      getShowcaseSlug(period),
      PANEL_SIZE
    );

    let posts: GcnPost[] = scheduled.slice(0, PANEL_SIZE);

    if (posts.length < PANEL_SIZE) {
      const seen = new Set(posts.map((post) => post.id));
      const latest = await fetchGcnPosts(12);

      for (const post of latest) {
        if (posts.length >= PANEL_SIZE) break;
        if (seen.has(post.id)) continue;
        seen.add(post.id);
        posts = [...posts, post];
      }
    }

    if (posts.length < PANEL_SIZE) {
      return respond(
        buildGcnShowcasePanelFeed(
          [],
          FEED_PATH,
          feedTitle,
          panelName,
          panelTitle
        )
      );
    }

    return respond(
      buildGcnShowcasePanelFeed(
        posts,
        FEED_PATH,
        feedTitle,
        panelName,
        panelTitle
      )
    );
  } catch (error) {
    console.error("Error building GCN showcase panel feed:", error);
    return respond(
      buildGcnShowcasePanelFeed(
        [],
        FEED_PATH,
        feedTitle,
        panelName,
        panelTitle
      )
    );
  }
}
