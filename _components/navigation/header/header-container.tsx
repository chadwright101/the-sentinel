"use client";

import { useEffect, useState } from "react";

import classNames from "classnames";

import { HeaderComponent } from "./header-component";
import SlideOutNavComponent from "./slide-out-nav-component";
import useScrollPosition from "@/_lib/hooks/scroll-position";

import navData from "@/_data/nav-data.json";

export default function HeaderContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (scrollPosition > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
      setIsOpen(false);
    }
  }, [scrollPosition]);

  return (
    <header
      className={classNames(
        "w-full mx-auto z-50 h-[100px] bg-teal desktop:border-b-2 border-white desktop:sticky desktop:h-[250px] ease-in-out duration-300",
        {
          "desktop:-top-[100px]": isScrolled,
          "desktop:top-0": !isScrolled,
        }
      )}
    >
      <HeaderComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navData={navData}
        isScrolled={isScrolled}
      />
      <SlideOutNavComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navData={navData}
        isScrolled={isScrolled}
      />
    </header>
  );
}
