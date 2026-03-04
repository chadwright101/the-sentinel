import { AdResponse, AdData } from "@/_types/ad-types";

const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_BASE_URL;

export async function fetchAdData(): Promise<AdData | null> {
  try {
    if (!baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_WORDPRESS_REST_API_BASE_URL environment variable is not set"
      );
    }

    const url = `${baseUrl}ad-space`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const adResponse: AdResponse[] = await response.json();

    if (adResponse.length > 0 && adResponse[0].acf) {
      return adResponse[0].acf;
    }

    return null;
  } catch (error) {
    console.error("Error fetching ad data:", error);
    return null;
  }
}
