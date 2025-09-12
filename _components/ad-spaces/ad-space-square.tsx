import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { AdProps } from "@/_types/ad-types";
import AdFallback from "./ad-fallback";

const AdSpaceSquare = ({ src, alt, url, cssClasses }: AdProps) => {
  if (!src) {
    return (
      <AdFallback cssClasses={classNames("w-full aspect-square", cssClasses)} />
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
        width={500}
        height={500}
        className="object-cover aspect-square w-full"
      />
    </Link>
  );
};

export default AdSpaceSquare;
