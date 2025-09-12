"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import useScrollPosition from "@/_lib/hooks/scroll-position";
import classNames from "classnames";
import Link from "next/link";
import { AdData } from "@/_types/ad-types";
import AdFallback from "./ad-fallback";

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
      {adData?.image_banner ? (
        <Link
          href={adData.link_banner || "#"}
          target="_blank"
          referrerPolicy="no-referrer"
          className="w-full mx-5 max-w-[900px] min-[940px]:mx-0 mt-7 flex justify-center desktop:mx-0 desktop:mt-[50px] desktop:hover:opacity-85"
        >
          <Image
            src={adData.image_banner}
            alt={adData.company_name_banner || "Advertisement"}
            width={900}
            height={150}
            sizes="(max-width: 750px) 100vw, 900px"
            className="aspect-[6/1] object-cover h-full w-full"
          />
        </Link>
      ) : (
        <div className="w-full max-w-[900px] mt-7 flex justify-center desktop:mx-0 desktop:mt-[50px]">
          <AdFallback aspectRatio="6/1" cssClasses="max-w-[900px] w-full" />
        </div>
      )}

      {/* tower left - ratio 1/4 */}
      {adData?.image_tower_left ? (
        <Link
          href={adData.link_tower_left || "#"}
          target="_blank"
          referrerPolicy="no-referrer"
          className={classNames(
            "hidden min-[calc(1300px+52vh)]:block fixed left-24 desktop:hover:opacity-85",
            {
              "top-[150px]": isScrolled,
              "top-[250px]": !isScrolled,
            }
          )}
        >
          <Image
            src={adData.image_tower_left}
            alt={adData.company_name_tower_left || "Advertisement"}
            width={300}
            height={1200}
            className="h-[calc(100vh-152px)] aspect-[1/4] object-cover w-auto"
          />
        </Link>
      ) : (
        <AdFallback
          aspectRatio="1/4"
          cssClasses={classNames(
            "hidden min-[calc(1300px+52vh)]:block h-screen fixed left-24",
            {
              "top-[150px]": isScrolled,
              "top-[250px]": !isScrolled,
            }
          )}
        />
      )}

      {/* tower right - ratio 1/4 */}
      {adData?.image_tower_right ? (
        <Link
          href={adData.link_tower_right || "#"}
          target="_blank"
          referrerPolicy="no-referrer"
          className={classNames(
            "hidden min-[calc(1300px+52vh)]:block fixed right-24 desktop:hover:opacity-85",
            {
              "top-[150px]": isScrolled,
              "top-[250px]": !isScrolled,
            }
          )}
        >
          <Image
            src={adData.image_tower_right}
            alt={adData.company_name_tower_right || "Advertisement"}
            width={300}
            height={1200}
            className="h-[calc(100vh-150px)] aspect-[1/4] object-cover w-auto"
          />
        </Link>
      ) : (
        <AdFallback
          aspectRatio="1/4"
          cssClasses={classNames(
            "hidden min-[calc(1300px+52vh)]:block h-[calc(100vh-150px)] fixed right-24",
            {
              "top-[150px]": isScrolled,
              "top-[250px]": !isScrolled,
            }
          )}
        />
      )}
    </div>
  );
};

export default LayoutAdSpaceComponent;
