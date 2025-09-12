import Image from "next/image";
import classNames from "classnames";
import { PostProps } from "@/_types/post-types";

const PostGridImage = ({
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
  <div className="overflow-hidden place-self-start">
    <Image
      src={post.jetpack_featured_media_url}
      alt={post.title.rendered}
      width={800}
      height={600}
      sizes="(max-width:600px) 100vw, (max-width:1100px) 50vw, 500px"
      className={classNames("object-cover", cssClasses, {
        "desktop:hover:scale-[102%] ease-in-out duration-300 delay-75":
          hoveredIndex === index,
      })}
    />
  </div>
);

export default PostGridImage;
