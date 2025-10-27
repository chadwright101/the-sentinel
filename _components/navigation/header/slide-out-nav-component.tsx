"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import classNames from "classnames";
import { NavDataProps, HeaderProps } from "@/_types/menu-types";

const SlideOutNavComponent = ({
  isOpen,
  setIsOpen,
  navData,
  isScrolled,
}: HeaderProps & NavDataProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [windowWidth, setWindowWidth] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= 1259) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }

    return () => {
      if (windowWidth <= 1259) {
        document.body.style.overflow = "auto";
      }
    };
  }, [isOpen, windowWidth]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const isMenuButton = target.closest('button[aria-label="Open menu"]');

      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        !isMenuButton &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (!isOpen) {
      setExpandedItems({});
    }
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
      ref={navRef}
      className={classNames(
        "fixed w-full left-0 top-[100px] transform transition-transform duration-300 ease-in-out desktop:w-1/4 z-10",
        {
          "-translate-x-full": !isOpen,
          "desktop:top-[250px]": !isScrolled,
          "desktop:top-[150px]": isScrolled,
        }
      )}
    >
      <div className="bg-beige h-screen">
        <nav
          className={classNames(
            "px-5 pt-7 pb-20 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar",
            {
              "desktop:max-h-[calc(100vh-250px)]": !isScrolled,
              "desktop:max-h-[calc(100vh-150px)]": isScrolled,
            }
          )}
        >
          <ul className="mobile-menu-spacing">
            {navData.map(({ title, url, children }, index) => {
              const isExpanded = expandedItems[index] || false;
              const hasChildren = children && children.length > 0;

              return (
                <li key={index} className="space-y-5">
                  <div
                    className={classNames({
                      "mobile-menu-heading w-full flex items-center":
                        hasChildren,
                    })}
                  >
                    {hasChildren ? (
                      <span
                        onClick={() => toggleExpand(index)}
                        className="text-teal font-inter font-bold uppercase shrink-0 block place-self-start mobile-menu-heading p-2 -m-2 cursor-pointer desktop:p-0 desktop:m-0"
                      >
                        {title}
                      </span>
                    ) : (
                      <Link
                        href={url!}
                        onClick={() => {
                          setIsOpen(false);
                          setExpandedItems({});
                        }}
                        className="text-teal font-inter font-bold uppercase shrink-0 block place-self-start mobile-menu-heading p-2 -m-2 desktop:p-0 desktop:m-0 desktop:hover:text-dark-brown"
                      >
                        {title}
                      </Link>
                    )}
                    {hasChildren && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className="py-2 -my-2 pr-2 -mr-2 w-full flex justify-end desktop:hover:cursor-pointer desktop:hover:opacity-80 ease-in-out duration-300"
                      >
                        <Image
                          src="/icons/chevron-teal.svg"
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
                      </button>
                    )}
                  </div>
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
                              onClick={() => {
                                setIsOpen(false);
                                setExpandedItems({});
                              }}
                              className="flex items-center gap-10 mobile-menu-subheading text-teal font-inter font-medium uppercase -translate-y-[0.75px] place-self-start p-2 -m-2 desktop:p-0 desktop:m-0 desktop:hover:text-dark-brown"
                            >
                              <Image
                                src="/icons/chevron-teal.svg"
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
            <li className="text-teal font-inter font-bold uppercase flex items-center gap-5 mobile-menu-facebook-icon mobile-menu-subheading desktop:mt-2">
              Follow us on:
              <Link
                href="https://www.facebook.com/TheSentinelNews"
                target="_blank"
              >
                <Image
                  src="/icons/facebook-icon-teal.svg"
                  alt="Follow us on Facebook"
                  width={40}
                  height={40}
                  className="-translate-y-0.5 desktop:hover:scale-105 ease-in-out duration-300 desktop:w-7 desktop:h-auto"
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SlideOutNavComponent;
