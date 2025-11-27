import { Metadata } from "next";
import { EventData } from "@/_types/calendar-types";
import classNames from "classnames";
import Link from "next/link";
import {
  extractSlugFromWordPressUrl,
  getCategorySlugFromPost,
} from "@/_lib/utils/get-category-from-post-slug";
import Image from "next/image";
import PageWrapper from "@/_lib/utils/page-wrapper";

async function fetchEvents(): Promise<EventData[]> {
  const response = await fetch(
    "https://sentinelnewscomau.wpcomstaging.com/wp-json/wp/v2/event",
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
}

function formatDate(dateString: string): string {
  const [day, month, year] = dateString.split("/");
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return date.toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function toIsoDate(dateString: string): string {
  const [day, month, year] = dateString.split("/");
  const yyyy = year.padStart(4, "0");
  const mm = month.padStart(2, "0");
  const dd = day.padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function toIsoDateTime(dateString: string, timeString: string): string {
  return `${toIsoDate(dateString)}T${timeString}`;
}

export const metadata: Metadata = {
  title: "What's On | The Sentinel",
  description:
    "Discover upcoming events and activities in the Clarence Town area. Find dates, times, and details for community events.",
};

async function EventName({ event }: { event: EventData }) {
  if (!event.acf.published_article) {
    return (
      <h3 className="text-[17px] font-inter font-semibold">
        {event.acf.event_name}
      </h3>
    );
  }

  const postSlug = extractSlugFromWordPressUrl(event.acf.published_article);
  if (!postSlug) {
    return (
      <h3 className="text-[17px] font-inter font-semibold">
        {event.acf.event_name}
      </h3>
    );
  }

  const categorySlug = await getCategorySlugFromPost(postSlug);
  if (!categorySlug) {
    return (
      <h3 className="text-[17px] font-inter font-semibold">
        {event.acf.event_name}
      </h3>
    );
  }

  return (
    <h3 className="text-[17px] font-inter font-semibold">
      <Link
        href={`/${categorySlug}/${postSlug}`}
        className="font-inter text-teal flex gap-2 items-center desktop:hover:opacity-80"
      >
        {event.acf.event_name}
        <Image src="/icons/external-link.svg" alt="" width={20} height={20} />
      </Link>
    </h3>
  );
}

export default async function CalendarPage() {
  const events = await fetchEvents();
  /* const adData = await fetchAdData(); */

  return (
    <PageWrapper cssClasses="my-10">
      <main>
        {/* <div className="min-h-[500px] space-y-10 desktop:grid grid-cols-[1fr_250px] gap-x-10"> */}
        <div className="min-h-[500px] space-y-10">
          <div className="space-y-10">
            <h2 className="text-36px font-inter font-bold mb-10">Calendar</h2>
            {events.length === 0 ? (
              <div className="w-full h-full min-h-[300px] flex items-center justify-center">
                <p className="text-18px">No upcoming events at this time.</p>
              </div>
            ) : (
              <ul className="space-y-5">
                {events.map((event, index) => (
                  <li
                    key={index}
                    className={classNames(
                      "grid phone:grid-cols-2 phone:justify-between phone:items-center gap-5",
                      {
                        "border-b border-black/25 pb-5":
                          index !== events.length - 1,
                      }
                    )}
                  >
                    <div className="space-y-2">
                      <EventName event={event} />
                      <p className="text-[17px] font-inter">
                        {event.acf.event_venue}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p>
                        <time
                          className="text-16px font-inter"
                          dateTime={toIsoDate(event.acf.event_date)}
                        >
                          {formatDate(event.acf.event_date)}
                        </time>
                      </p>
                      <p>
                        <time
                          className="text-16px font-inter"
                          dateTime={toIsoDateTime(
                            event.acf.event_date,
                            event.acf.event_start_time
                          )}
                        >
                          {formatTime(event.acf.event_start_time)}
                        </time>
                        {" - "}
                        <time
                          className="text-16px font-inter"
                          dateTime={toIsoDateTime(
                            event.acf.event_date,
                            event.acf.event_end_time
                          )}
                        >
                          {formatTime(event.acf.event_end_time)}
                        </time>
                      </p>
                    </div>
                    {event.acf.event_description && (
                      <p className="phone:col-span-2">
                        {event.acf.event_description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* <div className="hidden desktop:flex flex-col gap-10">
          <AdSpaceSquare
            src={
              adData?.image_square_primary ||
              "/images/placeholders/ads/square-ad.png"
            }
            alt={adData?.company_name_square_primary || "Advertisement"}
            url={adData?.link_square_primary || "#"}
          />
          <AdSpaceSquare
            src={
              adData?.image_square_secondary ||
              "/images/placeholders/ads/square-ad.png"
            }
            alt={adData?.company_name_square_secondary || "Advertisement"}
            url={adData?.link_square_secondary || "#"}
          />
        </div> */}
        </div>
      </main>
    </PageWrapper>
  );
}
