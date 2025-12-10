"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import classNames from "classnames";
import { GallerySliderProps } from "@/_types/gallery-types";
import { useRef } from "react";
import getCleanImageUrl from "@/_lib/utils/get-clean-image-url";
import "swiper/css";
import "swiper/css/pagination";

export default function GallerySlider({
  images,
  galleryId,
  cssClasses,
}: GallerySliderProps) {
  const swiperRef = useRef<any>(null);

  if (!images || images.length === 0) {
    return null;
  }

  const shouldLoop = images.length > 1;
  const shouldAutoplay = images.length > 1;
  const hasAnyCaptions = images.some((img) => img.caption);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="relative w-[calc(100vw-55px)] max-w-[700px] mx-auto">
      <Swiper
        ref={swiperRef}
        autoplay={
          shouldAutoplay
            ? {
                delay: 4000,
                disableOnInteraction: true,
              }
            : false
        }
        spaceBetween={20}
        speed={800}
        modules={[Autoplay, Pagination]}
        loop={shouldLoop}
        slidesPerView={1}
        allowTouchMove={true}
        grabCursor={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        className={classNames("w-full mt-10", cssClasses)}
        style={{
          ["--swiper-pagination-color" as string]: "#064658",
          ["--swiper-pagination-bullet-inactive-color" as string]: "#064658",
          ["--swiper-pagination-bullet-inactive-opacity" as string]: 1,
          ["--swiper-pagination-bullet-size" as string]: "8px",
          ["--swiper-pagination-bullet-horizontal-gap" as string]: "4px",
          ["--swiper-pagination-bottom" as string]: hasAnyCaptions
            ? "78px"
            : "16px",
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={`${galleryId}-${index}`}
            className="relative w-full flex flex-col"
          >
            <div className="aspect-[4/3] relative bg-teal/10">
              <Image
                src={`${getCleanImageUrl(image.src)}?w=800&ssl=1`}
                alt={image.alt}
                fill
                sizes="(max-width: 799px) 800px, 900px"
                className="object-contain"
                unoptimized
              />
            </div>
            {image.caption && (
              <div
                dangerouslySetInnerHTML={{ __html: image.caption }}
                className="text-[13px] [&_p]:font-inter text-center max-w-[700px] mt-3 mx-auto text-black h-14"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 z-10 desktop:flex items-center justify-center w-10 h-10 rounded-full bg-teal/60 hover:bg-teal/80 text-white transition-colors desktop:hover:cursor-pointer"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="#ffffff"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 z-10 desktop:flex items-center justify-center w-10 h-10 rounded-full bg-teal/60 hover:bg-teal/80 text-white transition-colors desktop:hover:cursor-pointer"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="#ffffff"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
