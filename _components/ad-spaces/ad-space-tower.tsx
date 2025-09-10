import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { AdProps } from "../../_types/ad-types";
import AdFallback from "./ad-fallback";

const AdSpaceTower = ({ src, alt, url, cssClasses }: AdProps) => {
  const isPlaceholder = src.includes("/placeholders/") || !src;

  if (isPlaceholder) {
    return (
      <AdFallback
        aspectRatio="1/2"
        className={classNames("w-full", cssClasses)}
      />
    );
  }

  return (
    <Link href={url} target="_blank" aria-label={alt} className={cssClasses}>
      <Image
        src={src}
        alt={alt}
        width={300}
        height={600}
        className="object-cover w-full aspect-[1/2] border-4 border-[#FF5C00]"
      />
    </Link>
  );
};

export default AdSpaceTower;
