"use client";

import { useState } from "react";

import { HeaderComponent } from "./header-component";

import navData from "@/_data/nav-data.json";
import SlideOutNavComponent from "./slide-out-nav-component";

export default function HeaderContainer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full mx-auto z-50 h-[100px] bg-teal desktop:h-[250px]">
      <HeaderComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navData={navData}
      />
      <SlideOutNavComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navData={navData}
      />
    </header>
  );
}
