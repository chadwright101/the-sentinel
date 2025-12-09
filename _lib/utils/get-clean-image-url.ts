const getCleanImageUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    urlObj.search = "";
    return urlObj.toString();
  } catch {
    return url.split("?")[0];
  }
};

export default getCleanImageUrl;
