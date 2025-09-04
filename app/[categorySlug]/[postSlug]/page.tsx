import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchSinglePost } from "@/_components/fetch-single-post";
import { getCategoryMapping } from "@/_utils/category-mapping";

interface PostPageProps {
  params: Promise<{
    categorySlug: string;
    postSlug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { categorySlug, postSlug } = await params;
  
  const categoryInfo = getCategoryMapping(categorySlug);
  if (!categoryInfo) {
    notFound();
  }

  const post = await fetchSinglePost(postSlug);
  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-14px font-inter">
            <li>
              <Link href="/" className="text-teal hover:text-dark-brown transition-colors duration-300">
                Home
              </Link>
            </li>
            <li className="text-beige">/</li>
            <li>
              <Link
                href={`/${categorySlug}`}
                className="text-teal hover:text-dark-brown transition-colors duration-300"
              >
                {categoryInfo.title}
              </Link>
            </li>
            <li className="text-beige">/</li>
            <li className="text-black font-bold truncate">
              {post.title.rendered.replace(/<[^>]*>/g, "")}
            </li>
          </ol>
        </nav>

        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="aspect-video overflow-hidden mb-6">
            <img
              src={post.jetpack_featured_media_url}
              alt={post.title.rendered}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-6 pb-6">
            <header className="mb-6">
              <h1
                className="text-36px phone:text-44px font-abril-fatface text-teal mb-4 leading-tight"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <div className="flex items-center space-x-4 text-14px font-inter text-black">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-AU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="w-full h-px bg-beige mt-4"></div>
            </header>

            <div
              className="prose prose-lg max-w-none font-inter text-black leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </div>
        </article>

        <div className="mt-8 text-center">
          <Link
            href={`/${categorySlug}`}
            className="inline-flex items-center px-6 py-3 bg-teal text-white font-inter font-bold text-14px rounded-lg hover:bg-dark-brown transition-colors duration-300"
          >
            ← Back to {categoryInfo.title}
          </Link>
        </div>
      </div>
    </main>
  );
}