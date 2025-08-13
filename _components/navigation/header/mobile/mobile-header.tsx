"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import navData from "@/_data/nav-data.json";
import classNames from "classnames";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="relative desktop:hidden">
      <div className="flex relative justify-center w-full px-5 h-[100px] bg-teal">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute left-5 top-1/2 -m-3 p-3 -translate-y-1.5"
          aria-label="Open menu"
        >
          <Image
            src={isOpen ? "/icons/menu-close.svg" : "/icons/menu-open.svg"}
            alt="Open menu"
            width={30}
            height={15}
            className={classNames({
              "w-[24px] -translate-y-0.5 translate-x-0.5": isOpen,
            })}
          />
        </button>
        <Link href="/" className="flex gap-1 items-center">
          <Image
            src="/logo/the-sentinel-logo.svg"
            alt="The Sentinel logo"
            width={200}
            height={38}
            priority
            className="h-auto w-[150px] min-[350px]:w-[200px]"
          />
        </Link>
      </div>

      {/* Slide-out Menu */}
      <div
        className={classNames(
          "fixed w-full left-0 top-[100px] transform transition-transform duration-300 ease-in-out",
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
                    <button
                      onClick={() => toggleExpand(index)}
                      className="mobile-menu-heading text-teal font-inter font-bold uppercase w-full flex justify-between items-center"
                    >
                      {title}
                      <Image
                        src="/icons/chevron.svg"
                        alt=""
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
                  ) : url ? (
                    <Link
                      href={url}
                      onClick={() => setIsOpen(false)}
                      className="text-teal font-inter font-bold uppercase block place-self-start mobile-menu-heading"
                    >
                      {title}
                    </Link>
                  ) : (
                    <p
                      onClick={() => setIsOpen(false)}
                      className="text-teal font-inter font-bold uppercase block place-self-start mobile-menu-heading"
                    >
                      {title}
                    </p>
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
                              className="flex items-center gap-[10px] mobile-menu-subheading text-teal font-inter font-medium uppercase -translate-y-[0.75px] p-2 -m-2 place-self-start"
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
                  className="-translate-y-0.5"
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
