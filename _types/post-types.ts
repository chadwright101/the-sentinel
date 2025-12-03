export interface Author {
  id: number;
  name: string;
  url: string;
  description: string;
  avatar_urls: {
    [key: string]: string;
  };
}

export interface EmbeddedData {
  author: Author[];
}

export interface PostProps {
  id: number;
  date: string;
  status: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf?: {
    subheading?: string;
  };
  class_list: string[];
  jetpack_featured_media_url: string;
  _embedded?: EmbeddedData;
}
