// app/components/CalameoComponent.tsx

import getRecentPublications from "@/_actions/calameo-actions";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

export default async function CalameoComponent() {
  const publications = await getRecentPublications();

  if (publications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-16px">No publications available at this time.</p>
      </div>
    );
  }

  return (
    <main>
      <div className="grid place-items-start phone:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-8">
        {publications.map((pub) => (
          <Link
            key={pub.ID}
            href={pub.ViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="max-w-[426px]"
          >
            <div className="aspect-[300/426] w-full">
              <Image
                src={pub.PosterUrl}
                alt={pub.Name}
                width={300}
                height={426}
                className="object-cover desktop:hover:scale-105 delay-75 ease-in-out duration-300"
                sizes="(max-width: 425px) 100vw, (max-width: 800px) 50vw, 300px"
              />
            </div>
            {pub.Date && (
              <p className="px-2 text-16px">
                {new Date(pub.Date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
