const ELLIPSIS = "…";

export const PANEL_TITLE_MAX = 64;

export default function truncatePanelTitle(
  title: string,
  maxLength: number = PANEL_TITLE_MAX
): string {
  if (title.length <= maxLength) {
    return title;
  }

  const window = title.slice(0, maxLength - ELLIPSIS.length);
  const lastSpace = window.lastIndexOf(" ");
  const candidate = lastSpace > 0 ? window.slice(0, lastSpace) : window;

  return candidate.replace(/[\s,;:.!?—–-]+$/, "") + ELLIPSIS;
}
