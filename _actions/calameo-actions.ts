// app/actions/calameo.ts
"use server";

import crypto from "crypto";

const CALAMEO_API_KEY = process.env.CALAMEO_API_KEY!;
const CALAMEO_API_SECRET = process.env.CALAMEO_API_SECRET!;
const CALAMEO_API_URL = "https://api.calameo.com/1.0/";

interface CalameoPublication {
  ID: string;
  Name: string;
  Description: string;
  Date: string;
  Status: string;
  IsPublished: number;
  IsPrivate: number;
  Pages: number;
  PosterUrl: string;
  ViewUrl: string;
}

function generateSignature(params: Record<string, string>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}${params[key]}`)
    .join("");

  const stringToHash = CALAMEO_API_SECRET + sortedParams;

  const signature = crypto
    .createHash("md5")
    .update(stringToHash)
    .digest("hex")
    .toUpperCase();

  return signature;
}

export default async function getRecentPublications(): Promise<
  CalameoPublication[]
> {
  try {
    const params: Record<string, string> = {
      apikey: CALAMEO_API_KEY,
      output: "JSON",
      action: "API.fetchAccountBooks",
      start: "0",
      step: "20",
      order: "Date",
      way: "DOWN",
    };

    const signature = generateSignature(params);

    const url = new URL(CALAMEO_API_URL);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    url.searchParams.append("signature", signature);

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    const data = await response.json();

    if (data.response?.status === "error") {
      throw new Error(data.response.error.message);
    }

    const publications = data.response?.content?.items || [];

    // Filter publications to only include published, non-private, completed ones with over 12 pages
    const filteredPublications = publications.filter(
      (pub: any) =>
        pub.Status === "DONE" &&
        pub.IsPublished === 1 &&
        pub.IsPrivate === 0 &&
        pub.Pages > 12
    );

    // Sort filtered publications by date in descending order (most recent first)
    const sortedPublications = filteredPublications.sort((a: any, b: any) => {
      const dateA = new Date(a.Date || 0);
      const dateB = new Date(b.Date || 0);
      return dateB.getTime() - dateA.getTime();
    });

    // Return only the 10 most recent
    const recentPublications = sortedPublications.slice(0, 10);
    return recentPublications;
  } catch (error) {
    return [];
  }
}
