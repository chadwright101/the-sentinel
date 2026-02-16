const getPhotonUrl = (url: string, width: number, quality: number = 80): string => {
  if (!url) return url;

  try {
    const urlObj = new URL(url);
    urlObj.search = "";
    urlObj.searchParams.set("w", width.toString());
    urlObj.searchParams.set("quality", quality.toString());
    urlObj.searchParams.set("strip", "info");
    urlObj.searchParams.set("ssl", "1");
    return urlObj.toString();
  } catch {
    const cleanUrl = url.split("?")[0];
    return `${cleanUrl}?w=${width}&quality=${quality}&strip=info&ssl=1`;
  }
};

export default getPhotonUrl;
