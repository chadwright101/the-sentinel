"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { AdData } from "@/_types/ad-types";
import { type ContentBlock, type GalleryImage } from "@/_types/gallery-types";
import AdSpaceBillboard from "../ad-spaces/ad-space-billboard";
import AdSpaceSquare from "../ad-spaces/ad-space-square";
import GallerySlider from "./gallery-slider";

interface PostContentProps {
  content: string;
  adData: AdData | null;
}

const listStyles =
  "[&_ul]:list-disc [&_ul]:list-inside [&_ol]:list-disc [&_ol]:list-inside";
const linkStyles = "[&_a]:text-blue [&_a]:underline [&_a]:hover:text-blue/80";
const headingStyles =
  "[&_h2]:text-24px [&_h2]:font-bold [&_h2]:mb-2 [&_h3]:text-20px [&_h3]:font-bold [&_h3]:mb-2 [&_h4]:text-18px [&_h4]:font-bold [&_h4]:mb-2 [h5_]:text-16px [&_h5]:font-bold [&_h5]:mb-2";
const figureStyles =
  "[&_figure]:mt-5 [&_figure]:grid [&_figure]:gap-3 [&_figure]:pb-5";
const imageCaptionStyles =
  "[&_figcaption]:text-16px [&_figcaption]:text-center [&_figcaption]:max-w-[700px] [&_figcaption]:mx-auto [&_figcaption]:font-abril-fatface";
const textFormattingStyles =
  "[&_strong]:font-bold [&_em]:italic [&_u]:underline";
const blockquoteStyles =
  "[&_blockquote]:border-l-4 [&_blockquote]:border-teal [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-5";
const preStyles =
  "[&_pre]:bg-beige [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:my-5";
const tableStyles =
  "[&_table]:w-full [&_table]:border-collapse [&_table]:my-5 [&_th]:border [&_th]:border-black [&_th]:p-2 [&_th]:bg-beige [&_th]:font-bold [&_td]:border [&_td]:border-black [&_td]:p-2";
const horizontalRuleStyles = "[&_hr]:border-t [&_hr]:border-black [&_hr]:my-5";
const imageStyles =
  "[&_img:not(.gallery-placeholder_img)]:object-cover [&_img:not(.gallery-placeholder_img)]:mx-auto [&_img:not(.gallery-placeholder_img)]:max-w-[700px] [&_img:not(.gallery-placeholder_img)]:max-h-[600px] [&_img:not(.gallery-placeholder_img)]:w-full [&_img:not(.gallery-placeholder_img)]:h-full";
const figureGridStyles =
  "[&_figure:has(figure)]:grid [&_figure:has(figure)]:grid-cols-1 [&_figure:has(figure)]:tablet:grid-cols-2 [&_figure:has(figure)]:desktop:grid-cols-3 [&_figure:has(figure)]:gap-5";

function extractImageSrc(img: HTMLImageElement): string {
  const dataOrigFile = img.getAttribute("data-orig-file");
  if (dataOrigFile) {
    return dataOrigFile;
  }

  const srcset = img.getAttribute("srcset");
  if (srcset) {
    const urls = srcset.split(",").map((src) => src.trim());
    if (urls.length > 0) {
      const lastUrl = urls[urls.length - 1].split(" ")[0];
      if (lastUrl) return lastUrl;
    }
  }

  const src = img.getAttribute("src");
  return src || "";
}

export default function PostContent({ content, adData }: PostContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const wideAdRef = useRef<HTMLDivElement>(null);
  const squareAdRef = useRef<HTMLDivElement>(null);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);

  useEffect(() => {
    if (typeof document === "undefined") {
      setContentBlocks([{ type: "html", content }]);
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const blocks: ContentBlock[] = [];
    let htmlBuffer = "";

    Array.from(doc.body.children).forEach((child) => {
      if (child.classList.contains("wp-block-jetpack-tiled-gallery") ||
          child.classList.contains("wp-block-gallery") ||
          child.classList.contains("wp-block-jetpack-slideshow")) {
        if (htmlBuffer) {
          blocks.push({ type: "html", content: htmlBuffer });
          htmlBuffer = "";
        }

        const images: GalleryImage[] = [];
        const imgElements = child.querySelectorAll("img");

        imgElements.forEach((img) => {
          const src = extractImageSrc(img);
          const alt = img.getAttribute("alt") || "";
          if (src) images.push({ src, alt });
        });

        if (images.length > 0) {
          blocks.push({
            type: "gallery",
            images,
            id: `gallery-${blocks.length}-${Date.now()}`,
          });
        }
      } else {
        htmlBuffer += child.outerHTML;
      }
    });

    if (htmlBuffer) {
      blocks.push({ type: "html", content: htmlBuffer });
    }

    setContentBlocks(blocks);
  }, [content]);

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

        if (paragraphs.length >= 8) {
          const eighthParagraph = paragraphs[7];
          const squareAdElement = squareAdRef.current;

          eighthParagraph.parentNode?.insertBefore(
            squareAdElement,
            eighthParagraph.nextSibling
          );
        }
      }
    }
  }, [contentBlocks]);

  return (
    <div>
      <div ref={contentRef}>
        {contentBlocks.map((block, index) => {
          if (block.type === "gallery") {
            return (
              <GallerySlider
                key={block.id}
                images={block.images}
                galleryId={block.id}
              />
            );
          }

          return (
            <div
              key={`content-${index}`}
              dangerouslySetInnerHTML={{ __html: block.content }}
              className={classNames(
                "text-16px grid gap-5",
                listStyles,
                linkStyles,
                headingStyles,
                figureStyles,
                imageCaptionStyles,
                textFormattingStyles,
                blockquoteStyles,
                preStyles,
                tableStyles,
                horizontalRuleStyles,
                imageStyles,
                figureGridStyles
              )}
            />
          );
        })}
      </div>
      {/* <div ref={wideAdRef} className="my-2">
        <AdSpaceBillboard
          src={
            adData?.image_billboard || "/images/placeholders/ads/wide-ad.png"
          }
          alt={adData?.company_name_billboard || "Advertisement"}
          url={adData?.link_billboard || "#"}
        />
      </div> */}
      {/* <div
        ref={squareAdRef}
        className="flex w-full justify-center my-7 desktop:hidden"
      >
        <AdSpaceSquare
          src={
            adData?.image_square_primary ||
            "/images/placeholders/ads/square-ad.png"
          }
          alt={adData?.company_name_square_primary || "Advertisement"}
          url={adData?.link_square_primary || "#"}
          cssClasses="w-full"
        />
      </div> */}
    </div>
  );
}
