"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { PostProps } from "@/_types/post-types";

import "swiper/css/pagination";
import "swiper/css";
import Link from "next/link";

interface Props {
  cssClasses?: string;
  data: PostProps[];
}

const HeroSlider = ({ cssClasses, data }: Props) => {
  console.log("Top Stories Slider data:", data);
  return (
    <Swiper
      autoplay={{
        delay: 6000,
        disableOnInteraction: true,
      }}
      spaceBetween={12}
      speed={1000}
      modules={[Autoplay, Pagination, Navigation]}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      loop
      style={
        {
          "--swiper-pagination-color": "#D8973C",
          "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "15px",
          "--swiper-pagination-bullet-horizontal-gap": "30px",
        } as React.CSSProperties
      }
      className={`${cssClasses} [&_.swiper-pagination-bullet]:!w-[15px] [&_.swiper-pagination-bullet]:!h-[15px] [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet]:!transform-none [&_.swiper-pagination-bullet]:!scale-100`}
    >
      {data.map((slide, index) => (
        <SwiperSlide key={slide.id} className="relative">
          <article className="w-full h-full">
            <Link
              href={`/latest-news/${slide.slug}`}
              className="desktop:hover:opacity-90 delay-75"
            >
              <div className="absolute bg-gradient-to-b from-45% to-80% to-black/50 w-full h-full" />
              <div className="absolute bottom-[70px] px-5 z-10 tablet:max-w-3/4 desktop:bottom-[55px]">
                <h2 className="text-white text-36px font-bold desktop:text-44px">
                  {slide.title.rendered}
                </h2>
                <div className="text-white [&_p]:text-white [&_p]:desktop:text-20px">
                  <p>
                    {slide.excerpt.rendered
                      .replace(/<[^>]*>/g, "")
                      .substring(0, 105)
                      .concat("...")}
                  </p>
                </div>
              </div>
              <Image
                src={slide.jetpack_featured_media_url}
                alt={slide.title.rendered}
                className="rounded-none w-full h-full object-cover"
                width={1920}
                height={600}
                loading={index < 1 ? "eager" : "lazy"}
                sizes="(max-width:1920px) 100vw, 1920px"
              />
            </Link>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
