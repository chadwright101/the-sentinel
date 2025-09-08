import Image from "next/image";
import Link from "next/link";

import ButtonLink from "@/_components/ui/buttons/button-link";

import navData from "@/_data/nav-data.json";

const FooterComponent = () => {
  return (
    <footer className="bg-teal relative z-20 mt-10 desktop:mt-[100px]">
      <div className="max-w-[1100px] mx-auto px-5 py-10 desktop:grid grid-cols-[1fr_551] desktop:pt-[100px] desktop:pb-[90px] desktop:px-10">
        <div className="flex flex-col gap-[30px] desktop:gap-10">
          <Image
            src="/logo/the-sentinel-logo.svg"
            alt="The Sentinel logo"
            width={450}
            height={100}
            sizes="(max-width: 1100px) 335px, 450px"
            className="w-[335px] h-auto desktop:w-[450px]"
          />
          <div className="flex flex-col gap-5">
            <div>
              <h4 className="text-12px font-inter font-bold grid text-white desktop:text-16px">
                Proudly Covering:
              </h4>
              <h5 className="text-12px font-inter font-medium text-white w-[230px] desktop:text-16px desktop:w-[310px]">
                Kilcoy, Woolmar, Neurum, Woodford, Wamuran ,Hazeldean,
                Toogoolawah Esk, Lowood, Fernvale
              </h5>
            </div>
            <div className="flex flex-col gap-[30px] place-items-start desktop:gap-5">
              <p className="font-bold font-inter text-white">Follow us on:</p>
              <Link
                href="https://www.facebook.com/TheSentinelNews"
                target="_blank"
              >
                <Image
                  src="/icons/facebook-icon-white.svg"
                  alt="Follow us on Facebook"
                  width={30}
                  height={40}
                />
              </Link>
            </div>
          </div>
        </div>
        <nav className="hidden desktop:flex justify-between">
          {Array.from({ length: 3 }, (_, columnIndex) => {
            const startIndex = Math.floor(navData.length / 3) * columnIndex;
            const endIndex = Math.floor(navData.length / 3) * (columnIndex + 1);
            const columnItems = navData.slice(
              startIndex,
              columnIndex === 2 ? navData.length : endIndex
            );

            return (
              <div key={columnIndex} className="flex flex-col gap-[30px]">
                {columnItems.map((item, index) => (
                  <div key={index} className="flex flex-col gap-[30px]">
                    {item.url ? (
                      <Link
                        href={item.url}
                        className="text-white font-inter font-medium p-1 -m-1 uppercase desktop:hover:text-light-brown desktop:p-0 desktop:m-0"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <span className="text-white font-bold p-1 -m-1 uppercase desktop:p-0 desktop:m-0">
                        {item.title}:
                      </span>
                    )}
                    {item.children && (
                      <div className="flex flex-col gap-[30px]">
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={child.url}
                            className="text-white flex gap-2 items-center font-inter font-medium p-1 -m-1 uppercase desktop:hover:text-light-brown desktop:p-0 desktop:m-0"
                          >
                            <Image
                              src="/icons/chevron-white.svg"
                              alt=""
                              width={6}
                              height={12}
                            />
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </nav>
        <div className="flex justify-between items-center mt-[30px] desktop:mt-10 desktop:col-span-2">
          <p className="text-white font-inter uppercase text-12px font-medium desktop:text-16px">
            © {new Date().getFullYear()} The Sentinel News |{" "}
            <Link
              href="#"
              target="_blank"
              className="text-white uppercase font-inter text-12px font-medium p-1 -m-1 desktop:hover:text-light-brown desktop:p-0 desktop:m-0 desktop:text-16px"
            >
              Standards & Complaints
            </Link>{" "}
            |{" "}
            <Link
              href="#"
              target="_blank"
              className="text-white uppercase font-inter text-12px font-medium p-1 -m-1 desktop:hover:text-light-brown desktop:p-0 desktop:m-0 desktop:text-16px"
            >
              Terms
            </Link>{" "}
            |{" "}
            <Link
              href="#"
              target="_blank"
              className="text-white uppercase font-inter text-12px font-medium p-1 -m-1 desktop:hover:text-light-brown desktop:p-0 desktop:m-0 desktop:text-16px"
            >
              Privacy Policy
            </Link>
          </p>
          <ButtonLink cssClasses="hidden desktop:block">Subscribe</ButtonLink>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
