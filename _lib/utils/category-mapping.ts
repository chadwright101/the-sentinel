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

const SCHEDULE_SLUGS = new Set([
  "mon-am",
  "mon-pm",
  "tue-am",
  "tue-pm",
  "wed-am",
  "wed-pm",
  "thu-am",
  "thu-pm",
  "fri-am",
  "fri-pm",
  "sat-am",
  "sat-pm",
  "sun-am",
  "sun-pm",
]);

export function extractCategorySlug(post: { class_list: string[] }): string {
  const allSlugs = getAllCategorySlugs();

  for (const className of post.class_list ?? []) {
    const match = className.match(/^category-(.+)$/);
    if (match && !SCHEDULE_SLUGS.has(match[1]) && allSlugs.includes(match[1])) {
      return match[1];
    }
  }

  return "latest-news";
}

export function postHasCategory(
  post: { class_list: string[] },
  categorySlug: string
): boolean {
  if (categorySlug === "latest-news") {
    return true;
  }

  if (SCHEDULE_SLUGS.has(categorySlug)) {
    return false;
  }

  if (!getAllCategorySlugs().includes(categorySlug)) {
    return false;
  }

  return (post.class_list ?? []).includes(`category-${categorySlug}`);
}

export function getAllCategorySlugs(): string[] {
  const slugs: string[] = [];

  const addSlug = (url?: string) => {
    if (!url || url === "/" || url.startsWith("/#")) {
      return;
    }
    if (EXCLUDED_PAGES.some((page) => url === `/${page}` || url.startsWith(`/${page}/`))) {
      return;
    }
    const slug = url.split("/").pop();
    if (slug && !EXCLUDED_PAGES.includes(slug) && !slugs.includes(slug)) {
      slugs.push(slug);
    }
  };

  for (const item of navData) {
    addSlug(item.url);

    if (item.children) {
      for (const child of item.children) {
        addSlug(child.url);
      }
    }
  }

  return slugs;
}
