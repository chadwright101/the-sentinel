import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbComponentProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbComponent({ items }: BreadcrumbComponentProps) {
  return (
    <nav>
      <ol className="flex flex-wrap gap-x-2 text-12px">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-x-2">
            {item.href ? (
              <Link
                href={item.href}
                className="font-inter p-2 -m-2 text-teal desktop:hover:text-dark-brown transition-colors duration-300 desktop:p-0 desktop:m-0"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-black font-semibold truncate font-inter">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="font-inter text-beige">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}