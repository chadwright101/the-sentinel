"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import useScrollPosition from "@/_lib/hooks/scroll-position";
import classNames from "classnames";
import Link from "next/link";

const LayoutAdSpaceComponent = () => {
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
      <Link
        href="#"
        target="_blank"
        referrerPolicy="no-referrer"
        className="w-full max-w-[728px] mx-7 mt-7 flex justify-center desktop:mx-0 desktop:mt-[50px] desktop:hover:opacity-85"
      >
        <Image
          src="/images/placeholders/ads/top-ad.png"
          alt="Advertisement"
          width={728}
          height={90}
          sizes="(max-width: 750px) 100vw, 728px"
          className="w-full h-auto max-w-[728px]"
        />
      </Link>
      <Link
        href="#"
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
          src="/images/placeholders/ads/side-ad.png"
          alt="Advertisement"
          width={300}
          height={1050}
          className="h-[calc(100vh-150px)] w-auto"
        />
      </Link>
      <Link
        href="#"
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
          src="/images/placeholders/ads/side-ad.png"
          alt="Advertisement"
          width={300}
          height={1050}
          className="h-[calc(100vh-150px)] w-auto"
        />
      </Link>
    </div>
  );
};

export default LayoutAdSpaceComponent;
