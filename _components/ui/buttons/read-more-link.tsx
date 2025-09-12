import Link from "next/link";
import classNames from "classnames";
import { PostProps } from "@/_types/post-types";

const ReadMoreLink = ({
  post,
  categorySlug,
  parentCategorySlug,
  className,
}: {
  post: PostProps;
  categorySlug: string;
  parentCategorySlug?: string;
  className?: string;
}) => {
  const href = parentCategorySlug
    ? `/${parentCategorySlug}/${categorySlug}/${post.slug}`
    : `/${categorySlug}/${post.slug}`;

  return (
    <Link
      href={href}
      className={classNames(
        "text-blue p-2 -m-2 font-newsreader text-12px ease-in-out duration-300 desktop:p-0 desktop:m-0 desktop:hover:text-dark-brown",
        className
      )}
    >
      Read More
    </Link>
  );
};

export default ReadMoreLink;
