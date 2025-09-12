export interface EventData {
  acf: {
    event_name: string;
    event_venue: string;
    event_date: string;
    event_start_time: string;
    event_end_time: string;
    published_article?: string;
  };
}

export interface CalendarProps {
  events: EventData[];
}
