"use client";

import React, { useEffect, useRef } from "react";
import {
  AdSpaceWide,
  AdSpaceSquare,
} from "../home-page/home-page-category-latest/home-page-grid-base";

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
        className="text-14px grid gap-4"
      />
      <div ref={wideAdRef} className="my-2">
        <AdSpaceWide
          src="/images/placeholders/ads/wide-ad.png"
          alt="Advertisement"
          url="#"
        />
      </div>
      <div
        ref={squareAdRef}
        className="flex w-full justify-center my-2 desktop:hidden"
      >
        <AdSpaceSquare
          src="/images/placeholders/ads/square-ad.png"
          alt="Advertisement"
          url="#"
          cssClasses="max-w-[400px]"
        />
      </div>
    </div>
  );
}
