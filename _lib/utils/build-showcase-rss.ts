import { PostProps } from "@/_types/post-types";
import { extractCategorySlug } from "@/_lib/utils/category-mapping";
import { SITE_BASE_URL, SITE_DESCRIPTION } from "@/_lib/utils/site-config";

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

function cdata(value: string): string {
  return `<![CDATA[${value.replace(/\]\]>/g, "]]&gt;")}]]>`;
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
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

function buildItem(post: PostProps): string {
  const url = `${SITE_BASE_URL}/${extractCategorySlug(post)}/${post.slug}`;
  const description = stripHtml(post.excerpt?.rendered ?? "");

  const parts = [
    "    <item>",
    `      <title>${escapeXml(stripHtml(post.title.rendered))}</title>`,
    `      <link>${escapeXml(url)}</link>`,
    `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
    `      <pubDate>${toRfc822(post.date)}</pubDate>`,
  ];

  if (description) {
    parts.push(`      <description>${cdata(description)}</description>`);
  }

  parts.push(
    `      <content:encoded>${cdata(
      post.content?.rendered ?? ""
    )}</content:encoded>`
  );

  if (post.jetpack_featured_media_url) {
    parts.push(
      `      <media:content url="${escapeXml(
        post.jetpack_featured_media_url
      )}" medium="image" />`
    );
  }

  parts.push("    </item>");

  return parts.join("\n");
}

export function buildShowcaseRss(
  posts: PostProps[],
  feedPath: string,
  feedTitle: string
): string {
  const feedUrl = `${SITE_BASE_URL}${feedPath}`;

  const latest = posts.reduce<string | null>((newest, post) => {
    const candidate = post.modified ?? post.date;
    if (!newest) return candidate;
    return parseWordPressDate(candidate) > parseWordPressDate(newest)
      ? candidate
      : newest;
  }, null);

  const lastBuildDate = toRfc822(latest ?? new Date().toISOString());

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(feedTitle)}</title>
    <link>${escapeXml(SITE_BASE_URL)}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-AU</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(
      feedUrl
    )}" rel="self" type="application/rss+xml" />
${posts.map(buildItem).join("\n")}
  </channel>
</rss>
`;
}
