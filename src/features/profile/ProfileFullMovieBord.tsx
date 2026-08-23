import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { TmdbMovieDto } from "../../Types";
import { trendingMoviesQuery } from "../../api/TmdbMovie";
import { ProfileFullMovieCard } from "./ProfileFullMovieCard";

const AUTOPLAY_INTERVAL = 10000;

export const ProfileFullMovieBord = () => {
  const { data, isPending, isError, error } = useQuery(trendingMoviesQuery());
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const movies = (data as TmdbMovieDto[]) ?? [];

  useEffect(() => {
    if (movies.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % movies.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [movies.length, isPaused]);

  if (isPending) {
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-5 text-red-500 border border-red-500 rounded-xl m-4">
        [GET] Misslyckades: {error.message}
      </div>
    );
  }

  const Movie = movies[0];

  if (!Movie) {
    return null;
  }

  const activeMovie = movies[activeIndex];

  return (
    <div
      className="w-full "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <ProfileFullMovieCard key={activeMovie.id} movie={activeMovie} />

      {movies.length > 1 && (
        <div className="flex justify-center gap-2 mt-4 ">
          {movies.map((movie, index) => (
            <button
              key={movie.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Visa ${movie.original_title}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
      <div className="h-20"></div>
    </div>
  );
};
