const EMBED_HOSTS = ["datawrapper.dwcdn.net"];

const fixEmbedIframes = (htmlContent: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const iframes = doc.querySelectorAll("figure.wp-block-embed iframe");

  iframes.forEach((iframe) => {
    const src = iframe.getAttribute("src");
    if (!src || !EMBED_HOSTS.some((host) => src.includes(host))) return;

    const height = iframe.getAttribute("height") || "423";

    iframe.removeAttribute("sandbox");
    iframe.removeAttribute("security");
    iframe.removeAttribute("class");
    iframe.setAttribute("src", src.split("#")[0]);
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("data-embed-autoheight", "true");
    iframe.setAttribute(
      "style",
      `width: 0; min-width: 100% !important; border: none; height: ${height}px;`,
    );
  });

  return doc.body.innerHTML;
};

export default fixEmbedIframes;
