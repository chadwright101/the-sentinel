import classNames from "classnames";
import { PostProps } from "@/_types/post-types";
import truncateText from "../truncate-text";

const PostGridExcerpt = ({
  post,
  maxLength,
  cssClasses,
}: {
  post: PostProps;
  maxLength: number;
  cssClasses?: string;
}) => (
  <p
    className={classNames(
      "text-12px font-normal font-newsreader tablet:text-16px text-black",
      cssClasses
    )}
  >
    {truncateText(post.content.rendered, maxLength)}
  </p>
);

export default PostGridExcerpt;
