"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import useScrollPosition from "@/_lib/hooks/scroll-position";
import classNames from "classnames";
import Link from "next/link";
import { AdData } from "@/_types/ad-types";

interface LayoutAdSpaceProps {
  adData: AdData | null;
}

const LayoutAdSpaceComponent = ({ adData }: LayoutAdSpaceProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (scrollPosition > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, [scrollPosition]);

  return (
    <div className="w-full relative flex justify-center max-w-[1920px] mx-auto">
      {/* banner - ratio 6/1 */}
      <Link
        href={adData?.link_banner || "#"}
        target="_blank"
        referrerPolicy="no-referrer"
        className="w-full max-w-[900px] px-7 mt-7 flex justify-center desktop:mx-0 desktop:mt-[50px] desktop:hover:opacity-85"
      >
        <Image
          src={
            adData?.image_banner || "/images/placeholders/ads/top-ad-large.png"
          }
          alt={adData?.company_name_banner || "Advertisement"}
          width={900}
          height={150}
          sizes="(max-width: 750px) 100vw, 900px"
          className="aspect-[6/1] object-cover max-w-[900px] border-4 border-[#FF5C00]"
        />
      </Link>

      {/* tower left - ratio 1/4 */}
      <Link
        href={adData?.link_tower_left || "#"}
        target="_blank"
        referrerPolicy="no-referrer"
        className={classNames(
          "hidden min-[calc(1300px+52vh)]:block fixed left-24 desktop:hover:opacity-85 border-4 border-[#FF5C00]",
          {
            "top-[150px]": isScrolled,
            "top-[250px]": !isScrolled,
          }
        )}
      >
        <Image
          src={
            adData?.image_tower_left || "/images/placeholders/ads/side-ad.png"
          }
          alt={adData?.company_name_tower_left || "Advertisement"}
          width={300}
          height={1200}
          className="h-[calc(100vh-150px)] aspect-[1/4] object-cover w-auto"
        />
      </Link>

      {/* tower right - ratio 1/4 */}
      <Link
        href={adData?.link_tower_right || "#"}
        target="_blank"
        referrerPolicy="no-referrer"
        className={classNames(
          "hidden min-[calc(1300px+52vh)]:block fixed right-24 desktop:hover:opacity-85 border-4 border-[#FF5C00]",
          {
            "top-[150px]": isScrolled,
            "top-[250px]": !isScrolled,
          }
        )}
      >
        <Image
          src={
            adData?.image_tower_right || "/images/placeholders/ads/side-ad.png"
          }
          alt={adData?.company_name_tower_right || "Advertisement"}
          width={300}
          height={1200}
          className="h-[calc(100vh-150px)] aspect-[1/4] object-cover w-auto"
        />
      </Link>
    </div>
  );
};

export default LayoutAdSpaceComponent;
