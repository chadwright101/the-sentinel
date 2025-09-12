import { PostProps } from "./post-types";
import { AdData } from "./ad-types";

export default interface PostGridProps {
  posts: PostProps[];
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  adData?: AdData | null;
}
