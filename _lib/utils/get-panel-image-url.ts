import { SITE_FALLBACK_IMAGE_URL } from "@/_lib/utils/site-config";

type PanelImage = {
  url: string;
  type: string;
};

function buildPhotonUrl(url: string, width: number, height: number): string {
  const parsed = new URL(url);
  const photon = new URL(
    `https://i0.wp.com/${parsed.hostname}${parsed.pathname}`
  );
  photon.searchParams.set("resize", `${width},${height}`);
  photon.searchParams.set("quality", "80");
  photon.searchParams.set("strip", "info");
  photon.searchParams.set("ssl", "1");
  return photon.toString();
}

const getPanelImageUrl = (
  url: string,
  width: number,
  height: number
): PanelImage => {
  const fallback = {
    url: buildPhotonUrl(SITE_FALLBACK_IMAGE_URL, width, height),
    type: "image/jpeg",
  };

  if (!url) return fallback;

  try {
    const parsed = new URL(url);

    if (/\.gif$/i.test(parsed.pathname)) return fallback;

    return {
      url: buildPhotonUrl(url, width, height),
      type: "image/jpeg",
    };
  } catch {
    return fallback;
  }
};

export default getPanelImageUrl;
