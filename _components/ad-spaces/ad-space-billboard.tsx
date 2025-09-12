import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { AdProps } from "../../_types/ad-types";
import AdFallback from "./ad-fallback";

const AdSpaceBillboard = ({ src, alt, url, cssClasses }: AdProps) => {
  if (!src) {
    return (
      <AdFallback
        aspectRatio="4/1"
        cssClasses={classNames("w-full", cssClasses)}
      />
    );
  }

  return (
    <Link href={url} target="_blank" aria-label={alt} className={cssClasses}>
      <Image
        src={src}
        alt={alt}
        width={900}
        height={150}
        className="object-cover aspect-[4/1] w-full"
      />
    </Link>
  );
};

export default AdSpaceBillboard;
