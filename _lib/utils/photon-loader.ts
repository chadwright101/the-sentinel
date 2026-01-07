import { ImageLoaderProps } from "next/image";

const PHOTON_HOSTS = ["i0.wp.com", "i1.wp.com", "i2.wp.com"];
const WORDPRESS_HOST = "sentinelnewscomau.wpcomstaging.com";

export default function photonLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!src) return src;

  try {
    const url = new URL(src);
    if (PHOTON_HOSTS.includes(url.hostname) || url.hostname === WORDPRESS_HOST) {
      url.searchParams.set("w", width.toString());
      if (quality) {
        url.searchParams.set("quality", quality.toString());
      }
      url.searchParams.set("strip", "info");
      return url.toString();
    }
    return src;
  } catch {
    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}w=${width}${quality ? `&quality=${quality}` : ""}&strip=info`;
  }
}
