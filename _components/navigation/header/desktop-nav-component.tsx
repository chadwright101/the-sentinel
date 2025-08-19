"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import classNames from "classnames";

import { NavDataProps } from "@/_types/menu-types";

const DesktopNavComponent = ({ navData }: NavDataProps) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <nav className="relative">
      <ul className="flex gap-[30px] items-center">
        {navData.map(({ title, url, children }, index) => {
          const hasChildren = children && children.length > 0;
          return (
            <li
              key={index}
              className="text-white font-inter font-medium uppercase relative"
              onMouseEnter={() => hasChildren && setHoveredItem(index)}
              onMouseLeave={() => hasChildren && setHoveredItem(null)}
            >
              {url ? (
                <Link
                  href={url}
                  className="text-white font-inter hover:text-light-brown ease-in-out duration-300"
                >
                  {title}
                </Link>
              ) : (
                <span
                  className={classNames(
                    "text-white font-medium hover:text-light-brown hover:cursor-pointer",
                    {
                      "pb-5 pr-5 -mr-5": hoveredItem === index,
                    }
                  )}
                >
                  {title}
                </span>
              )}
              {hasChildren && (
                <div
                  className={classNames(
                    "absolute top-full left-0 mt-4 w-max min-w-[180px] bg-white/85 shadow-lg rounded-b-md overflow-hidden transition-all duration-300 delay-75 ease-in-out origin-top transform",
                    {
                      "opacity-0 invisible max-h-0 scale-y-0":
                        hoveredItem !== index,
                      "opacity-100 visible max-h-96 scale-y-100":
                        hoveredItem === index,
                    }
                  )}
                >
                  <ul className="px-3 py-4 grid gap-2.5">
                    {children!.map((child, childIndex) => (
                      <li key={childIndex}>
                        <Link
                          href={child.url}
                          className="flex items-center font-inter gap-2 normal-case hover:text-dark-brown ease-in-out duration-300 place-self-start"
                        >
                          <Image
                            src="/icons/chevron-teal.svg"
                            alt="open submenu"
                            width={6}
                            height={10}
                          />
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DesktopNavComponent;
