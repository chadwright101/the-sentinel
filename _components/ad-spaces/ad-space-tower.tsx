import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { AdProps } from "@/_types/ad-types";
import AdFallback from "./ad-fallback";

const AdSpaceTower = ({ src, alt, url, cssClasses }: AdProps) => {
  if (!src) {
    return (
      <AdFallback cssClasses={classNames("w-full aspect-[1/2]", cssClasses)} />
    );
  }

  return (
    <Link
      href={url}
      target="_blank"
      aria-label={alt}
      className={classNames("desktop:hover:opacity-85", cssClasses)}
    >
      <Image
        src={src}
        alt={alt}
        width={300}
        height={600}
        className="object-cover w-full aspect-[1/2]"
      />
    </Link>
  );
};

export default AdSpaceTower;
