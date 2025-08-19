import Image from "next/image";
import Link from "next/link";

import classNames from "classnames";

import LogoComponent from "@/_lib/utils/logo-component";
import DesktopNavComponent from "./desktop-nav-component";

import { NavDataProps, HeaderProps } from "@/_types/menu-types";

export function HeaderComponent({
  navData,
  isOpen,
  setIsOpen,
  isScrolled,
}: NavDataProps & HeaderProps) {
  return (
    <div className="flex relative justify-center items-center h-full w-full px-5 max-w-[1210px] mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          "absolute left-5 -m-3 p-3 cursor-pointer desktop:left-10 desktop:hover:scale-[105%] duration-300 ease-in-out desktop:-translate-y-3 delay-75",
          {
            "top-1/2": isScrolled,
            "desktop:-top-10": !isScrolled,
          }
        )}
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
          className={classNames(
            "flex gap-1 justify-center items-center desktop:hover:opacity-90 ease-in-out duration-300 delay-[50ms]",
            {
              "desktop:-translate-y-[250px] desktop:h-[150px]": isScrolled,
            }
          )}
        >
          <LogoComponent />
        </Link>
        <div
          className={classNames(
            "hidden desktop:block ease-in-out duration-500",
            {
              "opacity-100": !isScrolled,
              "opacity-0 -translate-y-[250px]": isScrolled,
            }
          )}
        >
          <DesktopNavComponent navData={navData} />
        </div>
      </div>
      <Link
        href="/"
        className={classNames(
          "hidden desktop:block absolute right-10 hover:opacity-90 delay-75",
          {
            "top-1/2 -translate-y-3": isScrolled,
            "-top-10": !isScrolled,
          }
        )}
      >
        <Image
          src="/logo/the-sentinel-logo.svg"
          alt="The Sentinel logo"
          width={200}
          height={60}
        />
      </Link>
    </div>
  );
}
