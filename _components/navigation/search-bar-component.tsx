"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBarComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchValue(decodeURIComponent(query));
    } else {
      setSearchValue("");
    }
    setIsLoading(false);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchValue.trim() === "") {
      return;
    }

    setIsLoading(true);
    router.push(`/search?q=${encodeURIComponent(searchValue)}&page=1`);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchValue("");
  };

  const handleClearSearch = () => {
    setSearchValue("");
    router.push("/latest-news");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[1100px] mx-auto px-5 desktop:px-10 my-10"
    >
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <div className="relative w-full">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles..."
            className="w-full p-2.5 pr-10 border rounded-md border-black/50 font-inter text-16px focus:outline-teal transition-colors duration-300"
            disabled={isLoading}
          />
          {searchValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black transition-colors duration-300 font-inter text-18px leading-none"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || searchValue.trim() === ""}
          className="w-full px-4 py-2.5 bg-teal text-white font-inter font-bold text-16px rounded-md hover:enabled:bg-dark-brown disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
          aria-label="Search"
        >
          {isLoading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
          )}
        </button>
      </div>

      {searchValue && (
        <button
          onClick={handleClearSearch}
          className="text-teal p-2 -m-2 font-inter text-14px mt-1 desktop:hover:text-dark-brown transition-colors duration-300 desktop:hover:cursor-pointer desktop:m-0 desktop:mt-2 desktop:p-0"
        >
          Clear search
        </button>
      )}
    </form>
  );
}
