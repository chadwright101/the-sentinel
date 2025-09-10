"use client";

import React, { useEffect, useRef } from "react";
import {
  AdSpaceBillboard,
  AdSpaceSquare,
} from "@/_components/home-page/home-page-categories/home-page-grid-base";

interface PostContentWithAdProps {
  content: string;
}

export default function PostContentWithAd({ content }: PostContentWithAdProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const wideAdRef = useRef<HTMLDivElement>(null);
  const squareAdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && wideAdRef.current && squareAdRef.current) {
      const paragraphs = contentRef.current.querySelectorAll("p");

      if (paragraphs.length <= 2) {
        const lastParagraph = paragraphs[paragraphs.length - 1];
        const wideAdElement = wideAdRef.current;
        const squareAdElement = squareAdRef.current;

        if (lastParagraph) {
          lastParagraph.parentNode?.insertBefore(
            wideAdElement,
            lastParagraph.nextSibling
          );
          lastParagraph.parentNode?.insertBefore(
            squareAdElement,
            wideAdElement.nextSibling
          );
        }
      } else {
        if (paragraphs.length >= 3) {
          const thirdParagraph = paragraphs[2];
          const wideAdElement = wideAdRef.current;

          thirdParagraph.parentNode?.insertBefore(
            wideAdElement,
            thirdParagraph.nextSibling
          );
        }

        if (paragraphs.length >= 6) {
          const sixthParagraph = paragraphs[5];
          const squareAdElement = squareAdRef.current;

          sixthParagraph.parentNode?.insertBefore(
            squareAdElement,
            sixthParagraph.nextSibling
          );
        }
      }
    }
  }, [content]);

  return (
    <div>
      <div
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: content }}
        className="text-14px grid gap-4 [&_ul]:list-disc [&_ul]:list-inside [&_ol]:list-disc [&_ol]:list-inside [&_a]:text-blue [&_a]:underline [&_a]:hover:text-blue/80 [&_h2]:text-24px [&_h2]:font-bold [&_h2]:mb-2 [&_h3]:text-20px [&_h3]:font-bold [&_h3]:mb-2 [&_h4]:text-18px [&_h4]:font-bold [&_h4]:mb-2 [h5_]:text-16px [&_h5]:font-bold [&_h5]:mb-2 &_figure]:my-6 [&_figcaption]:text-12px [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-teal [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 &_pre]:bg-beige [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_th]:border [&_th]:border-black [&_th]:p-2 [&_th]:bg-beige 
  [&_th]:font-bold [&_td]:border [&_td]:border-black [&_td]:p-2 [&_hr]:border-t [&_hr]:border-black [&_hr]:my-6 [&_img]:w-full 
  [&_img]:h-full [&_img]:mx-auto 
  [&_img]:object-cover [&_figure>img]: [&_figure:has(figure)]:grid [&_figure:has(figure)]:grid-cols-1 
  [&_figure:has(figure)]:tablet:grid-cols-2 
  [&_figure:has(figure)]:desktop:grid-cols-3 
  [&_figure:has(figure)]:gap-5"
      />
      <div ref={wideAdRef} className="my-2">
        <AdSpaceBillboard
          src="/images/placeholders/ads/wide-ad.png"
          alt="Advertisement"
          url="#"
        />
      </div>
      <div
        ref={squareAdRef}
        className="flex w-full justify-center my-7 desktop:hidden"
      >
        <AdSpaceSquare
          src="/images/placeholders/ads/square-ad.png"
          alt="Advertisement"
          url="#"
          cssClasses="w-full"
        />
      </div>
    </div>
  );
}
