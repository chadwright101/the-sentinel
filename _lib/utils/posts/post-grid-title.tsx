import classNames from "classnames";
import { PostProps } from "@/_types/post-types";

const PostGridTitle = ({
  post,
  index,
  hoveredIndex,
  cssClasses,
}: {
  post: PostProps;
  index: number;
  hoveredIndex: number | null;
  cssClasses?: string;
}) => (
  <h3
    className={classNames(
      "font-inter font-bold text-18px desktop:text-20px ease-in-out duration-300 delay-75",
      cssClasses,
      {
        "desktop:hover:opacity-90": hoveredIndex === index,
      }
    )}
  >
    {post.title.rendered}
  </h3>
);

export default PostGridTitle;
