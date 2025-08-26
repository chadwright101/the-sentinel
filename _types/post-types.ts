export interface PostProps {
  id: number;
  date: string;
  status: string;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  class_list: string[];
  jetpack_featured_media_url: string;
}
