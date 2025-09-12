import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { AdProps } from "@/_types/ad-types";
import AdFallback from "./ad-fallback";

const AdSpaceSquare = ({ src, alt, url, cssClasses }: AdProps) => {
  if (!src) {
    return (
      <AdFallback
        aspectRatio="1/1"
        cssClasses={classNames("w-full", cssClasses)}
      />
    );
  }

  return (
    <Link href={url} target="_blank" aria-label={alt} className={cssClasses}>
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
