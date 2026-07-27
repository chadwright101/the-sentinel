export type ShowcasePeriod = "am" | "pm";

export function getBrisbaneDayCode(): string {
  const weekday = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Brisbane",
    weekday: "short",
  }).format(new Date());

  return weekday.toLowerCase().slice(0, 3);
}

export function getShowcaseSlug(period: ShowcasePeriod): string {
  return `${getBrisbaneDayCode()}-${period}`;
}
