import { GcnPost } from "@/_components/fetch-gcn-posts";
import decodeHtmlEntities from "@/_lib/utils/decode-html-entities";
import { SITE_BASE_URL } from "@/_lib/utils/site-config";
import {
  GCN_CATEGORY_NAMES,
  GCN_CATEGORY_PRIORITY,
  GCN_SITE_BASE_URL,
  GCN_SITE_DESCRIPTION,
} from "@/_lib/utils/gcn-site-config";

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 900;
const OVERLINE_MAX = 30;
const PANEL_GUID = "urn:uuid:3c7d1f60-8a24-4e93-b5d1-6f0e29ab74c2";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function stripHtml(value: string): string {
  return decodeHtmlEntities(value.replace(/<[^>]*>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

function getSiteOffsetMinutes(date: Date): number {
  const brisbane = new Date(
    date.toLocaleString("en-US", { timeZone: "Australia/Brisbane" })
  );
  const utc = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  return Math.round((brisbane.getTime() - utc.getTime()) / 60000);
}

function parseWordPressDate(value: string): Date {
  if (/(Z|[+-]\d{2}:?\d{2})$/.test(value)) {
    return new Date(value);
  }

  const provisional = new Date(`${value}Z`);
  const offsetMinutes = getSiteOffsetMinutes(provisional);
  return new Date(provisional.getTime() - offsetMinutes * 60000);
}

function toRfc822(value: string): string {
  const date = parseWordPressDate(value);

  if (Number.isNaN(date.getTime())) {
    return toRfc822(new Date().toISOString());
  }

  const offsetMinutes = getSiteOffsetMinutes(date);
  const shifted = new Date(date.getTime() + offsetMinutes * 60000);
  const sign = offsetMinutes < 0 ? "-" : "+";
  const absolute = Math.abs(offsetMinutes);
  const offset = `${sign}${String(Math.floor(absolute / 60)).padStart(
    2,
    "0"
  )}${String(absolute % 60).padStart(2, "0")}`;

  const pad = (n: number) => String(n).padStart(2, "0");

  return `${DAYS[shifted.getUTCDay()]}, ${pad(shifted.getUTCDate())} ${
    MONTHS[shifted.getUTCMonth()]
  } ${shifted.getUTCFullYear()} ${pad(shifted.getUTCHours())}:${pad(
    shifted.getUTCMinutes()
  )}:${pad(shifted.getUTCSeconds())} ${offset}`;
}

function getPanelImageUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const photon = new URL(
      `https://i0.wp.com/${parsed.hostname}${parsed.pathname}`
    );
    photon.searchParams.set("resize", `${IMAGE_WIDTH},${IMAGE_HEIGHT}`);
    photon.searchParams.set("quality", "80");
    photon.searchParams.set("strip", "info");
    photon.searchParams.set("ssl", "1");
    return photon.toString();
  } catch {
    return url;
  }
}

function getOverline(post: GcnPost): string {
  const slugs = new Set(
    (post.class_list ?? []).reduce<string[]>((accumulator, className) => {
      const match = className.match(/^category-(.+)$/);
      return match ? [...accumulator, match[1]] : accumulator;
    }, [])
  );

  const matched = GCN_CATEGORY_PRIORITY.find((slug) => slugs.has(slug));
  const title = matched ? GCN_CATEGORY_NAMES[matched] : "News";

  return title.slice(0, OVERLINE_MAX);
}

function buildArticle(post: GcnPost): string {
  const url = post.link;
  const imageUrl = getPanelImageUrl(post.jetpack_featured_media_url);

  return [
    "        <g:item>",
    `          <guid isPermaLink="true">${escapeXml(url)}</guid>`,
    `          <title>${escapeXml(stripHtml(post.title.rendered))}</title>`,
    `          <g:overline>${escapeXml(getOverline(post))}</g:overline>`,
    `          <link>${escapeXml(url)}</link>`,
    `          <media:content url="${escapeXml(
      imageUrl
    )}" type="image/jpeg" medium="image" width="${IMAGE_WIDTH}" height="${IMAGE_HEIGHT}" />`,
    "        </g:item>",
  ].join("\n");
}

export function buildGcnShowcasePanelFeed(
  posts: GcnPost[],
  feedPath: string,
  feedTitle: string,
  panelName: string,
  panelTitle: string
): string {
  const feedUrl = `${SITE_BASE_URL}${feedPath}`;

  const latest = posts.reduce<string | null>((newest, post) => {
    const candidate = post.modified ?? post.date;
    if (!newest) return candidate;
    return parseWordPressDate(candidate) > parseWordPressDate(newest)
      ? candidate
      : newest;
  }, null);

  const buildDate = toRfc822(latest ?? new Date().toISOString());

  const panel =
    posts.length === 3
      ? `    <item>
      <g:panel type="RUNDOWN">${escapeXml(panelName)}</g:panel>
      <guid isPermaLink="false">${PANEL_GUID}</guid>
      <pubDate>${buildDate}</pubDate>
      <g:panel_title>${escapeXml(panelTitle)}</g:panel_title>
      <title></title>
      <g:article_group role="RUNDOWN">
${posts.map(buildArticle).join("\n")}
      </g:article_group>
    </item>
`
      : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:g="http://schemas.google.com/pcn/2020">
  <channel>
    <title>${escapeXml(feedTitle)}</title>
    <link>${escapeXml(GCN_SITE_BASE_URL)}</link>
    <description>${escapeXml(GCN_SITE_DESCRIPTION)}</description>
    <language>en-AU</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${escapeXml(
      feedUrl
    )}" rel="self" type="application/rss+xml" />
${panel}  </channel>
</rss>
`;
}
