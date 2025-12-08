export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ParsedGallery {
  images: GalleryImage[];
  galleryId: string;
}

export interface GallerySliderProps {
  images: GalleryImage[];
  galleryId: string;
  cssClasses?: string;
}

export type ContentBlock =
  | { type: "html"; content: string }
  | { type: "gallery"; images: GalleryImage[]; id: string };
