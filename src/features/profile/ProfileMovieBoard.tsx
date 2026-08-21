import { useRef } from "react";
import type { UserMoviesDto } from "../../Types";
import { ProfileMovieCard } from "./ProfileMovieCard";



const STEP_SIZE = 3;

export const ProfileMovieBord = ({title, userMoviesDto}: {title: string, userMoviesDto: UserMoviesDto[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(":scope > div");
    const cardWidth = card ? card.offsetWidth + 16 : 200;
    const amount = cardWidth * STEP_SIZE;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

 

  return (
    <div className="w-[75%] mx-auto ">
      <div className="mb-5 flex items-center justify-between gap-4 px-4 sm:px-0 margin-top-50px">
        <h2 className="min-w-0 truncate text-xl font-semibold text-base-content md:text-2xl">
          {title}
        </h2>

        <div className="flex flex-shrink-0 items-center rounded-full bg-base-200 p-1">
          <button
            type="button"
            //onClick = {} palsholder
            className={`rounded-full px-4 py-1.5 text-sm transition-colors`}
          >
            See All
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex scroll-smooth overflow-x-hidden gap-4 pb-4 px-4 sm:px-0"
        >
          {(userMoviesDto).map((movie) => (
            <ProfileMovieCard key={movie.id} movie={movie} />
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
