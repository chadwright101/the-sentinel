import Image from "next/image";
import Link from "next/link";

import classNames from "classnames";

import LogoComponent from "@/_lib/utils/logo-component";

import { HeaderDataProps, HeaderProps } from "@/_types/menu-types";
import DesktopNavComponent from "./desktop-nav-component";

export function HeaderComponent({
  navData,
  isOpen,
  setIsOpen,
}: HeaderDataProps & HeaderProps) {
  return (
    <div className="flex relative justify-center h-full w-full px-5 max-w-[1776px] mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-5 top-1/2 -m-3 p-3 -translate-y-1.5 cursor-pointer desktop:left-10 desktop:hover:scale-[105%] duration-300 ease-in-out"
        aria-label="Open menu"
      >
        <Image
          src={isOpen ? "/icons/menu-close.svg" : "/icons/menu-open.svg"}
          alt="Open menu"
          width={60}
          height={30}
          className={classNames("h-auto", {
            "w-[30px] desktop:w-[60px]": !isOpen,
            "w-[24px] -translate-y-0.5 translate-x-0.5 desktop:-translate-y-2 desktop:translate-x-1 desktop:w-[50px]":
              isOpen,
          })}
        />
      </button>
      <div className="flex flex-col items-center gap-6 justify-center desktop:justify-stretch">
        <Link
          href="/"
          className="flex gap-1 items-center desktop:hover:opacity-90 ease-in-out duration-300"
        >
          <LogoComponent />
        </Link>
        <DesktopNavComponent navData={navData} />
      </div>
    </div>
  );
}
