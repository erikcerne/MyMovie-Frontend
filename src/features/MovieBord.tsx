import { useRef, useState } from "react";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { TmdbMovieDto } from "../Types";
import { MovieCard } from "./MovieCard";

type MovieBordProps = {
  title: string;
  queryFn: () => UseQueryOptions<
    TmdbMovieDto[],
    Error,
    TmdbMovieDto[],
    string[]
  >;
};

const STEP_SIZE = 3;

export const MovieBord = ({ title, queryFn }: MovieBordProps) => {
  const { data, isPending, isError, error } = useQuery(queryFn());
  const [activeTab, setActiveTab] = useState<"movie" | "tv">("movie");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(":scope > div");
    const cardWidth = card ? card.offsetWidth + 16 : 200; // 16 är gap-4
    const amount = cardWidth * STEP_SIZE;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (isPending) {
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-4 rounded-xl border border-red-500 p-5 text-red-500">
        [GET] Misslyckades: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4 px-4 sm:px-0">
        <h2 className="min-w-0 truncate text-xl font-semibold text-base-content md:text-2xl">
          {title}
        </h2>

        <div className="flex flex-shrink-0 items-center rounded-full bg-base-200 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("movie")}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              activeTab === "movie"
                ? "bg-base-100 text-base-content shadow-sm"
                : "text-gray-500 hover:text-base-content"
            }`}
          >
            Movies
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tv")}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              activeTab === "tv"
                ? "bg-base-100 text-base-content shadow-sm"
                : "text-gray-500 hover:text-base-content"
            }`}
          >
            Series
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex scroll-smooth overflow-x-hidden gap-4 pb-4 px-4 sm:px-0"
        >
          {(data as TmdbMovieDto[]).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Föregående"
          className="absolute -left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-base-100 text-2xl shadow-lg transition-colors hover:bg-base-200"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Nästa"
          className="absolute -right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-base-100 text-2xl shadow-lg transition-colors hover:bg-base-200"
        >
          ›
        </button>
      </div>
    </div>
  );
};
