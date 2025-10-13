"use client";

import { useState } from "react";
import Image from "next/image";
import generalData from "@/_data/general-data.json";
import classNames from "classnames";

const DistributionAccordion = () => {
  const [openRegion, setOpenRegion] = useState<string>("Beachmere");

  const distribution = generalData.aboutPage.distribution;

  const toggleRegion = (regionName: string) => {
    setOpenRegion(openRegion === regionName ? "" : regionName);
  };

  return (
    <div className="mt-15">
      <h3 className="text-20px font-inter font-bold mb-5">
        Where to pick up a copy
      </h3>
      <div className="space-y-2">
        {distribution.map((region) => {
          const regionName = Object.keys(region)[0];
          const locations = region[regionName as keyof typeof region] || [];
          const isOpen = openRegion === regionName;

          return (
            <div
              key={regionName}
              className="border border-black/25 rounded-md overflow-hidden"
            >
              <button
                onClick={() => toggleRegion(regionName)}
                className="w-full px-4 py-2.5 bg-white flex items-center justify-between text-left desktop:hover:bg-beige desktop:hover:cursor-pointer transition-colors duration-300 ease-in-out"
              >
                <span className="text-16px font-inter font-semibold">
                  {regionName}
                </span>
                <div
                  className={`transform rotate-90 transition-transform duration-300 ease-in-out ${
                    isOpen ? "rotate-270" : ""
                  }`}
                >
                  <Image
                    src="/icons/chevron-teal.svg"
                    alt="Expand"
                    width={8}
                    height={8}
                  />
                </div>
              </button>
              <ul
                className={classNames(
                  "space-y-1 px-4 py-2.5 list-disc list-inside scrollbar-thin scrollbar-thumb-teal/75 scrollbar-track-beige/10",
                  {
                    "max-h-72 overflow-y-auto": isOpen,
                    hidden: !isOpen,
                  }
                )}
              >
                {locations.map((location, index) => (
                  <li key={index} className="text-16px font-inter">
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DistributionAccordion;
