import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { AdProps } from "../../_types/ad-types";
import AdFallback from "./ad-fallback";

const AdSpaceTower = ({ src, alt, url, cssClasses }: AdProps) => {
  if (!src) {
    return (
      <AdFallback
        aspectRatio="1/2"
        cssClasses={classNames("w-full", cssClasses)}
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
        className="object-cover w-full aspect-[1/2]"
      />
    </Link>
  );
};

export default AdSpaceTower;
