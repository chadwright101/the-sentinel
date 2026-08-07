export type ShowcasePeriod = "am" | "pm";

export function getBrisbaneDayCode(): string {
  const weekday = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Brisbane",
    weekday: "short",
  }).format(new Date());

  return weekday.toLowerCase().slice(0, 3);
}

export function getShowcasePeriod(): ShowcasePeriod {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Australia/Brisbane",
      hour: "2-digit",
      hour12: false,
    }).format(new Date())
  );

  return hour < 12 ? "am" : "pm";
}

export function getShowcaseSlug(period: ShowcasePeriod): string {
  return `${getBrisbaneDayCode()}-${period}`;
}

export function getBriefingLabel(period: ShowcasePeriod): string {
  return period === "am" ? "Morning Briefing" : "Evening Briefing";
}
