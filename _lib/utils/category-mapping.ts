import navData from "@/_data/nav-data.json";

interface CategoryMapping {
  title: string;
  slug: string;
  fullPath: string;
}

const EXCLUDED_PAGES = [
  "editions",
  "about",
  "contact-us",
  "entertainment/whats-on",
  "entertainment/time-out",
];

export function getCategoryMapping(
  categorySlug: string
): CategoryMapping | null {
  if (EXCLUDED_PAGES.includes(categorySlug)) {
    return null;
  }

  for (const item of navData) {
    // Check main item
    if (item.url === `/${categorySlug}`) {
      return {
        title: item.title,
        slug: categorySlug,
        fullPath: item.url,
      };
    }

    // Check children if they exist
    if (item.children) {
      for (const child of item.children) {
        if (child.url === `/${categorySlug}`) {
          return {
            title: child.title,
            slug: categorySlug,
            fullPath: child.url,
          };
        }
      }
    }
  }

  return null;
}

export function getAllCategorySlugs(): string[] {
  const slugs: string[] = [];

  for (const item of navData) {
    if (item.url && item.url !== "/") {
      const slug = item.url.split("/").pop();
      if (slug && !EXCLUDED_PAGES.includes(slug)) {
        slugs.push(slug);
      }
    }
  }

  return slugs;
}
