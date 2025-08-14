"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import classNames from "classnames";
import { HeaderDataProps, HeaderProps } from "@/_types/menu-types";

const SlideOutNavComponent = ({
  isOpen,
  setIsOpen,
  navData,
}: HeaderProps & HeaderDataProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) => {
      const isCurrentlyExpanded = prev[id];

      if (isCurrentlyExpanded) {
        return {
          ...prev,
          [id]: false,
        };
      }

      const newExpandedItems: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => {
        newExpandedItems[Number(key)] = false;
      });
      newExpandedItems[id] = true;

      return newExpandedItems;
    });
  };

  return (
    <div
      className={classNames(
        "fixed w-full left-0 top-[100px] transform transition-transform duration-300 ease-in-out desktop:top-[250px] desktop:w-1/4",
        {
          "-translate-x-full": !isOpen,
        }
      )}
    >
      <nav className="px-5 py-7 h-screen bg-beige">
        <ul className="mobile-menu-spacing">
          {navData.map(({ title, url, children }, index) => {
            const isExpanded = expandedItems[index] || false;
            const hasChildren = children && children.length > 0;

            return (
              <li key={index} className="space-y-5">
                {hasChildren ? (
                  <div className="w-full flex justify-between items-center">
                    <button
                      onClick={() => toggleExpand(index)}
                      className="mobile-menu-heading text-teal font-inter font-bold uppercase cursor-pointer p-2 -m-2 desktop:p-0 desktop:m-0 desktop:hover:text-dark-brown ease-in-out duration-300"
                    >
                      {title}
                    </button>
                    <Image
                      src="/icons/chevron.svg"
                      alt="open submenu"
                      width={8}
                      height={12}
                      className={classNames(
                        "transform transition-transform duration-300",
                        {
                          "rotate-90": isExpanded,
                        }
                      )}
                    />
                  </div>
                ) : (
                  <Link
                    href={url!}
                    onClick={() => setIsOpen(false)}
                    className="text-teal font-inter font-bold uppercase block place-self-start mobile-menu-heading p-2 -m-2 desktop:p-0 desktop:m-0 desktop:hover:text-dark-brown"
                  >
                    {title}
                  </Link>
                )}
                {hasChildren && (
                  <div
                    className={classNames(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      {
                        "max-h-0 opacity-0 -mt-5": !isExpanded,
                        "max-h-96 opacity-100": isExpanded,
                      }
                    )}
                  >
                    <ul className="mobile-menu-spacing">
                      {children!.map((child, index) => (
                        <li key={index}>
                          <Link
                            href={child.url}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-[10px] mobile-menu-subheading text-teal font-inter font-medium uppercase -translate-y-[0.75px] place-self-start p-2 -m-2 desktop:p-0 desktop:m-0 desktop:hover:text-dark-brown"
                          >
                            <Image
                              src="/icons/chevron.svg"
                              alt=""
                              width={8}
                              height={16}
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
          <li className="text-teal font-inter font-bold uppercase flex items-center gap-5 mobile-menu-facebook-icon mobile-menu-subheading">
            Follow us on:
            <Link
              href="https://www.facebook.com/HeatherHensleyInteriors"
              target="_blank"
            >
              <Image
                src="/icons/facebook-icon-teal.svg"
                alt="Follow us on Facebook"
                width={40}
                height={40}
                className="-translate-y-0.5 desktop:hover:scale-105 ease-in-out duration-300"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SlideOutNavComponent;
